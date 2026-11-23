const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => res.redirect('/admin.html'));

app.listen(PORT, () => console.log(`Trimora running at http://localhost:${PORT}`));