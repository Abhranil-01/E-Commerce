'use strict';

/**
 * running controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::running.running');
