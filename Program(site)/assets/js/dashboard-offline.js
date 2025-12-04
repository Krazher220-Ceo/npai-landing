/**
 * Офлайн дашборд - полная версия для заводов/промышленности
 */

const modules = [
    { id: 'eco', name: 'NPAI Eco', icon: '🌱', description: 'Экологический мониторинг', color: '#10b981' },
    { id: 'analytics', name: 'NPAI Analytics', icon: '📈', description: 'Промышленная аналитика', color: '#3b82f6' },
    { id: 'vision', name: 'NPAI Vision', icon: '👁️', description: 'Видеоаналитика', color: '#8b5cf6' },
    { id: 'acoustic', name: 'NPAI Acoustic', icon: '🔊', description: 'Акустическая диагностика', color: '#f59e0b' },
    { id: 'safety', name: 'NPAI Safety', icon: '🛡️', description: 'Промышленная безопасность', color: '#ef4444' },
    { id: 'smartgrid', name: 'NPAI Smart Grid', icon: '⚡', description: 'Энергоменеджмент', color: '#06b6d4' },
    { id: 'knowledge', name: 'NPAI Knowledge', icon: '🤖', description: 'Цифровой технолог', color: '#6366f1' },
    { id: 'thermal', name: 'NPAI Thermal', icon: '🌡️', description: 'Тепловизионный контроль', color: '#f97316' },
    { id: 'marketplace', name: 'NPAI Marketplace', icon: '🛒', description: 'Маркетплейс решений', color: '#ec4899' },
    { id: 'offline', name: 'NPAI Offline', icon: '🔒', description: 'Офлайн режим', color: '#64748b' }
];

async function initDashboard() {
    // Проверка авторизации
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = 'auth/login.html';
        return;
    }
    
    // Обновление профиля пользователя
    updateUserProfile(user);
    
    // Загрузка модулей
    loadModules();
    
    // Навигация
    setupNavigation();
    
    // Обновление статистики
    updateStats();
}

function updateUserProfile(user) {
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    const planEl = document.getElementById('user-plan');
    
    if (avatarEl) {
        avatarEl.textContent = user.name ? user.name.charAt(0).toUpperCase() : 'U';
    }
    if (nameEl) {
        nameEl.textContent = user.name || 'Пользователь';
    }
    if (planEl) {
        const plan = user.subscription?.plan || 'free';
        planEl.textContent = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';
    }
}

function loadModules() {
    const grid = document.getElementById('modules-grid');
    if (!grid) return;
    
    grid.innerHTML = modules.map(module => `
        <div class="module-card">
            <div class="module-card-header">
                <div class="module-icon" style="background: ${module.color}20; color: ${module.color};">
                    ${module.icon}
                </div>
                <div>
                    <div class="module-title">${module.name}</div>
                </div>
            </div>
            <div class="module-description">${module.description}</div>
            <div class="module-actions">
                <button class="btn btn-primary" onclick="openModule('${module.id}')">Открыть</button>
                <button class="btn btn-secondary" onclick="viewModuleDetails('${module.id}')">Подробнее</button>
            </div>
        </div>
    `).join('');
}

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            
            // Обновление активного элемента
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Загрузка секции
            loadSection(section);
        });
    });
}

function loadSection(sectionId) {
    // Здесь будет загрузка контента секции
    console.log('Загрузка секции:', sectionId);
}

function updateStats() {
    // Симуляция данных
    const stats = {
        activeModules: modules.length,
        connectedDevices: 24,
        activeAlerts: 2,
        energySavings: '23%'
    };
    
    const modulesEl = document.getElementById('active-modules');
    const devicesEl = document.getElementById('connected-devices');
    const alertsEl = document.getElementById('active-alerts');
    const savingsEl = document.getElementById('energy-savings');
    
    if (modulesEl) modulesEl.textContent = stats.activeModules;
    if (devicesEl) devicesEl.textContent = stats.connectedDevices;
    if (alertsEl) alertsEl.textContent = stats.activeAlerts;
    if (savingsEl) savingsEl.textContent = stats.energySavings;
}

function openModule(moduleId) {
    window.location.href = `module/${moduleId}/index.html`;
}

function viewModuleDetails(moduleId) {
    // Показать детали модуля
    console.log('Детали модуля:', moduleId);
}

function logoutUser() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        logout();
        window.location.href = 'index.html';
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initDashboard);

