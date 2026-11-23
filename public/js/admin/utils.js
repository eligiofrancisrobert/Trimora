// Shared namespace and helper functions for the admin pages.
window.Trimora = { pages: {}, data: null, query: '', charts: [], current: 'dashboard' };

(() => {
    const T = window.Trimora;

    T.peso = n => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);
    T.initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('');
    T.esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    T.refreshIcons = () => window.lucide && lucide.createIcons();
    T.matches = (obj, q) => Object.values(obj).join(' ').toLowerCase().includes(q.toLowerCase());

    T.formatDate = iso => {
        if (iso === T.data.today) return 'Today';
        return new Date(iso + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
    };

    T.toast = msg => {
        const el = document.getElementById('toast');
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(T._toastTimer);
        T._toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
    };

    T.drawChart = (canvasId, config) => {
        const chart = new Chart(document.getElementById(canvasId), config);
        T.charts.push(chart);
        return chart;
    };
    T.destroyCharts = () => { T.charts.forEach(c => c.destroy()); T.charts = []; };

    T.chartColors = { primary: '#8C5F28', secondary: '#DFCBAB', success: '#6B9472', warning: '#D49A45', danger: '#C75D50', muted: '#89847D', grid: '#F0E9DC' };
    T.chartFont = { family: 'Poppins' };
})();