/**
 * Утилиты авторизации (общие функции для всех страниц)
 * Поддерживает работу как с localStorage, так и с API сервером
 */

// Режим работы: 'local' или 'api'
// По умолчанию используем localStorage, API будет использоваться только если доступен
let AUTH_MODE = 'local';

// Проверяем доступность API при загрузке
if (typeof window !== 'undefined') {
    // Пробуем проверить доступность API
    fetch('http://localhost:3001/api/health', { method: 'GET', mode: 'no-cors' })
        .then(() => {
            AUTH_MODE = 'api';
            console.log('API сервер доступен, используем API режим');
        })
        .catch(() => {
            AUTH_MODE = 'local';
            console.log('API сервер недоступен, используем localStorage');
        });
}

/**
 * Получение списка пользователей
 */
function getUsers() {
    return JSON.parse(localStorage.getItem('npai_users') || '[]');
}

/**
 * Сохранение списка пользователей
 */
function saveUsers(users) {
    localStorage.setItem('npai_users', JSON.stringify(users));
}

/**
 * Получение текущего пользователя
 */
async function getCurrentUser() {
    // Пробуем использовать API если доступен
    if (typeof apiGetCurrentUser !== 'undefined') {
        try {
            const user = await apiGetCurrentUser();
            if (user) {
                // Сохраняем для совместимости
                const session = {
                    userId: user.id,
                    email: user.email,
                    name: user.name,
                    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
                };
                localStorage.setItem('npai_session', JSON.stringify(session));
                return user;
            }
        } catch (e) {
            console.warn('API недоступен, используем localStorage');
        }
    }
    
    // Fallback на localStorage
    const session = JSON.parse(localStorage.getItem('npai_session') || 'null');
    
    if (!session || session.expiresAt < Date.now()) {
        return null;
    }
    
    const users = getUsers();
    const user = users.find(u => u.id === session.userId);
    
    return user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        subscription: user.subscription
    } : null;
}

/**
 * Регистрация нового пользователя
 */
async function register(email, password, name, company) {
    // Пробуем использовать API если доступен
    if (typeof apiRegister !== 'undefined') {
        try {
            const result = await apiRegister(email, password, name, company);
            // Если API вернул успех, используем его
            if (result.success) {
                return result;
            }
            // Если это ошибка соединения, пробуем localStorage
            if (result.code === 'CONNECTION_ERROR' || result.message === 'SERVER_UNAVAILABLE') {
                console.warn('API недоступен, используем localStorage');
            } else {
                // Если это другая ошибка (валидация и т.д.), возвращаем её
                return result;
            }
        } catch (e) {
            console.warn('API недоступен, используем localStorage:', e.message);
        }
    }
    
    // Fallback на localStorage
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    
    const newUser = {
        id: Date.now().toString(),
        email,
        password: btoa(password),
        name,
        company: company || '',
        createdAt: new Date().toISOString(),
        subscription: {
            plan: 'free',
            modules: ['eco', 'marketplace'],
            modulePlans: {
                eco: 'free',
                marketplace: 'free'
            },
            expiresAt: null
        }
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return {
        success: true,
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            company: newUser.company,
            subscription: newUser.subscription
        }
    };
}

/**
 * Вход в систему
 */
async function login(email, password) {
    // Пробуем использовать API если доступен
    if (typeof apiLogin !== 'undefined') {
        try {
            const result = await apiLogin(email, password);
            // Если API вернул успех, используем его
            if (result.success) {
                // Сохраняем сессию для совместимости
                const session = {
                    userId: result.user.id,
                    email: result.user.email,
                    name: result.user.name,
                    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
                };
                localStorage.setItem('npai_session', JSON.stringify(session));
                return result;
            }
            // Если это ошибка соединения, пробуем localStorage
            if (result.code === 'CONNECTION_ERROR' || result.message === 'SERVER_UNAVAILABLE') {
                console.warn('API недоступен, используем localStorage');
            } else {
                // Если это другая ошибка (неверный пароль и т.д.), возвращаем её
                return result;
            }
        } catch (e) {
            console.warn('API недоступен, используем localStorage:', e.message);
        }
    }
    
    // Fallback на localStorage
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return { success: false, message: 'Пользователь не найден' };
    }
    
    if (atob(user.password) !== password) {
        return { success: false, message: 'Неверный пароль' };
    }
    
    const session = {
        userId: user.id,
        email: user.email,
        name: user.name,
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 дней
    };
    
    localStorage.setItem('npai_session', JSON.stringify(session));
    
    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            company: user.company,
            subscription: user.subscription
        }
    };
}

/**
 * Выход из системы
 */
function logout() {
    localStorage.removeItem('npai_session');
    return { success: true };
}

/**
 * Обновление подписки пользователя
 */
function updateSubscription(userId, moduleId, plan) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return { success: false, message: 'Пользователь не найден' };
    }
    
    // Обновление подписки
    if (!user.subscription.modules.includes(moduleId)) {
        user.subscription.modules.push(moduleId);
    }
    
    // Обновление плана для модуля
    if (!user.subscription.modulePlans) {
        user.subscription.modulePlans = {};
    }
    user.subscription.modulePlans[moduleId] = plan;
    
    saveUsers(users);
    
    return {
        success: true,
        subscription: user.subscription
    };
}

/**
 * Инициализация тестового пользователя (только если нет пользователей)
 * УБРАНО автоматическое создание - теперь создается только если пользователь явно запросит
 */
function initTestUser() {
    // НЕ создаем автоматически - это вызывало проблемы при первом посещении
    // Тестовый пользователь может быть создан только вручную через админ панель
}

