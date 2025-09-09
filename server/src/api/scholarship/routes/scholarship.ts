/**
 * scholarship router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::scholarship.scholarship', {
    config: {
        find: {
            middlewares: ['api::scholarship.global-populate'],
        },
        findOne: {
            middlewares: ["api::scholarship.global-populate"],
        },
    }
});
