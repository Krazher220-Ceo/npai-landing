// ===========================
// NPAI Functional Site - Core Functions
// ===========================

// Global state
const NPAI = {
    currentModule: 'dashboard',
    sidebar: null,
    sidebarCollapsed: false,
    loadingOverlay: null,
    toastContainer: null
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeTopbar();
    initializeModules();
    initializeToasts();
    
    // Show welcome toast
    setTimeout(() => {
        showToast('success', 'Добро пожаловать!', 'Платформа NPAI успешно загружена');
    }, 500);
});

// ===========================
// Sidebar Functions
// ===========================

function initializeSidebar() {
    NPAI.sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileToggle = document.getElementById('mobileToggle');
    
    // Desktop toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            NPAI.sidebar.classList.toggle('collapsed');
            NPAI.sidebarCollapsed = NPAI.sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', NPAI.sidebarCollapsed);
        });
    }
    
    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            NPAI.sidebar.classList.toggle('mobile-active');
        });
    }
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!NPAI.sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                NPAI.sidebar.classList.remove('mobile-active');
            }
        }
    });
    
    // Load saved sidebar state
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        NPAI.sidebar.classList.add('collapsed');
        NPAI.sidebarCollapsed = true;
    }
}

// ===========================
// Topbar Functions
// ===========================

function initializeTopbar() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            }
        });
    }
    
    // Notification button
    const notificationBtn = document.querySelector('.topbar-btn[title="Уведомления"]');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showToast('info', 'Уведомления', 'У вас 3 новых уведомления');
        });
    }
}

function performSearch(query) {
    console.log('Поиск:', query);
    // TODO: Implement actual search functionality
}

// ===========================
// Module Navigation
// ===========================

function initializeModules() {
    const navItems = document.querySelectorAll('.nav-item[data-module]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const module = this.getAttribute('data-module');
            navigateToModule(module);
        });
    });
}

function navigateToModule(moduleName) {
    // Show loading
    showLoading();
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-module="${moduleName}"]`)?.classList.add('active');
    
    // Hide all modules
    document.querySelectorAll('.module-content').forEach(module => {
        module.classList.remove('active');
    });
    
    // Update page title
    updatePageTitle(moduleName);
    
    // Show selected module
    const moduleElement = document.getElementById(`${moduleName}-module`);
    if (moduleElement) {
        // Load module content if empty
        if (moduleElement.innerHTML.trim() === '') {
            loadModuleContent(moduleName, moduleElement);
        }
        
        setTimeout(() => {
            moduleElement.classList.add('active');
            NPAI.currentModule = moduleName;
            hideLoading();
            
            // Close mobile sidebar
            if (window.innerWidth <= 768) {
                NPAI.sidebar.classList.remove('mobile-active');
            }
        }, 300);
    } else {
        hideLoading();
    }
}

function updatePageTitle(moduleName) {
    const titles = {
        'dashboard': 'Главная панель',
        'eco': 'Экологический мониторинг',
        'analytics': 'Промышленная аналитика',
        'vision': 'AI-видеоаналитика',
        'acoustic': 'Акустическая диагностика',
        'thermal': 'Тепловизионный контроль',
        'knowledge': 'Цифровой технолог',
        'safety': 'Промышленная безопасность',
        'smartgrid': 'Энергоменеджмент',
        'marketplace': 'Marketplace решений',
        'settings': 'Настройки'
    };
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = titles[moduleName] || 'NPAI Platform';
    }
}

// ===========================
// Loading Overlay
// ===========================

function showLoading() {
    NPAI.loadingOverlay = document.getElementById('loadingOverlay');
    if (NPAI.loadingOverlay) {
        NPAI.loadingOverlay.classList.add('active');
    }
}

function hideLoading() {
    if (NPAI.loadingOverlay) {
        NPAI.loadingOverlay.classList.remove('active');
    }
}

// ===========================
// Toast Notifications
// ===========================

function initializeToasts() {
    NPAI.toastContainer = document.getElementById('toastContainer');
}

function showToast(type, title, message, duration = 5000) {
    if (!NPAI.toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    NPAI.toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// ===========================
// Utility Functions
// ===========================

function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function generateRandomData(count, min, max) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
}

// ===========================
// Report Generation
// ===========================

function generateReport() {
    showLoading();
    showToast('info', 'Генерация отчета', 'Начинается генерация отчета...');
    
    setTimeout(() => {
        hideLoading();
        showToast('success', 'Отчет готов', 'Отчет успешно сгенерирован и сохранен');
    }, 2000);
}

// ===========================
// Make functions globally available
// ===========================

window.navigateToModule = navigateToModule;
window.showToast = showToast;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.generateReport = generateReport;
window.formatNumber = formatNumber;
window.formatDate = formatDate;
window.generateRandomData = generateRandomData;







