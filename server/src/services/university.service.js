const { University } = require('../models');
const fs = require('fs');
const path = require('path');

/**
 * Query for universities
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUniversities = (filter, options, res) => {
  const { q } = filter;

  try {
    University.search(
      {
        query_string: {
          query: q || 'Viet Nam',
        },
      },
      {
        hydrate: true,
      },
      function (err, results) {
        if (err) {
          console.log('Search failed: ', err);
          throw new Error(err.message);
        }
        let allResults = results.hits.hits;
        allResults = allResults.filter(function (result) {
          return result !== undefined;
        });

        const { page, limit } = options;
        const paginatedResults = allResults.slice((page - 1) * limit, page * limit);
        const totalPages = Math.ceil(allResults.length / limit);
        res.status(200).send({ results: paginatedResults, totalPages, page });
      }
    );
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }

  // fs.readFile(path.join(__dirname, './../../world_universities_and_domains.json'), 'utf8', async (err, data) => {
  //   if (err) console.log(err);
  //   else {
  //     // parse JSON string to JSON object
  //     const databases = JSON.parse(data);

  //     const listUniversity = databases.map(async (uni) => {
  //       const dt = new University(uni);
  //       await dt.save();
  //     });

  //     await Promise.all(listUniversity);

  //     console.log(databases.length);
  //   }
  // });

  // res.status(200).send([]);
};

module.exports = {
  queryUniversities,
};
