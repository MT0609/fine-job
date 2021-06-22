const { University } = require('../models');

/**
 * Query for universities
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUniversities = async (filter, options, res) => {
  const { name, country } = filter;

  // const fil = {};

  // if (name) {
  //   fil.name = { $regex: '.*' + name + '.*' };
  // }
  // if (country) {
  //   fil.country = { $regex: '.*' + country + '.*' };
  // }

  // if (!Object.keys(fil).length) return [];

  // const universities = await University.find({ ...fil });
  // return universities;

  try {
    University.search(
      {
        query_string: {
          query: name || country || 'Viet Nam',
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
};

module.exports = {
  queryUniversities,
};
