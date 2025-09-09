/**
 * `global-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  coverImage: {
    fields: ["url", "alternativeText", "width", "height"],
  },

  // Populate form fields (dynamic component)
  formFields: {
    on: {
      "form.field": {
        fields: ["name", "label", "type", "required", "placeholder", "prefillFrom"],
        populate: {
            options: {
                fields: ["label", "value"],
            }
        },
        }
    },
    }
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
