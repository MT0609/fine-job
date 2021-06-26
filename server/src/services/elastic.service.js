const elasticClient = require('./../config/elastic');

module.exports.index = async (indexName, id, body) => {
  await elasticClient.index({
    id,
    index: indexName,
    body,
  });

  await elasticClient.indices.refresh({ index: indexName });
};

module.exports.search = async (indexName, q) => {
  const { body } = await elasticClient.search({
    index: indexName,
    q,
  });

  return body.hits.hits.map((el) => el._source.data);
};

module.exports.update = async (indexName, id, source, body) => {
  await elasticClient.update({
    index: indexName,
    id: id,
    _source: source,
    body,
  });
};

module.exports.delete = async (indexName, id) => {
  await elasticClient.delete({
    index: indexName,
    id: id,
  });
};
