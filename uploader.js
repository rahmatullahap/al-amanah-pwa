const dotenv = require("dotenv-defaults");
const consola = require("consola");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const cloudflare = require("cloudflare");
const { isBinaryFileSync } = require("isbinaryfile");

// configure dotenv
dotenv.config({
  defaults: ".env.defaults",
});

const logMap = {
  info: consola.LogLevel.Info,
  debug: consola.LogLevel.Debug,
  error: consola.LogLevel.Error,
  silent: consola.LogLevel.Silent,
  fatal: consola.LogLevel.Fatal,
  success: consola.LogLevel.Success,
  trace: consola.LogLevel.Trace,
  verbose: consola.LogLevel.Verbose,
  warn: consola.LogLevel.Warn,
  log: consola.LogLevel.Log,
};

const logger = consola.create({
  level: logMap[process.env.LOG_LEVEL],
  reporters: [new consola.FancyReporter()],
});

// configurations
const apiToken = process.env.CF_API_TOKEN;
const siteAssetDir = process.env.SITE_ASSETS_DIR;
const kvNamespaceId = process.env.KV_NAMESPACE_ID;
const accountId = process.env.ACCOUNT_ID;

function getFilePath(dir) {
  let files = [];
  const fileInDir = fs.readdirSync(dir);
  for (let f of fileInDir) {
    let file = path.join(dir, f);
    if (fs.lstatSync(file).isDirectory()) {
      files = files.concat(getFilePath(file));
    } else {
      files.push(file);
    }
  }
  return files;
}

async function getFileHash(file) {
  const hash = crypto.createHash("sha1");
  hash.setEncoding("hex");
  const fd = fs.createReadStream(file);
  return new Promise((resolve, reject) => {
    fd.on("end", () => {
      hash.end();
      resolve(hash.read());
    });
    fd.on("error", (err) => {
      reject(err);
    });
    fd.pipe(hash);
  });
}

function createFileIndex(base, hash, file) {
  // replace base path and windows style pathing
  let relPath = file.replace(base, "").replace(/\\/gim, "/").replace(/^\//, "");
  const ext = path.extname(file);
  const hashpart = hash.substring(0, 8);
  relPath = relPath.replace(new RegExp(`${ext}$`), `.${hashpart}${ext}`);
  return relPath;
}

async function createHashMap(base, files) {
  const hashMap = {};
  for (let file of files) {
    const hash = await getFileHash(file);
    const idx = createFileIndex(base, hash, file);
    hashMap[idx] = file;
  }
  return hashMap;
}

async function getRemoteFiles(cf, cursor) {
  let results = [];
  const remote = await cf.enterpriseZoneWorkersKV.browse(
    accountId,
    kvNamespaceId,
    {
      limit: 1000,
      cursor,
    }
  );
  results = results.concat(remote.result.map((r) => r.name));
  if (remote.result_info.cursor.length) {
    const nextResults = await getRemoteFiles(cf, remote.result_info.cursor);
    results = results.concat(nextResults);
  }
  return results;
}

function getUploadedFiles(remoteFiles, hashMap) {
  const files = [];
  for (let key in hashMap) {
    if (!remoteFiles.includes(key)) {
      const file = hashMap[key];
      files.push({
        key,
        file,
      });
    }
  }
  return files;
}

async function uploadFiles(cf, sources) {
  const simultanousUpload = 5;
  const slots = [];
  for (let i = 0; i < simultanousUpload; i++) {
    slots.push([]);
  }
  for (let idx in sources) {
    let source = sources[idx];
    slots[idx % simultanousUpload].push(source);
  }
  await Promise.all(
    slots.map(async (slot) => {
      for (let source of slot) {
        const key = source.key;
        logger.debug(`uploading ${key}`);

        // check encoding
        let base64 = false;
        let value = "";
        if (isBinaryFileSync(source.file)) {
          base64 = true;
          value = fs.readFileSync(source.file, { encoding: "base64" });
        } else {
          value = fs.readFileSync(source.file, { encoding: "utf8" });
        }
        // upload file
        const res = await cf.enterpriseZoneWorkersKV.addMulti(
          accountId,
          kvNamespaceId,
          [
            {
              key,
              value,
              base64,
            },
          ]
        );
        if (!res.success) {
          throw new Error(res.errors);
        }
        logger.info(`${key} uploaded`);
      }
    })
  );
}

async function createAndUploadFileMap(cf, base, hashMap) {
  const routes = {};
  for (let key in hashMap) {
    const route = hashMap[key]
      .replace(base, "")
      .replace(/\\/gim, "/")
      .replace(/^\//, "");
    routes[route] = key;
  }
  // upload this file map
  const res = await cf.enterpriseZoneWorkersKV.addMulti(
    accountId,
    kvNamespaceId,
    [
      {
        key: "filemap",
        value: JSON.stringify(routes),
      },
    ]
  );
  if (!res.success) {
    throw new Error(res.errors);
  }
  return JSON.stringify(routes, null, 2);
}

async function deleteOldFiles(cf, remoteFiles, hashMap) {
  // delete old file from remote
  const removedKeys = [];
  const hashKeys = Object.keys(hashMap);
  for (let key of remoteFiles) {
    if (key === "filemap") {
      continue;
    }
    if (!hashKeys.includes(key)) {
      removedKeys.push(key);
    }
  }
  // remove this keys
  const res = await cf.enterpriseZoneWorkersKV.delMulti(
    accountId,
    kvNamespaceId,
    removedKeys
  );
  if (!res.success) {
    throw new Error(res.errors);
  }
  return removedKeys;
}

async function upload() {
  const assetDir = path.resolve(siteAssetDir);
  // 1. read all file in site directory
  const files = getFilePath(assetDir);
  logger.info("number of files in assets -> ", files.length);
  logger.debug("file assetss -> ", files);
  // 2. add part of file hash into each file
  const hashMap = await createHashMap(assetDir, files);
  logger.debug("hash of those files", hashMap);
  // prelude: setup cloudflare creds
  const cf = cloudflare({ token: apiToken });
  // 3. get list of KV from remote source
  const remoteFiles = await getRemoteFiles(cf);
  logger.info("number of remote files", remoteFiles.length);
  logger.debug("remote files -> ", remoteFiles);
  // 4. compare KV local to remote
  const newFiles = getUploadedFiles(remoteFiles, hashMap);
  logger.info(`there is ${newFiles.length} new file`);
  logger.debug("new file to upload ->", newFiles);
  // 5. upload those files
  await uploadFiles(cf, newFiles);
  logger.info("all files uploaded");
  // 6. delete old file from remote
  const removedFiles = await deleteOldFiles(cf, remoteFiles, hashMap);
  logger.info(`${removedFiles.length} old file removed`);
  logger.debug("removed files ->", removedFiles);
  // 7. put file route map to remote KV
  const fileMap = await createAndUploadFileMap(cf, assetDir, hashMap);
  logger.info("new filemap uploaded");
  logger.debug("file map ->", fileMap);
}

module.exports = {
  upload,
};
