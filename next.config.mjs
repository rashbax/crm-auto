/** @type {import('next').NextConfig} */
const nextConfig = {};

const isGithubPages = process.env.GITHUB_PAGES === 'true';

export default {
  ...nextConfig,
  assetPrefix: isGithubPages ? '/crm-auto/' : '',
  basePath: isGithubPages ? '/crm-auto' : '',
};
