/**
 * scholarship-application router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::scholarship-application.scholarship-application', {
        config: {
        find: {
            middlewares: ['api::scholarship-application.global-populate'],
        },
        findOne: {
            middlewares: ["api::scholarship-application.global-populate"],
        },
    }
});
