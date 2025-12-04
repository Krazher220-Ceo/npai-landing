/**
 * Онлайн дашборд - упрощенная версия с фильтрацией
 */

let currentFilters = {
    dataType: 'all',
    period: 'today',
    status: 'all'
};

// Симуляция данных
const sampleData = [
    { time: '10:30', type: 'Экология', value: 'AQI: 45', status: 'ok', device: 'Датчик #1' },
    { time: '10:25', type: 'Производство', value: 'Производительность: 95%', status: 'ok', device: 'Линия #2' },
    { time: '10:20', type: 'Энергия', value: 'Потребление: 120 кВт', status: 'warning', device: 'Станок #5' },
    { time: '10:15', type: 'Безопасность', value: 'СИЗ: Все в норме', status: 'ok', device: 'Камера #3' },
    { time: '10:10', type: 'Экология', value: 'CO₂: 420 ppm', status: 'ok', device: 'Датчик #2' },
    { time: '10:05', type: 'Производство', value: 'Брак: 0.5%', status: 'ok', device: 'Линия #1' },
    { time: '10:00', type: 'Энергия', value: 'Потребление: 95 кВт', status: 'ok', device: 'Станок #3' },
    { time: '09:55', type: 'Безопасность', value: 'Нарушение: Отсутствует каска', status: 'error', device: 'Камера #1' }
];

async function initOnlineDashboard() {
    // Проверка авторизации
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = 'auth/login.html';
        return;
    }
    
    // Обновление профиля пользователя
    updateUserProfile(user);
    
    // Настройка фильтров
    setupFilters();
    
    // Загрузка данных
    loadData();
}

function updateUserProfile(user) {
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    
    if (avatarEl) {
        avatarEl.textContent = user.name ? user.name.charAt(0).toUpperCase() : 'U';
    }
    if (nameEl) {
        nameEl.textContent = user.name || 'Пользователь';
    }
}

function setupFilters() {
    const dataTypeFilter = document.getElementById('data-type-filter');
    const periodFilter = document.getElementById('period-filter');
    const statusFilter = document.getElementById('status-filter');
    
    if (dataTypeFilter) {
        dataTypeFilter.addEventListener('change', (e) => {
            currentFilters.dataType = e.target.value;
            loadData();
        });
    }
    
    if (periodFilter) {
        periodFilter.addEventListener('change', (e) => {
            currentFilters.period = e.target.value;
            loadData();
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            currentFilters.status = e.target.value;
            loadData();
        });
    }
}

function loadData() {
    // Фильтрация данных
    let filteredData = [...sampleData];
    
    if (currentFilters.dataType !== 'all') {
        const typeMap = {
            'eco': 'Экология',
            'production': 'Производство',
            'energy': 'Энергия',
            'safety': 'Безопасность'
        };
        filteredData = filteredData.filter(item => item.type === typeMap[currentFilters.dataType]);
    }
    
    if (currentFilters.status !== 'all') {
        filteredData = filteredData.filter(item => item.status === currentFilters.status);
    }
    
    // Обновление таблицы
    updateTable(filteredData);
    
    // Обновление статистики
    updateSummary(filteredData);
}

function updateTable(data) {
    const tbody = document.getElementById('data-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = data.map(item => {
        const statusClass = `status-${item.status}`;
        const statusText = {
            'ok': '✅ Норма',
            'warning': '⚠️ Предупреждение',
            'error': '❌ Ошибка'
        }[item.status] || 'Неизвестно';
        
        return `
            <tr>
                <td>${item.time}</td>
                <td>${item.type}</td>
                <td>${item.value}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${item.device}</td>
            </tr>
        `;
    }).join('');
}

function updateSummary(data) {
    const total = data.length;
    const normal = data.filter(item => item.status === 'ok').length;
    const warning = data.filter(item => item.status === 'warning').length;
    const error = data.filter(item => item.status === 'error').length;
    
    const totalEl = document.getElementById('total-readings');
    const normalEl = document.getElementById('normal-readings');
    const warningEl = document.getElementById('warning-readings');
    const errorEl = document.getElementById('error-readings');
    
    if (totalEl) totalEl.textContent = total;
    if (normalEl) normalEl.textContent = normal;
    if (warningEl) warningEl.textContent = warning;
    if (errorEl) errorEl.textContent = error;
}

function logoutUser() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        logout();
        window.location.href = 'index.html';
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initOnlineDashboard);

// Обновление данных каждые 30 секунд
setInterval(() => {
    loadData();
}, 30000);

