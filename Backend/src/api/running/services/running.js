'use strict';

/**
 * running service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::running.running');
