// Vercel serverless function: GET /api/admin
// Reuses the same controller that the local Express server uses.
const { getAdminData } = require('../controllers/adminController');

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'no-store');
  return getAdminData(req, res);
};