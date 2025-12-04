/**
 * Главный скрипт приложения
 * Обновляет навигацию в зависимости от авторизации
 * Использует функции из auth-utils.js
 */

/**
 * Обновление ссылки авторизации в навигации
 */
async function updateAuthNavigation() {
    const authLink = document.getElementById('auth-nav-link');
    const offlineLink = document.getElementById('dashboard-offline-link');
    const onlineLink = document.getElementById('dashboard-online-link');
    
    try {
        const user = await getCurrentUser();
        const basePath = getBasePath ? getBasePath() : './';
        
        if (user) {
            if (authLink) {
                authLink.textContent = user.name || 'Профиль';
                authLink.href = basePath + 'auth/profile.html';
            }
            if (offlineLink) offlineLink.style.display = 'block';
            if (onlineLink) onlineLink.style.display = 'block';
        } else {
            if (authLink) {
                authLink.textContent = 'Войти';
                authLink.href = basePath + 'auth/login.html';
            }
            if (offlineLink) offlineLink.style.display = 'none';
            if (onlineLink) onlineLink.style.display = 'none';
        }
    } catch (e) {
        const basePath = getBasePath ? getBasePath() : './';
        if (authLink) {
            authLink.textContent = 'Войти';
            authLink.href = basePath + 'auth/login.html';
        }
        if (offlineLink) offlineLink.style.display = 'none';
        if (onlineLink) onlineLink.style.display = 'none';
    }
}

// Обновление при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateAuthNavigation();
});

