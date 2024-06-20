'use strict';

/**
 * add-to-cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::add-to-cart.add-to-cart');
