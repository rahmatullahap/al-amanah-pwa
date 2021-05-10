const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

/**
 * Create pages for
 * All tags, posts and author from article CMS (wordpress)
 * All pages and product from prismic
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allPrismicArticle {
        nodes {
          uid
        }
      }
    }
  `);

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Extract query results
  const article = result.data.allPrismicArticle.nodes;

  // Load templates
  const pageTemplate = path.resolve(`./src/templates/page.tsx`);

  // Create common page pages
  article.forEach(node => {
    // This part here defines, that our posts will use
    // a `/:slug/` permalink.
    node.url = `/${node.uid}`;

    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        uid: node.uid,
      },
    });
  });
};
