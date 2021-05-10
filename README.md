## Quick Start

1. create `.env` file and add necessary configuration, you can look up the configuration sample on `.env.defaults` file

1. install dependency

    ```bash
    npm install
    ```

1. build and run

    ```bash
    npm run build
    npm start
    ```

## Development

This project is build using this technology stacks

1. [NodeJS](https://nodejs.org/) 14 > as runtime
1. [Typescript](https://www.typescriptlang.org/) as main language
1. [Gatsby](https://www.gatsbyjs.com/) as static web frameworks
1. [Prismic](https://prismic.io/) and [Wordpress](https://wordpress.org/) as CMS
1. [Netlify](https://www.netlify.com/) as CD and CDN

Make sure all these stacks are available to your system, installed or configured correctly.

1. add credentials from CMS and tracker to `.env` file

    ```env
    # base configs
    BASE_URL=https://myweb.id

    # wordpress configs
    WPGRAPHQL_URL=https://wpgatsbydemo.wpengine.com/graphql

    # prismic configs
    PRISMIC_REPO_NAME=myweb-id
    PRISMIC_ACCESS_TOKEN=access-token

    # google marketing platform
    GTM_ID=GTM-123456
    ```

1. install dependency and start development

    ```bash
    npm i
    npm run dev
    ```
1. open browser at http://localhost:6677, and graphql API on http://localhost:6677/___graphql

1. update schema typings each time you making change on graphql query

    ```bash
    npm run schema:intro # optional, run it only on firstime or when there is change on gatsby config
    npm run schema:ops
    ```

## Deploy Automation

this project will automatically deploy to production when you push this repo to github `master` branch or content published from cms.
