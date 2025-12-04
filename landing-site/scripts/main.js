// ===========================
// NPAI Landing Site - Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initModuleDetails();
    initDocumentation();
    initAnimations();
});

// ===========================
// Navigation
// ===========================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===========================
// Smooth Scroll
// ===========================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // Height of navbar
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===========================
// Module Details Modal
// ===========================

const moduleData = {
    eco: {
        title: 'NPAI Eco - Экологический мониторинг',
        description: 'Комплексная система мониторинга экологической ситуации в реальном времени.',
        features: [
            {
                title: 'Визуализация загрязнения воздуха',
                items: [
                    'Карта выбросов предприятий в реальном времени',
                    'Индексы качества воздуха (AQI) по районам',
                    'Прогнозирование распространения загрязнений',
                    'Исторические данные и тренды'
                ]
            },
            {
                title: 'Мониторинг выбросов',
                items: [
                    'Данные с датчиков предприятий',
                    'Интеграция с государственными системами мониторинга',
                    'Автоматическое сравнение с нормативами',
                    'Алерты при превышении лимитов'
                ]
            },
            {
                title: 'Публичная карта',
                items: [
                    'Доступ для жителей городов',
                    'Информация о качестве воздуха в районе',
                    'Прозрачность деятельности предприятий',
                    'Мобильная версия'
                ]
            }
        ],
        technologies: 'IoT-датчики, спутниковые данные, машинное обучение для прогнозирования',
        value: 'Прозрачность для общества, соответствие экологическим стандартам, предотвращение штрафов'
    },
    analytics: {
        title: 'NPAI Analytics - Промышленная аналитика',
        description: 'Централизованная система сбора, обработки и визуализации производственных данных.',
        features: [
            {
                title: 'Сбор данных',
                items: [
                    'Импорт из 1С, ERP, SCADA',
                    'Автоматическая загрузка с датчиков',
                    'Ручной ввод данных',
                    'Интеграция с логистическими системами'
                ]
            },
            {
                title: 'Производственные показатели',
                items: [
                    'OEE (Overall Equipment Effectiveness)',
                    'Производительность линий',
                    'Время простоя оборудования',
                    'Качество продукции (брак, дефекты)'
                ]
            },
            {
                title: 'Потребление ресурсов',
                items: [
                    'Энергопотребление по подразделениям',
                    'Расход сырья и материалов',
                    'Водопотребление',
                    'Отходы производства'
                ]
            }
        ],
        technologies: 'ETL-процессы, Data Warehouse, Business Intelligence',
        value: 'Информированные решения, выявление узких мест, оптимизация процессов'
    },
    vision: {
        title: 'NPAI Vision - AI-видеоаналитика',
        description: 'Интеллектуальная система анализа видеопотоков с промышленных камер.',
        features: [
            {
                title: 'Контроль качества продукции',
                items: [
                    'Автоматическое обнаружение дефектов',
                    'Классификация брака по типам',
                    'Измерение размеров и параметров',
                    'Статистика качества в реальном времени'
                ]
            },
            {
                title: 'Техника безопасности',
                items: [
                    'Детекция отсутствия СИЗ (каска, жилет, очки)',
                    'Обнаружение людей в опасных зонах',
                    'Контроль соблюдения правил безопасности',
                    'Автоматические предупреждения'
                ]
            },
            {
                title: 'Мониторинг оборудования',
                items: [
                    'Детекция аномалий в работе станков',
                    'Контроль уровня заполнения резервуаров',
                    'Мониторинг состояния конвейерных лент',
                    'Обнаружение утечек и разливов'
                ]
            }
        ],
        technologies: 'Computer Vision, Deep Learning, Real-time video processing',
        value: 'Снижение брака на 30-50%, предотвращение аварий, автоматизация контроля'
    },
    acoustic: {
        title: 'NPAI Acoustic - Акустическая диагностика',
        description: 'Система предиктивного обслуживания на основе анализа звука и вибраций оборудования.',
        features: [
            {
                title: 'Предиктивное обслуживание',
                items: [
                    'Предсказание поломки подшипников за 2-3 недели',
                    'Детекция износа редукторов и моторов',
                    'Обнаружение дисбаланса роторов',
                    'Прогнозирование отказов насосов и компрессоров'
                ]
            },
            {
                title: 'Обнаружение утечек',
                items: [
                    'Детекция утечек газа по звуку (ультразвук)',
                    'Обнаружение протечек в трубопроводах',
                    'Контроль герметичности резервуаров',
                    'Мониторинг клапанов и задвижек'
                ]
            }
        ],
        technologies: 'Акустический анализ, спектральный анализ, машинное обучение',
        value: 'Предотвращение дорогостоящих простоев, увеличение срока службы оборудования'
    },
    safety: {
        title: 'NPAI Safety - Промышленная безопасность',
        description: 'Расширенная система контроля безопасности на производстве.',
        features: [
            {
                title: 'Контроль СИЗ',
                items: [
                    'Автоматическая фиксация отсутствия каски',
                    'Детекция отсутствия защитных жилетов',
                    'Контроль использования защитных очков',
                    'Проверка наличия страховочных тросов'
                ]
            },
            {
                title: 'Детекция опасных ситуаций',
                items: [
                    'Обнаружение людей в запрещенных зонах',
                    'Контроль доступа к опасным объектам',
                    'Детекция падения человека',
                    'Распознавание неестественных поз (травма, приступ)'
                ]
            }
        ],
        technologies: 'Computer Vision, IoT, Edge Computing',
        value: 'Снижение травматизма на 40-60%, защита от юридических рисков'
    },
    smartgrid: {
        title: 'NPAI Smart Grid - Энергоменеджмент',
        description: 'Система оптимизации энергопотребления и управления ресурсами предприятия.',
        features: [
            {
                title: 'Выявление энергетических потерь',
                items: [
                    'Обнаружение оборудования, работающего вхолостую',
                    'Детекция утечек тепла и энергии',
                    'Анализ пиковых нагрузок',
                    'Рекомендации по оптимизации'
                ]
            },
            {
                title: 'Прогнозирование нагрузок',
                items: [
                    'Прогноз пиковых нагрузок для оптимизации тарифов',
                    'Планирование энергопотребления',
                    'Балансировка нагрузок между подразделениями',
                    'Интеграция с энергосбытовыми компаниями'
                ]
            }
        ],
        technologies: 'IoT-счетчики, машинное обучение, энергетическая аналитика',
        value: 'Экономия 15-30% на энергозатратах, соответствие ESG-стандартам'
    },
    knowledge: {
        title: 'NPAI Knowledge - Цифровой Технолог (LLM)',
        description: 'Интеллектуальная система управления знаниями предприятия на основе больших языковых моделей.',
        features: [
            {
                title: 'Чат-бот для инженеров',
                items: [
                    'Ответы на вопросы по ремонту оборудования',
                    'Поиск в технической документации',
                    'Показ схем и чертежей',
                    'История поломок и ремонтов'
                ]
            },
            {
                title: 'Автоматическая генерация отчетов',
                items: [
                    'Преобразование сырых данных в структурированные отчеты',
                    'Генерация отчетов для госорганов',
                    'Создание презентаций для руководства',
                    'Перевод документов (русский/казахский/английский)'
                ]
            }
        ],
        technologies: 'Large Language Models (LLM), RAG, NLP',
        value: 'Сохранение экспертизы, ускорение обучения, автоматизация документооборота'
    },
    thermal: {
        title: 'NPAI Thermal - Тепловизионный контроль',
        description: 'Система мониторинга на основе анализа тепловых изображений.',
        features: [
            {
                title: 'Пожарная безопасность',
                items: [
                    'Обнаружение перегрева контактов в электрощитовых',
                    'Детекция горячих точек в оборудовании',
                    'Раннее предупреждение о возгорании',
                    'Мониторинг критических зон'
                ]
            },
            {
                title: 'Обнаружение утечек',
                items: [
                    'Поиск утечек тепла в зданиях',
                    'Детекция прорывов теплотрасс',
                    'Обнаружение утечек в изоляции',
                    'Контроль герметичности'
                ]
            }
        ],
        technologies: 'Тепловизионные камеры, дроны, компьютерное зрение',
        value: 'Предотвращение пожаров, энергоэффективность, безопасность персонала'
    },
    marketplace: {
        title: 'NPAI Marketplace - Маркетплейс решений',
        description: 'Платформа для разработчиков и компаний по созданию, продаже и интеграции кастомных решений.',
        features: [
            {
                title: 'Для разработчиков',
                items: [
                    'API и SDK для создания модулей',
                    'Шаблоны и примеры кода',
                    'Система тестирования и валидации',
                    'Документация и поддержка'
                ]
            },
            {
                title: 'Для компаний',
                items: [
                    'Каталог готовых решений',
                    'Поиск по отраслям и задачам',
                    'Демо-версии и тестирование',
                    'Прямая покупка и установка'
                ]
            }
        ],
        technologies: 'Microservices, API Gateway, Payment Gateway',
        value: 'Экосистема решений, монетизация для разработчиков, расширяемость платформы'
    },
    offline: {
        title: 'NPAI Offline - Офлайн-режим',
        description: 'Система работы без интернета с безопасной синхронизацией данных для критически важных предприятий.',
        features: [
            {
                title: 'Полная офлайн-работа',
                items: [
                    'Все модули работают без интернета',
                    'Локальное хранение данных',
                    'Локальная обработка ИИ',
                    'Автономные дашборды'
                ]
            },
            {
                title: 'Безопасная синхронизация',
                items: [
                    'Шифрование данных при передаче',
                    'Синхронизация по расписанию',
                    'Конфликт-резолюция',
                    'Версионирование данных'
                ]
            }
        ],
        technologies: 'Edge Computing, End-to-End Encryption, Conflict Resolution',
        value: 'Безопасность данных, работа в изолированных сетях'
    }
};

