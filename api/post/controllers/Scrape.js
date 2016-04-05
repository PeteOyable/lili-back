'use strict';

/**
 * A set of functions called "actions" for `Scrape`
 */

module.exports = {

  /**
   * Parse meta data from an url and return an object
   *
   * @return {Object|Array}
   */

  index: function * (next) {
    const ctx = this;
    const params = ctx.request.body;

    if(!params.url) {
      ctx.status = 400;
      return ctx.body = {
        message : 'The url is needed.'
      }
    }

    try {
      const url = yield strapi.api.post.services.scrape.scrapeUrl(params.url);
      ctx.status = 200;
      return ctx.body = url;
    } catch(error) {
      ctx.status = 500;
        return ctx.body = {
          message: error.message
        };
    }
  }
};
