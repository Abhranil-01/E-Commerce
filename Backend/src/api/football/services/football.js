'use strict';

/**
 * football service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::football.football');
