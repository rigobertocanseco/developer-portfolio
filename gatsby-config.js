const siteMetadata = require('./site-metadata.json')

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: '/',
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-data`,
    `github-repositories`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {}
    },
    {
      resolve: `gatsby-remark-page-creator`,
      options: {}
    },
    {
      resolve: `@stackbit/gatsby-plugin-menus`,
      options: {
        sourceUrlPath: `fields.url`,
        pageContextProperty: `menus`,
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: `https://${process.env.GATSBY_DOMAIN}`,
        sitemap: `https://${process.env.GATSBY_DOMAIN}/sitemap.xml`,
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
        cookieDomain: process.env.GATSBY_DOMAIN,
        head: true,
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
        ]
      }
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitHub`,
        fieldName: `github`,
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_GITHUB_API_KEY}`,
        },
      },
    },
    {
      resolve: "gatsby-source-dev",
      options: {
        // This is your username on Dev.to
        username: process.env.GATSBY_DEVTO_USERNAME
      }
    }
  ]
};
