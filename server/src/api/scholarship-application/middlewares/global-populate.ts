/**
 * `global-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  scholarship: {
    fields: ["id", "title", "slug", "deadline"],
  },
};


export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.dir(ctx.query, { depth: null });
    ctx.query.populate = populate;
    strapi.log.info('In global-populate middleware.');

    await next();
  };
};
