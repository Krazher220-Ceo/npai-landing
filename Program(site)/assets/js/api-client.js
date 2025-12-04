/**
 * API клиент для работы с сервером
 */

const API_BASE_URL = 'http://localhost:3001';

/**
 * Отправка запроса к API
 */
async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        // Проверяем статус ответа
        if (!response.ok) {
            // Если сервер недоступен (сетевые ошибки), возвращаем специальный код
            if (response.status === 0 || response.status >= 500) {
                throw new Error('SERVER_UNAVAILABLE');
            }
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        // Если это ошибка соединения, возвращаем специальный код
        if (error.message === 'SERVER_UNAVAILABLE' || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            return { success: false, message: 'SERVER_UNAVAILABLE', code: 'CONNECTION_ERROR' };
        }
        console.error('API Error:', error);
        return { success: false, message: 'Ошибка соединения с сервером', code: 'CONNECTION_ERROR' };
    }
}

/**
 * Регистрация через API
 */
async function apiRegister(email, password, name, company) {
    const result = await apiRequest('/api/auth/register', 'POST', {
        email,
        password,
        name,
        company
    });
    
    if (result.success && result.sessionId) {
        localStorage.setItem('npai_session_id', result.sessionId);
    }
    
    return result;
}

/**
 * Вход через API
 */
async function apiLogin(email, password) {
    const result = await apiRequest('/api/auth/login', 'POST', {
        email,
        password
    });
    
    if (result.success && result.sessionId) {
        localStorage.setItem('npai_session_id', result.sessionId);
    }
    
    return result;
}

/**
 * Выход через API
 */
async function apiLogout() {
    const sessionId = localStorage.getItem('npai_session_id');
    if (sessionId) {
        await apiRequest('/api/auth/logout', 'POST', { sessionId });
        localStorage.removeItem('npai_session_id');
    }
    return { success: true };
}

/**
 * Получить текущего пользователя через API
 */
async function apiGetCurrentUser() {
    const sessionId = localStorage.getItem('npai_session_id');
    if (!sessionId) {
        return null;
    }
    
    const result = await apiRequest(`/api/auth/me?sessionId=${sessionId}`);
    
    if (result.success) {
        return result.user;
    }
    
    return null;
}

/**
 * Обновить подписку через API
 */
async function apiUpdateSubscription(moduleId, plan) {
    const sessionId = localStorage.getItem('npai_session_id');
    if (!sessionId) {
        return { success: false, message: 'Необходима авторизация' };
    }
    
    return await apiRequest('/api/auth/subscription', 'POST', {
        sessionId,
        moduleId,
        plan
    });
}

/**
 * Получить данные модуля через API
 */
async function apiGetModuleData(moduleId) {
    const result = await apiRequest(`/api/module/${moduleId}`);
    return result.success ? result.data : null;
}

/**
 * Сохранить данные модуля через API
 */
async function apiSaveModuleData(moduleId, data) {
    return await apiRequest(`/api/module/${moduleId}`, 'POST', { data });
}








