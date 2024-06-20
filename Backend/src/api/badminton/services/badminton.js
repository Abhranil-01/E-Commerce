'use strict';

/**
 * badminton service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::badminton.badminton');