function initModuleDetails() {
    // Module details are handled by showModuleDetails function
}

function showModuleDetails(moduleId) {
    const modal = document.getElementById('moduleModal');
    const modalBody = document.getElementById('modalBody');
    const data = moduleData[moduleId];
    
    if (!data) return;
    
    let featuresHTML = '';
    data.features.forEach(feature => {
        featuresHTML += `
            <div class="feature-section">
                <h4><i class="fas fa-check-circle"></i> ${feature.title}</h4>
                <ul>
                    ${feature.items.map(item => `<li><i class="fas fa-angle-right"></i> ${item}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    
    modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <p class="modal-description">${data.description}</p>
        
        <div class="modal-features">
            <h3><i class="fas fa-list"></i> Функциональность</h3>
            ${featuresHTML}
        </div>
        
        <div class="modal-tech">
            <h3><i class="fas fa-cogs"></i> Технологии</h3>
            <p>${data.technologies}</p>
        </div>
        
        <div class="modal-value">
            <h3><i class="fas fa-star"></i> Ценность</h3>
            <p>${data.value}</p>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal()">
                <i class="fas fa-check"></i> Понятно
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-envelope"></i> Связаться с нами
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('moduleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('moduleModal');
    if (event.target == modal) {
        closeModal();
    }
}

// ===========================
// Documentation
// ===========================

function initDocumentation() {
    // Documentation loading is handled by toggleDocView function
}

let docLoaded = false;

function toggleDocView() {
    const docContent = document.getElementById('documentationContent');
    
    if (docContent.style.display === 'none') {
        docContent.style.display = 'block';
        
        if (!docLoaded) {
            // Load documentation from markdown file
            fetch('../ПОЛНОЕ_ОПИСАНИЕ_ПРОЕКТА.md')
                .then(response => response.text())
                .then(markdown => {
                    // Convert markdown to HTML (basic conversion)
                    const html = markdownToHTML(markdown);
                    docContent.innerHTML = html;
                    docLoaded = true;
                })
                .catch(error => {
                    docContent.innerHTML = `
                        <div style="padding: 2rem; text-align: center;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                            <h3>Не удалось загрузить документацию</h3>
                            <p>Пожалуйста, попробуйте скачать файлы напрямую.</p>
                        </div>
                    `;
                });
        }
    } else {
        docContent.style.display = 'none';
    }
}

// Simple markdown to HTML converter (basic implementation)
function markdownToHTML(markdown) {
    let html = markdown;
    
    // Remove formatting tags
    html = html.replace(/\[CENTER\]/gi, '<div style="text-align: center;">');
    html = html.replace(/\[\/CENTER\]/gi, '</div>');
    html = html.replace(/\[FONT:\d+\]/gi, '');
    html = html.replace(/\[\/FONT\]/gi, '');
    html = html.replace(/\[COLOR:#[0-9a-f]+\]/gi, '');
    html = html.replace(/\[\/COLOR\]/gi, '');
    html = html.replace(/\[BGCOLOR:#[0-9a-f]+\]/gi, '');
    html = html.replace(/\[\/BGCOLOR\]/gi, '');
    html = html.replace(/\[SPACE:\d+\]/gi, '');
    
    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Convert bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Convert lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Convert line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/---/g, '<hr>');
    
    // Wrap in paragraphs
    html = '<div class="doc-text"><p>' + html + '</p></div>';
    
    return html;
}

// ===========================
// Animations
// ===========================

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elements = document.querySelectorAll('.module-card, .feature-card, .pricing-card, .ps-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===========================
// Global Functions
// ===========================

// Make functions available globally
window.showModuleDetails = showModuleDetails;
window.closeModal = closeModal;
window.toggleDocView = toggleDocView;


