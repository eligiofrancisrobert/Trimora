const { buildAdminPayload } = require('../public/data/sample-data');

exports.getAdminData = (req, res) => {
  res.json(buildAdminPayload());
};