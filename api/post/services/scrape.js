'use strict';

/**
 * Module dependencies
 */

const MetaInspector = require('node-metainspector');

/**
 * Scrape service
 */

module.exports = {

   /**
   * Async function that scrapes an url
   *
   * @param {String}   url
   * @param {Function} next
   */

	scrapeUrl: (url, next) => {
		let client = new MetaInspector(url, { timeout : 5000 });
        let deferred = Promise.defer();

		client.on('fetch', () => {
            let response = {
                title : client.title || client.ogTitle,
                description : client.description || client.ogDescription,
                url : client.url || url,
                image : client.image || client.images[0]
            };
            deferred.resolve(response);
        });

	   client.on('error', (error) => {
	       let response = {
	           message : 'The url cannot be reached.'
            }
            deferred.reject(response)
        });

		client.fetch();

        return deferred.promise;
	}
}