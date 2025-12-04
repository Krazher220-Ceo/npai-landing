/**
 * Маркетплейс модулей NPAI
 */

// Каталог модулей маркетплейса
const marketplaceModules = [
    // Коды для IoT устройств
    {
        id: 'iot-sensor-code',
        name: 'Код для IoT датчиков температуры',
        description: 'Готовый код для подключения и работы с температурными датчиками IoT',
        author: 'IoT Solutions',
        price: 25000,
        category: 'iot-code',
        type: 'code',
        rating: 4.8,
        downloads: 1250,
        icon: '🌡️'
    },
    {
        id: 'iot-camera-driver',
        name: 'Драйвер для IoT камер',
        description: 'Драйвер и библиотека для работы с IoT камерами видеонаблюдения',
        author: 'Vision Tech',
        price: 35000,
        category: 'iot-code',
        type: 'code',
        rating: 4.9,
        downloads: 890,
        icon: '📷'
    },
    {
        id: 'iot-controller-lib',
        name: 'Библиотека для IoT контроллеров',
        description: 'Готовая библиотека для управления IoT контроллерами',
        author: 'Control Systems',
        price: 40000,
        category: 'iot-code',
        type: 'code',
        rating: 4.7,
        downloads: 2100,
        icon: '🎛️'
    },
    // AI-модели
    {
        id: 'ai-time-series',
        name: 'AI-модель для анализа временных рядов',
        description: 'Обученная модель для анализа данных временных рядов от IoT устройств',
        author: 'AI Analytics',
        price: 80000,
        category: 'ai-model',
        type: 'ai-model',
        rating: 4.9,
        downloads: 1560,
        icon: '📈',
        canUseAsExample: true
    },
    {
        id: 'ai-image-detection',
        name: 'AI-модель детекции объектов',
        description: 'Модель компьютерного зрения для детекции объектов на изображениях с IoT камер',
        author: 'Vision AI',
        price: 95000,
        category: 'ai-model',
        type: 'ai-model',
        rating: 4.8,
        downloads: 980,
        icon: '👁️',
        canUseAsExample: true
    },
    {
        id: 'ai-anomaly-detection',
        name: 'AI-модель детекции аномалий',
        description: 'Модель для обнаружения аномалий в данных от подключенных систем',
        author: 'Anomaly Detection Pro',
        price: 70000,
        category: 'ai-model',
        type: 'ai-model',
        rating: 4.7,
        downloads: 1200,
        icon: '⚠️',
        canUseAsExample: true
    },
    // Готовые решения
    {
        id: 'custom-analytics',
        name: 'Кастомная аналитика',
        description: 'Персонализированная система аналитики под вашу отрасль',
        author: 'NPAI Team',
        price: 50000,
        category: 'analytics',
        type: 'solution',
        rating: 4.8,
        downloads: 1250,
        icon: '📊'
    },
    {
        id: 'safety-pro',
        name: 'Safety Pro',
        description: 'Расширенный модуль безопасности с AI-детекцией',
        author: 'Safety Solutions',
        price: 75000,
        category: 'safety',
        type: 'solution',
        rating: 4.9,
        downloads: 890,
        icon: '🛡️'
    },
    {
        id: 'energy-optimizer',
        name: 'Energy Optimizer',
        description: 'Автоматическая оптимизация энергопотребления',
        author: 'GreenTech',
        price: 60000,
        category: 'energy',
        type: 'solution',
        rating: 4.7,
        downloads: 2100,
        icon: '⚡'
    },
    {
        id: 'free-template',
        name: 'Базовый шаблон',
        description: 'Бесплатный шаблон для создания своего модуля',
        author: 'NPAI Community',
        price: 0,
        category: 'template',
        type: 'template',
        rating: 4.5,
        downloads: 5400,
        icon: '📝',
        free: true
    }
];

/**
 * Отображение каталога модулей
 */
