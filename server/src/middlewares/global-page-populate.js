/**
 * `global-page-populate` middleware
 */
const populate = {
    blocks: {
        on: {
            "blocks.hero": {
                populate: {
                    links: true,
                    image: {
                        fields: ["alternativeText", "url", "height", "width"]
                    }
                }
            },
            "blocks.section-heading": true,
            "blocks.card-grid": {
                populate: {
                    cards: true,
                }
            },
            "blocks.content-with-image": {
                populate: {
                    link: true,
                    image: {
                        fields: ["alternativeText", "url"]
                    }
                }
            },
            "blocks.markdown": true,
            "blocks.person-card": {
                populate: {
                    image: {
                        fields: ["alternativeText", "url"]
                    }
                }
            },
            "blocks.faqs": {
                populate: {
                    faq: true
                }
            },
            "blocks.newsletter": true,
            "blocks.featured-articles": {
                populate: {
                    articles: {
                        populate: {
                            featuredImage: {
                                fields: ["url", "alternativeText"],
                            },
                            author: true,
                        }
                    }
                }
            }
        }
    }
};
export default (config, { strapi }) => {
    // Add your own logic here.
    return async (ctx, next) => {
        ctx.query.populate = populate;
        strapi.log.info('In global-page-populate middleware.');
        await next();
    };
};
