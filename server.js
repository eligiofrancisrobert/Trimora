
const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.redirect('/admin.html');
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Trimora server is running.'
    });
});

// Local development only
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Trimora running at http://localhost:${PORT}`);
    });
}

// Vercel serverless deployment
module.exports = app;
