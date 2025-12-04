/**
 * Скрипт авторизации и регистрации
 * Использует функции из auth-utils.js (должен быть загружен первым)
 */

/**
 * Показать сообщение об ошибке
 */
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        const successDiv = document.getElementById('success-message');
        if (successDiv) successDiv.style.display = 'none';
    }
}

/**
 * Показать сообщение об успехе
 */
function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        const errorDiv = document.getElementById('error-message');
        if (errorDiv) errorDiv.style.display = 'none';
    }
}

/**
 * Скрыть все сообщения
 */
function hideMessages() {
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    // Проверка параметра register в URL
    const urlParams = new URLSearchParams(window.location.search);
    const shouldRegister = urlParams.get('register') === 'true';
    
    if (shouldRegister) {
        // Переключаем на вкладку регистрации
        const registerTab = document.querySelector('.auth-tab[data-tab="register"]');
        if (registerTab) {
            registerTab.click();
        }
    }
    
    // Проверка авторизации (только если это не явный запрос на регистрацию)
    if (!shouldRegister) {
        getCurrentUser().then(user => {
            if (user) {
                // Пользователь уже авторизован, перенаправляем
                const redirectUrl = sessionStorage.getItem('redirect_after_login') || '../index.html';
                sessionStorage.removeItem('redirect_after_login');
                window.location.href = redirectUrl;
            }
        }).catch(() => {
            // Игнорируем ошибки при проверке - пользователь может быть не авторизован
        });
    }

    // Переключение между вкладками
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Обновление активной вкладки
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Показ/скрытие форм
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            if (loginForm) loginForm.style.display = tabName === 'login' ? 'flex' : 'none';
            if (registerForm) registerForm.style.display = tabName === 'register' ? 'flex' : 'none';
            
            // Очистка сообщений
            hideMessages();
        });
    });

    // Обработка формы входа
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideMessages();
            
            const email = document.getElementById('login-email')?.value;
            const password = document.getElementById('login-password')?.value;
            
            if (!email || !password) {
                showError('Заполните все поля');
                return;
            }
            
            const result = await login(email, password);
            
            if (result.success) {
                showSuccess('Успешный вход! Перенаправление...');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
            } else {
                showError(result.message || 'Ошибка входа. Проверьте данные.');
            }
        });
    }

    // Обработка формы регистрации
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideMessages();
            
            const name = document.getElementById('register-name')?.value;
            const email = document.getElementById('register-email')?.value;
            const company = document.getElementById('register-company')?.value || '';
            const password = document.getElementById('register-password')?.value;
            const passwordConfirm = document.getElementById('register-password-confirm')?.value;
            
            if (!name || !email || !password || !passwordConfirm) {
                showError('Заполните все обязательные поля');
                return;
            }
            
            // Валидация
            if (password !== passwordConfirm) {
                showError('Пароли не совпадают');
                return;
            }
            
            if (password.length < 6) {
                showError('Пароль должен содержать минимум 6 символов');
                return;
            }
            
            const result = await register(email, password, name, company);
            
            if (result.success) {
                showSuccess('Регистрация успешна! Выполняется вход...');
                setTimeout(async () => {
                    // Автоматический вход после регистрации
                    const loginResult = await login(email, password);
                    if (loginResult.success) {
                        window.location.href = '../index.html';
                    } else {
                        showError('Ошибка автоматического входа. Попробуйте войти вручную.');
                    }
                }, 1000);
            } else {
                showError(result.message || 'Ошибка регистрации. Попробуйте снова.');
            }
        });
    }
});

