/**
 * Просмотр кодов модулей для программистов
 */

let agreementAccepted = false;

async function initCodeViewer() {
    // Проверка авторизации
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = '../../../auth/login.html';
        return;
    }
    
    // Проверка принятия соглашения
    const savedAgreement = localStorage.getItem('npai_code_agreement');
    if (savedAgreement === 'accepted') {
        agreementAccepted = true;
        showCodeContent();
    }
}

function acceptAgreement() {
    agreementAccepted = true;
    localStorage.setItem('npai_code_agreement', 'accepted');
    showCodeContent();
    
    // Показать уведомление
    alert('Соглашение принято. Теперь вы можете просматривать коды.');
}

function showCodeContent() {
    const banner = document.getElementById('agreement-banner');
    const content = document.getElementById('code-content');
    
    if (banner) banner.style.display = 'none';
    if (content) content.style.display = 'block';
}

function copyCode(codeId) {
    const codeBlock = document.getElementById(codeId);
    if (!codeBlock) return;
    
    const code = codeBlock.textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Код скопирован в буфер обмена');
    }).catch(() => {
        alert('Ошибка копирования кода');
    });
}

async function purchaseModuleCreation() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = '../../../auth/login.html';
        return;
    }
    
    // Проверка, есть ли уже функция создания модулей
    if (user.subscription?.canCreateModules) {
        alert('У вас уже есть доступ к созданию модулей!');
        window.location.href = '../module-creator/index.html';
        return;
    }
    
    // Показываем модальное окно покупки
    const price = 50000; // 50,000 тенге
    const confirmed = confirm(
        `Приобрести функцию создания модулей?\n\n` +
        `Цена: ${price.toLocaleString()} ₸\n\n` +
        `После покупки вы сможете:\n` +
        `- Создавать собственные модули\n` +
        `- Публиковать модули в маркетплейсе\n` +
        `- Получать доход от продажи модулей\n\n` +
        `Продолжить?`
    );
    
    if (confirmed) {
        // Симуляция покупки
        const result = await processPurchase(user.id, 'module_creation', price);
        
        if (result.success) {
            alert('Покупка успешна! Теперь вы можете создавать модули.');
            window.location.href = '../module-creator/index.html';
        } else {
            alert('Ошибка при покупке: ' + (result.message || 'Неизвестная ошибка'));
        }
    }
}

async function processPurchase(userId, productId, price) {
    // В реальном приложении здесь будет интеграция с платежной системой
    // Пока симулируем успешную покупку
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Обновляем подписку пользователя
            const users = JSON.parse(localStorage.getItem('npai_users') || '[]');
            const user = users.find(u => u.id === userId);
            
            if (user) {
                if (!user.subscription) {
                    user.subscription = {
                        plan: 'free',
                        modules: [],
                        modulePlans: {}
                    };
                }
                
                // Добавляем функцию создания модулей
                user.subscription.canCreateModules = true;
                user.subscription.moduleCreationPurchased = true;
                user.subscription.moduleCreationPurchaseDate = new Date().toISOString();
                
                localStorage.setItem('npai_users', JSON.stringify(users));
                
                resolve({
                    success: true,
                    transactionId: 'TXN-' + Date.now(),
                    message: 'Покупка успешно обработана'
                });
            } else {
                resolve({
                    success: false,
                    message: 'Пользователь не найден'
                });
            }
        }, 1000);
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCodeViewer);


