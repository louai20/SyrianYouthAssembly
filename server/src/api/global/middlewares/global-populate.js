/**
 * `global-populate` middleware
 */
const populate = {
    banner: {
        populate: {
            link: true
        },
    },
    footer: {
        populate: {
            logo: {
                populate: {
                    image: true,
                },
            },
            navItems: true,
            socialLinks: {
                populate: {
                    image: true,
                },
            },
        },
    },
};
export default (config, { strapi }) => {
    // Add your own logic here.
    return async (ctx, next) => {
        console.dir(ctx.query, { depth: null });
        ctx.query.populate = populate;
        strapi.log.info('In global-populate middleware.');
        await next();
    };
};
