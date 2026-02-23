/** @type {import('@opennextjs/cloudflare').OpenNextConfig} */
const config = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
    },
  },
};

export default config;