function displayMarketplace() {
    const container = document.getElementById('marketplace-catalog');
    if (!container) return;
    
    // Фильтры
    const categories = [...new Set(marketplaceModules.map(m => m.category))];
    const types = [...new Set(marketplaceModules.map(m => m.type))];
    const filterHtml = `
        <div class="marketplace-filters">
            <div style="margin-bottom: 1rem;">
                <strong>Тип продукта:</strong>
                <button class="filter-btn active" data-filter="all" data-filter-type="type">Все</button>
                ${types.map(type => `
                    <button class="filter-btn" data-filter="${type}" data-filter-type="type">${getProductType(type)}</button>
                `).join('')}
            </div>
            <div>
                <strong>Категория:</strong>
                <button class="filter-btn active" data-filter="all" data-filter-type="category">Все</button>
                ${categories.map(cat => `
                    <button class="filter-btn" data-filter="${cat}" data-filter-type="category">${getCategoryName(cat)}</button>
                `).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = filterHtml + '<div class="marketplace-grid" id="marketplace-items"></div>';
    
    displayModules(marketplaceModules);
    
    // Обработчики фильтров
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filterType;
            const filterValue = btn.dataset.filter;
            
            // Деактивируем все кнопки того же типа
            document.querySelectorAll(`[data-filter-type="${filterType}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Получаем активные фильтры
            const activeTypeFilter = document.querySelector(`[data-filter-type="type"].active`)?.dataset.filter || 'all';
            const activeCategoryFilter = document.querySelector(`[data-filter-type="category"].active`)?.dataset.filter || 'all';
            
            // Применяем фильтры
            let filtered = marketplaceModules;
            
            if (activeTypeFilter !== 'all') {
                filtered = filtered.filter(m => m.type === activeTypeFilter);
            }
            
            if (activeCategoryFilter !== 'all') {
                filtered = filtered.filter(m => m.category === activeCategoryFilter);
            }
            
            displayModules(filtered);
        });
    });
}

/**
 * Отображение списка модулей
 */
function displayModules(modules) {
    const container = document.getElementById('marketplace-items');
    if (!container) return;
    
    container.innerHTML = modules.map(module => `
        <div class="marketplace-item">
            <div class="module-icon-large" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
                ${module.icon}
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span style="background: ${module.type === 'ai-model' ? '#3b82f6' : module.type === 'iot-code' ? '#10b981' : '#f59e0b'}; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                    ${getProductType(module.type || 'solution')}
                </span>
                ${module.canUseAsExample ? '<span style="background: #8b5cf6; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">Пример</span>' : ''}
            </div>
            <h3>${module.name}</h3>
            <p class="module-author">от ${module.author}</p>
            <p class="module-description">${module.description}</p>
            
            <div class="module-stats">
                <div class="stat-item">
                    <span class="stat-icon">⭐</span>
                    <span>${module.rating}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">📥</span>
                    <span>${module.downloads.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="module-price">
                ${module.free 
                    ? '<span class="price-free">Бесплатно</span>'
                    : `<span class="price-amount">${module.price.toLocaleString()} ₸</span>`
                }
            </div>
            
            <button class="btn btn-primary marketplace-btn" data-module-id="${module.id}">
                ${module.free ? 'Скачать бесплатно' : module.type === 'ai-model' && module.canUseAsExample ? 'Купить / Использовать как пример' : 'Купить'}
            </button>
        </div>
    `).join('');
    
    // Обработчики кнопок
    document.querySelectorAll('.marketplace-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const moduleId = btn.dataset.moduleId;
            handleModulePurchase(moduleId);
        });
    });
}

/**
 * Обработка покупки/скачивания модуля
 */
async function handleModulePurchase(moduleId) {
    const module = marketplaceModules.find(m => m.id === moduleId);
    if (!module) {
        alert('Модуль не найден');
        return;
    }
    
    const user = await getCurrentUser();
    
    if (!user) {
        // Перенаправляем на регистрацию
        if (confirm('Для покупки модуля необходимо войти в систему. Перейти на страницу регистрации?')) {
            window.location.href = '../../auth/login.html?register=true&redirect=' + encodeURIComponent(window.location.href);
        }
        return;
    }
    
    if (module.free) {
        // Бесплатный модуль - добавление в библиотеку
        addModuleToLibrary(user.id, moduleId);
        showNotification(`Модуль "${module.name}" успешно добавлен в вашу библиотеку!`, 'success');
        updateMarketplaceButtons();
    } else {
        // Платный модуль - покупка
        if (confirm(`Купить модуль "${module.name}" за ${module.price.toLocaleString()} ₸?\n\nПосле покупки модуль будет добавлен в вашу библиотеку.`)) {
            const purchaseResult = await processPurchase(user.id, moduleId, module.price);
            if (purchaseResult.success) {
                addModuleToLibrary(user.id, moduleId);
                showNotification('Покупка успешна! Модуль добавлен в вашу библиотеку.', 'success');
                updateMarketplaceButtons();
            } else {
                showNotification(purchaseResult.message || 'Ошибка при покупке модуля', 'error');
            }
        }
    }
}

