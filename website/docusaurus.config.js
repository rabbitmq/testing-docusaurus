// vim:sw=2:et:
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
// [V1] const users = [
//  {
//    caption: 'User1',
//    // You will need to prepend the image path with your baseUrl
//    // if it is not '/', like: '/test-site/img/image.jpg'.
//    image: '/img/undraw_open_source.svg',
//    infoLink: 'https://www.facebook.com',
//    pinned: true,
//  },
//];

const siteConfig = {
  title: 'RabbitMQ', // Title for your website.
  tagline: 'Messaging that just works',
  url: 'https://www.rabbitmq.com', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'rabbitmq-website',
  organizationName: 'rabbitmq',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  // [V1] headerLinks: [
  //  {href: '/#features', label: 'Features'},
  //  {href: '/#getstarted', label: 'Get Started'},
  //  {href: '/#support', label: 'Support'},
  //  {href: '/#community', label: 'Community'},
  //  {doc: 'overview/index', label: 'Docs'},
  //  {blog: true, label: 'Blog'}
  //],

  // If you have users set above, you add it here:
  // [V1] users,

  /* path to images for header/footer */
  // [V1] headerIcon: 'img/logo/rabbit-name-company-orange.svg',
  // [V1] footerIcon: 'img/logo/rabbit-only-white.svg',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  // [V1] colors: {
  //  primaryColor: '#f60',
  //  secondaryColor: '#866e8b',
  //  primaryBg: '#fff',
  //  secondaryBg: '#f9fafb',
  //  textColor: '#585858',
  //  lineColor: '#ededed',
  //},

  /* Custom fonts for website */
  // [V1] fonts: {
  //  myFont: [
  //    "Raleway",
  //    "sans-serif"
  //  ]
  //},

  stylesheets: [
    "https://fonts.googleapis.com/css?family=Raleway:400,400i,500,700,700i&display=swap"
  ],

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  // [V1] copyright: `Copyright © 2007-${new Date().getFullYear()} Pivotal Software Inc., now part of VMware`,

  // [V1] highlight: {
  //  // Highlight.js theme to use for syntax highlighting in code blocks.
  //  theme: 'gruvbox-dark',
  //},

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    '/js/navbar.js',
    //'https://buttons.github.io/buttons.js',
  ],

  // On page navigation for the current documentation page.
  // [V1] onPageNav: 'separate',
  // No .html extensions for paths.
  // [V1] cleanUrl: true,

  // Open Graph and Twitter card images.
  // [V1] ogImage: 'img/undraw_online.svg',
  // [V1] twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // [V1] docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  // [V1] repoUrl: 'https://github.com/rabbitmq/rabbitmq-website/',

  // [V1] algolia: {
  //  apiKey: 'my-api-key',
  //  indexName: 'my-index-name',
  //  algoliaOptions: {} // Optional, if provided by Algolia
  //},

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // docs folder path relative to website dir.
          path: './docs',
          // sidebars file relative to website dir.
          sidebarPath: require.resolve('./sidebars.json'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    footer: {
      logo: {
        alt: 'RabbitMQ',
        src: 'img/logo/rabbit-only-white.svg',
        href: '/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Pivotal Software Inc., now part of VMware`,
    },
    // Equivalent to `docsSideNavCollapsible`
    sidebarCollapsible: true,

    navbar: {
      title: 'RabbitMQ',
      logo: {
        alt: '',
        src: 'img/logo/rabbit-name-company-orange.svg',
      },
      links: [
        {to: '#features', label: 'Features', position: 'left'},
        {to: '#getstarted', label: 'Get Started', position: 'left'},
        {to: '#support', label: 'Support', position: 'left'},
        {to: '#community', label: 'Community', position: 'left'},
        {to: 'docs/overview', label: 'Docs', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'}
      ],
    },

    algolia: {
      apiKey: 'my-api-key',
      indexName: 'my-index-name',
      algoliaOptions: {} // Optional, if provided by Algolia
    },
  },
};

module.exports = siteConfig;
