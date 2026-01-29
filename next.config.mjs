/** @type {import('next').NextConfig} */
const nextConfig = {};

const isGithubPages = process.env.GITHUB_PAGES === 'true';

module.exports = {
  ...nextConfig,
  assetPrefix: isGithubPages ? '/<REPO_NAME>/' : '',
  basePath: isGithubPages ? '/<REPO_NAME>' : '',
};
