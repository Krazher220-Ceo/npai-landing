/**
 * Google OAuth аутентификация
 */

// Google OAuth конфигурация
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Замените на ваш Client ID
const GOOGLE_SCOPES = 'openid email profile';

/**
 * Инициализация Google OAuth
 */
function initGoogleAuth() {
    // Загружаем Google API
    if (typeof gapi === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: GOOGLE_CLIENT_ID
                });
            });
        };
        document.head.appendChild(script);
    }
}

/**
 * Вход через Google
 */
async function loginWithGoogle() {
    try {
        if (typeof gapi === 'undefined' || !gapi.auth2) {
            initGoogleAuth();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const authInstance = gapi.auth2.getAuthInstance();
        const googleUser = await authInstance.signIn({
            scope: GOOGLE_SCOPES
        });

        const profile = googleUser.getBasicProfile();
        const idToken = googleUser.getAuthResponse().id_token;

        // Получаем данные пользователя
        const userData = {
            id: profile.getId(),
            email: profile.getEmail(),
            name: profile.getName(),
            image: profile.getImageUrl(),
            idToken: idToken,
            provider: 'google'
        };

        // Сохраняем в localStorage или отправляем на сервер
        return await handleGoogleAuth(userData);
    } catch (error) {
        console.error('Ошибка Google аутентификации:', error);
        return {
            success: false,
            message: 'Ошибка входа через Google. Попробуйте снова.'
        };
    }
}

/**
 * Обработка данных от Google
 */
async function handleGoogleAuth(userData) {
    // Проверяем, есть ли пользователь с таким email
    const users = JSON.parse(localStorage.getItem('npai_users') || '[]');
    let user = users.find(u => u.email === userData.email);

    if (!user) {
        // Создаем нового пользователя
        user = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            image: userData.image,
            provider: 'google',
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
        users.push(user);
        localStorage.setItem('npai_users', JSON.stringify(users));
    } else {
        // Обновляем данные существующего пользователя
        user.name = userData.name;
        user.image = userData.image;
        user.provider = 'google';
    }

    // Создаем сессию
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
            image: user.image,
            company: user.company,
            subscription: user.subscription
        }
    };
}

// Инициализация при загрузке
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initGoogleAuth();
    });
}


