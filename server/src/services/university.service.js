const { University } = require('../models');
const fs = require('fs');
const path = require('path');

const elasticService = require('../services/elastic.service');

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
  const { q } = filter;

  try {
    let allResults = await elasticService.search('universities', q || 'Viet Nam');
    allResults = allResults.filter(function (result) {
      return result !== undefined;
    });
    const { page, limit } = options;
    const paginatedResults = allResults.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(allResults.length / limit);
    res.status(200).send({ results: paginatedResults, totalPages, page });
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }

  // fs.readFile(path.join(__dirname, './../../world_universities_and_domains.json'), 'utf8', async (err, data) => {
  //   if (err) console.log(err);
  //   else {
  //     // parse JSON string to JSON object
  //     const databases = JSON.parse(data);

  //     const listUniversity = databases.map(async (uni, index) => {
  //       const dt = new University(uni);
  //       await dt.save();

  //       // Elastic index
  //       const body = {
  //         name: dt.name,
  //         country: dt.country,
  //         data: dt,
  //       };

  //       await elasticService.index('universities', dt._id, body);
  //       console.log('Doc: ' + index);
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
