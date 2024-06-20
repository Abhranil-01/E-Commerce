'use strict';

/**
 * add-to-cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::add-to-cart.add-to-cart');
