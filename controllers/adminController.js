
const { buildAdminPayload } = require('../data/sampleData');

exports.getAdminData = (req, res) => {
    try {
        return res.status(200).json(buildAdminPayload());
    } catch (error) {
        console.error('Admin data error:', error);

        return res.status(500).json({
            error: 'Failed to load admin data.',
            details: error.message
        });
    }
};
