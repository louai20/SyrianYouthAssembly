/**
 * `article-populate` middleware
 */
const populate = {
    featuredImage: {
        fields: ["url", "alternativeText"],
    },
    author: {
        populate: {
            image: {
                fields: ["url", "alternativeText"],
            },
            articles: {
                fields: ["documentId", "title"],
            },
        }
    },
    contentTags: true,
};
export default (config, { strapi }) => {
    // Add your own logic here.
    return async (ctx, next) => {
        strapi.log.info('In article-populate middleware.');
        ctx.query.populate = populate;
        await next();
    };
};