/**
 * Добавление модуля в библиотеку пользователя
 */
function addModuleToLibrary(userId, moduleId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    if (!user.subscription) {
        user.subscription = {
            plan: 'free',
            modules: [],
            modulePlans: {}
        };
    }
    
    if (!user.subscription.modules.includes(moduleId)) {
        user.subscription.modules.push(moduleId);
    }
    
    if (!user.subscription.modulePlans) {
        user.subscription.modulePlans = {};
    }
    
    user.subscription.modulePlans[moduleId] = 'marketplace';
    
    // Добавляем информацию о покупке
    if (!user.purchases) {
        user.purchases = [];
    }
    
    const purchase = {
        moduleId: moduleId,
        date: new Date().toISOString(),
        source: 'marketplace'
    };
    
    if (!user.purchases.find(p => p.moduleId === moduleId)) {
        user.purchases.push(purchase);
    }
    
    saveUsers(users);
}

/**
 * Обработка покупки (симуляция платежа)
 */
async function processPurchase(userId, moduleId, price) {
    // В реальном приложении здесь будет интеграция с платежной системой
    // Пока симулируем успешную покупку
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Проверяем баланс пользователя (в реальном приложении)
            // Для демо всегда успешно
            resolve({
                success: true,
                transactionId: 'TXN-' + Date.now(),
                message: 'Покупка успешно обработана'
            });
        }, 1000);
    });
}

/**
 * Проверка наличия модуля в библиотеке
 */
async function checkModuleInLibrary(moduleId) {
    const user = await getCurrentUser();
    if (!user) return false;
    
    return user.subscription?.modules?.includes(moduleId) || false;
}

/**
 * Обновление кнопок маркетплейса
 */
async function updateMarketplaceButtons() {
    const buttons = document.querySelectorAll('.marketplace-btn');
    
    for (const button of buttons) {
        const moduleId = button.dataset.moduleId;
        if (!moduleId) continue;
        
        const module = marketplaceModules.find(m => m.id === moduleId);
        if (!module) continue;
        
        const inLibrary = await checkModuleInLibrary(moduleId);
        
        if (inLibrary) {
            button.textContent = '✓ В библиотеке';
            button.classList.add('btn-secondary');
            button.classList.remove('btn-primary');
            button.disabled = true;
        } else {
            if (module.free) {
                button.textContent = 'Скачать бесплатно';
            } else {
                button.textContent = 'Купить';
            }
            button.classList.add('btn-primary');
            button.classList.remove('btn-secondary');
            button.disabled = false;
        }
    }
}

/**
 * Показать уведомление
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем стили для анимации
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Получить название категории
 */
function getCategoryName(category) {
    const names = {
        'iot-code': 'Коды для IoT',
        'ai-model': 'AI-модели',
        analytics: 'Аналитика',
        safety: 'Безопасность',
        energy: 'Энергетика',
        ai: 'Искусственный интеллект',
        maintenance: 'Обслуживание',
        template: 'Шаблоны'
    };
    return names[category] || category;
}

/**
 * Получить тип продукта
 */
function getProductType(type) {
    const types = {
        'code': 'Код',
        'ai-model': 'AI-модель',
        'solution': 'Решение',
        'template': 'Шаблон'
    };
    return types[type] || type;
}

/**
 * Просмотр кода модуля (глобальная функция)
 */
window.viewCode = function(moduleId) {
    // Проверка соглашения
    const agreement = localStorage.getItem('npai_code_agreement');
    if (agreement !== 'accepted') {
        if (confirm('Для просмотра кода необходимо принять соглашение о недопустимости кражи кодов. Перейти к соглашению?')) {
            window.location.href = 'agreement.html';
        }
        return;
    }
    
    // Переход к просмотру кода
    window.location.href = `code-viewer.html?module=${moduleId}`;
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', async () => {
    displayMarketplace();
    // Обновляем кнопки после загрузки
    setTimeout(() => {
        updateMarketplaceButtons();
    }, 500);
});





