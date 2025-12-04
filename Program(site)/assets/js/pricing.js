/**
 * Загрузка и отображение тарифов
 * Использует функции из auth-utils.js
 */

async function getModules() {
    try {
        // Пробуем разные пути относительно текущего расположения файла
        const paths = [
            '../../backend/config/modules.json',
            '../backend/config/modules.json',
            '/backend/config/modules.json',
            'backend/config/modules.json',
            '../../../backend/config/modules.json'
        ];
        
        let response = null;
        for (const path of paths) {
            try {
                response = await fetch(path);
                if (response.ok) {
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (response && response.ok) {
            const data = await response.json();
            return { success: true, modules: data.modules };
        }
        
        throw new Error('Не удалось загрузить конфигурацию');
    } catch (e) {
        console.error('Ошибка загрузки модулей:', e);
        // Fallback - возвращаем пустой объект
        return { success: false, modules: {}, error: e.message };
    }
}

// Иконки модулей
const moduleIcons = {
    eco: '🌱',
    analytics: '📊',
    vision: '👁️',
    acoustic: '🔊',
    safety: '🛡️',
    'smart-grid': '⚡',
    knowledge: '🧠',
    thermal: '🌡️',
    marketplace: '🛒',
    offline: '🔒'
};

// Названия категорий
const categoryNames = {
    monitoring: 'Мониторинг',
    analytics: 'Аналитика',
    ai: 'Искусственный интеллект',
    safety: 'Безопасность',
    energy: 'Энергетика',
    platform: 'Платформа',
    infrastructure: 'Инфраструктура'
};

/**
 * Форматирование цены
 */
function formatPrice(price, currency = 'KZT') {
    if (price === 'custom' || price === 0) {
        return price === 0 ? 'Бесплатно' : 'Индивидуально';
    }
    return `${price.toLocaleString('ru-RU')} ${currency}`;
}

/**
 * Создание карточки тарифа
 */
function createPricingCard(planName, plan, isRecommended = false, isFree = false) {
    const cardClass = `pricing-card ${isRecommended ? 'recommended' : ''} ${isFree ? 'free' : ''}`;
    
    let priceHtml = '';
    if (plan.price === 'custom') {
        priceHtml = `<div class="pricing-price">Индивидуально</div>`;
    } else if (plan.price === 0) {
        priceHtml = `<div class="pricing-price">Бесплатно</div>`;
    } else {
        priceHtml = `
            <div class="pricing-price">
                ${plan.price.toLocaleString('ru-RU')} <span class="currency">${plan.currency || '₸'}</span>
                ${plan.period ? `<span class="period">/ ${plan.period === 'month' ? 'мес' : plan.period}</span>` : ''}
            </div>
        `;
    }

    const featuresHtml = plan.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');

    return `
        <div class="${cardClass}">
            ${isFree ? '<div class="free-badge">🆓 Бесплатный доступ</div>' : ''}
            <div class="pricing-plan-name">${planName}</div>
            ${priceHtml}
            <ul class="pricing-features">
                ${featuresHtml}
            </ul>
            <a href="auth/login.html?register=true" class="btn btn-primary pricing-btn">${isFree ? 'Начать бесплатно' : 'Выбрать план'}</a>
        </div>
    `;
}

/**
 * Создание секции тарифов для модуля
 */
function createModulePricingSection(moduleId, module) {
    const plans = Object.entries(module.pricing);
    const hasFree = module.free_available;
    
    // Определяем рекомендуемый план
    let recommendedPlan = null;
    if (hasFree && plans.length > 1) {
        recommendedPlan = plans[1][0]; // Первый платный план
    } else if (plans.length > 0) {
        recommendedPlan = plans[0][0]; // Первый план
    }

    const planNames = {
        free: 'Free план',
        starter: 'Starter план',
        basic: 'Basic план',
        standard: 'Standard план',
        professional: 'Professional план',
        advanced: 'Advanced план',
        premium: 'Premium план',
        business: 'Business план',
        enterprise: 'Enterprise план'
    };

    const cardsHtml = plans.map(([planKey, plan]) => {
        const planName = planNames[planKey] || planKey;
        const isRecommended = planKey === recommendedPlan;
        const isFree = planKey === 'free' || plan.price === 0;
        
        return createPricingCard(planName, plan, isRecommended, isFree);
    }).join('');

    const categoryName = categoryNames[module.category] || module.category;
    const icon = moduleIcons[moduleId] || '📦';

    return `
        <div class="module-pricing-section" id="module-${moduleId}" data-module-id="${moduleId}">
            <div class="module-pricing-header">
                <h2>${icon} ${module.name}</h2>
                <p style="font-size: 1.1rem; color: var(--text-light);">${module.description}</p>
                <span style="display: inline-block; margin-top: 0.5rem; padding: 0.25rem 0.75rem; background: var(--bg-light); border-radius: 15px; font-size: 0.85rem;">
                    ${categoryName}
                </span>
            </div>
            <div class="pricing-cards">
                ${cardsHtml}
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <a href="module/${moduleId}/index.html" class="btn btn-secondary">Подробнее о модуле</a>
            </div>
        </div>
    `;
}

/**
 * Загрузка и отображение всех тарифов
 */
async function loadPricing() {
    try {
        const result = await getModules();
        
        if (!result.success) {
            document.getElementById('pricing-content').innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 1.2rem; color: var(--text-light);">Ошибка загрузки тарифов</div>
                </div>
            `;
            return;
        }

        const modules = result.modules;
        const modulesHtml = Object.entries(modules).map(([moduleId, module]) => 
            createModulePricingSection(moduleId, module)
        ).join('');

        document.getElementById('pricing-content').innerHTML = modulesHtml;

    } catch (error) {
        console.error('Ошибка загрузки тарифов:', error);
        document.getElementById('pricing-content').innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <div style="font-size: 1.2rem; color: var(--text-light);">Ошибка загрузки тарифов</div>
            </div>
        `;
    }
}

/**
 * Обновление ссылки авторизации
 */
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');
    if (!authLink) return;
    
    const user = getCurrentUser();
    
    if (user) {
        authLink.textContent = user.name || 'Профиль';
        authLink.href = 'auth/profile.html';
    } else {
        authLink.textContent = 'Войти';
        authLink.href = 'auth/login.html';
    }
}

/**
 * Обновление кнопок выбора плана в зависимости от авторизации
 */
function updatePricingButtons() {
    const user = getCurrentUser();
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(button => {
        if (user) {
            // Если пользователь авторизован, ведем на профиль для активации
            const moduleId = button.closest('.module-pricing-section')?.dataset?.moduleId;
            if (moduleId) {
                button.href = `auth/profile.html?activate=${moduleId}`;
            }
        } else {
            // Если не авторизован, ведем на регистрацию
            const href = button.getAttribute('href');
            if (href && href.includes('login.html')) {
                button.href = href.includes('?') ? href + '&register=true' : href + '?register=true';
            }
        }
    });
}

// Загрузка при открытии страницы
document.addEventListener('DOMContentLoaded', async () => {
    await loadPricing();
    updateAuthLink();
    updatePricingButtons();
    
    // Обработка якорных ссылок для модулей
    const hash = window.location.hash;
    if (hash && hash.startsWith('#module-')) {
        const moduleId = hash.replace('#module-', '');
        const element = document.querySelector(`[data-module-id="${moduleId}"]`);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    }
});

