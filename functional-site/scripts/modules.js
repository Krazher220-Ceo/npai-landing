// ===========================
// NPAI Modules - Content Loader
// ===========================

// Module detail chips
const moduleFootnotes = {
    eco: `
        <div class="module-detail-chips">
            <span class="detail-chip success"><i class="fas fa-server"></i> Локальное хранение данных</span>
            <span class="detail-chip info"><i class="fas fa-wave-square"></i> AQI и выбросы 24/7</span>
            <span class="detail-chip warning"><i class="fas fa-lock"></i> Отчеты для госорганов</span>
        </div>
    `,
    analytics: `
        <div class="module-detail-chips">
            <span class="detail-chip primary"><i class="fas fa-cogs"></i> Интеграция 1С/ERP</span>
            <span class="detail-chip success"><i class="fas fa-chart-line"></i> Benchmarking и OEE</span>
            <span class="detail-chip info"><i class="fas fa-table"></i> Excel/CSV экспорт</span>
        </div>
    `,
    vision: `
        <div class="module-detail-chips">
            <span class="detail-chip primary"><i class="fas fa-video"></i> 24 Live камеры</span>
            <span class="detail-chip danger"><i class="fas fa-project-diagram"></i> 99% точность</span>
            <span class="detail-chip warning"><i class="fas fa-hard-hat"></i> Контроль СИЗ</span>
        </div>
    `,
    acoustic: `
        <div class="module-detail-chips">
            <span class="detail-chip success"><i class="fas fa-microphone"></i> Предиктивное ТО</span>
            <span class="detail-chip info"><i class="fas fa-waveform"></i> Анализ вибраций и шума</span>
            <span class="detail-chip warning"><i class="fas fa-tools"></i> Планирование ТО</span>
        </div>
    `,
    knowledge: `
        <div class="module-detail-chips">
            <span class="detail-chip primary"><i class="fas fa-robot"></i> LLM + RAG</span>
            <span class="detail-chip success"><i class="fas fa-language"></i> 3 языка: RU/KZ/EN</span>
            <span class="detail-chip info"><i class="fas fa-book"></i> База знаний предприятия</span>
        </div>
    `,
    safety: `
        <div class="module-detail-chips">
            <span class="detail-chip warning"><i class="fas fa-hard-hat"></i> Контроль СИЗ</span>
            <span class="detail-chip danger"><i class="fas fa-bell"></i> Критические алерты</span>
            <span class="detail-chip info"><i class="fas fa-file-alt"></i> Отчеты для инспекций</span>
        </div>
    `,
    smartgrid: `
        <div class="module-detail-chips">
            <span class="detail-chip success"><i class="fas fa-leaf"></i> CO2 -18%</span>
            <span class="detail-chip info"><i class="fas fa-bolt"></i> Экономия 23%</span>
            <span class="detail-chip primary"><i class="fas fa-chart-area"></i> Управление пиками</span>
        </div>
    `,
    marketplace: `
        <div class="module-detail-chips">
            <span class="detail-chip primary"><i class="fas fa-store"></i> Комиссия 30%</span>
            <span class="detail-chip success"><i class="fas fa-star"></i> Рейтинги и отзывы</span>
            <span class="detail-chip info"><i class="fas fa-link"></i> API интеграция</span>
        </div>
    `,
    settings: `
        <div class="module-detail-chips">
            <span class="detail-chip info"><i class="fas fa-user-shield"></i> Enterprise info</span>
            <span class="detail-chip success"><i class="fas fa-bell"></i> Push + Email</span>
            <span class="detail-chip primary"><i class="fas fa-users"></i> Управление ролями</span>
        </div>
    `
};

// Module content templates
const moduleTemplates = {
    eco: `
        <div class="module-header">
            <h2><i class="fas fa-leaf"></i> Экологический мониторинг</h2>
            <p>Отслеживание выбросов и качества воздуха в реальном времени</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card success">
                <div class="stat-icon"><i class="fas fa-wind"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Качество воздуха (AQI)</div>
                    <div class="stat-value">42</div>
                    <div class="stat-change positive"><i class="fas fa-check-circle"></i> Хорошее</div>
                </div>
            </div>
            <div class="stat-card info">
                <div class="stat-icon"><i class="fas fa-smog"></i></div>
                <div class="stat-content">
                    <div class="stat-label">CO2 (ppm)</div>
                    <div class="stat-value">380</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-down"></i> -5% за день</div>
                </div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon"><i class="fas fa-industry"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Выбросы (т/день)</div>
                    <div class="stat-value">12.4</div>
                    <div class="stat-change neutral"><i class="fas fa-minus"></i> В норме</div>
                </div>
            </div>
            <div class="stat-card primary">
                <div class="stat-icon"><i class="fas fa-temperature-high"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Температура</div>
                    <div class="stat-value">22°C</div>
                    <div class="stat-change positive"><i class="fas fa-check"></i> Норма</div>
                </div>
            </div>
        </div>

        <div class="charts-row">
            <div class="chart-card" style="grid-column: 1 / -1;">
                <div class="chart-header">
                    <h3>Уровень загрязнения воздуха (24 часа)</h3>
                </div>
                <div class="eco-map-placeholder">
                    <i class="fas fa-map-marked-alt"></i>
                    <p>Интерактивная карта загрязнений</p>
                    <button class="btn-primary" onclick="showToast('info', 'Карта', 'Открытие интерактивной карты...')">
                        Открыть полную карту
                    </button>
                </div>
            </div>
        </div>

        <div class="activity-section">
            <h3><i class="fas fa-bell"></i> Уведомления об экологии</h3>
            <div class="activity-list">
                <div class="activity-item">
                    <div class="activity-icon success">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Все показатели в норме</div>
                        <div class="activity-time">Сейчас</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon info">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Экологический отчет отправлен в Минэкологии</div>
                        <div class="activity-time">2 часа назад</div>
                    </div>
                </div>
            </div>
        </div>
        ${moduleFootnotes.eco}
    `,
    
    analytics: `
        <div class="module-header">
            <h2><i class="fas fa-chart-bar"></i> Промышленная аналитика</h2>
            <p>Комплексный анализ производственных данных</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card primary">
                <div class="stat-icon"><i class="fas fa-tachometer-alt"></i></div>
                <div class="stat-content">
                    <div class="stat-label">OEE (эффективность)</div>
                    <div class="stat-value">82%</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +4% за неделю</div>
                </div>
            </div>
            <div class="stat-card success">
                <div class="stat-icon"><i class="fas fa-box"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Произведено единиц</div>
                    <div class="stat-value">15,248</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +12% за день</div>
                </div>
            </div>
            <div class="stat-card danger">
                <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Брак</div>
                    <div class="stat-value">2.1%</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-down"></i> -0.5% за день</div>
                </div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon"><i class="fas fa-clock"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Простои (мин)</div>
                    <div class="stat-value">45</div>
                    <div class="stat-change neutral"><i class="fas fa-minus"></i> В пределах нормы</div>
                </div>
            </div>
        </div>

        <div class="data-table-card">
            <div class="table-header">
                <h3><i class="fas fa-table"></i> Производственные линии</h3>
                <button class="btn-secondary" onclick="showToast('info', 'Экспорт', 'Экспорт данных в Excel...')">
                    <i class="fas fa-download"></i> Экспорт
                </button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Линия</th>
                        <th>Статус</th>
                        <th>Производительность</th>
                        <th>Качество</th>
                        <th>OEE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i class="fas fa-cog"></i> Линия 1</td>
                        <td><span class="badge badge-success">Работает</span></td>
                        <td>92%</td>
                        <td>98%</td>
                        <td>90%</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-cog"></i> Линия 2</td>
                        <td><span class="badge badge-success">Работает</span></td>
                        <td>88%</td>
                        <td>96%</td>
                        <td>84%</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-cog"></i> Линия 3</td>
                        <td><span class="badge badge-warning">Обслуживание</span></td>
                        <td>0%</td>
                        <td>-</td>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-cog"></i> Линия 4</td>
                        <td><span class="badge badge-success">Работает</span></td>
                        <td>95%</td>
                        <td>99%</td>
                        <td>94%</td>
                    </tr>
                </tbody>
            </table>
        </div>
        ${moduleFootnotes.analytics}
    `,
    
    vision: `
        <div class="module-header">
            <h2><i class="fas fa-video"></i> AI-видеоаналитика</h2>
            <p>Интеллектуальный анализ видеопотоков для контроля качества</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card primary">
                <div class="stat-icon"><i class="fas fa-camera"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Активные камеры</div>
                    <div class="stat-value">24</div>
                    <div class="stat-change positive"><i class="fas fa-check-circle"></i> Все онлайн</div>
                </div>
            </div>
            <div class="stat-card success">
                <div class="stat-icon"><i class="fas fa-check-double"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Проверено изделий</div>
                    <div class="stat-value">8,942</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-up"></i> Сегодня</div>
                </div>
            </div>
            <div class="stat-card danger">
                <div class="stat-icon"><i class="fas fa-exclamation-circle"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Обнаружено дефектов</div>
                    <div class="stat-value">24</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-down"></i> -30% за день</div>
                </div>
            </div>
            <div class="stat-card info">
                <div class="stat-icon"><i class="fas fa-percentage"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Точность AI</div>
                    <div class="stat-value">97.8%</div>
                    <div class="stat-change positive"><i class="fas fa-star"></i> Отлично</div>
                </div>
            </div>
        </div>

        <div class="video-grid">
            <div class="video-card">
                <div class="video-placeholder">
                    <i class="fas fa-video"></i>
                    <p>Камера 1: Линия сборки</p>
                    <span class="badge badge-success">Live</span>
                </div>
                <div class="video-stats">
                    <span><i class="fas fa-check"></i> Без дефектов</span>
                    <span>FPS: 30</span>
                </div>
            </div>
            <div class="video-card">
                <div class="video-placeholder">
                    <i class="fas fa-video"></i>
                    <p>Камера 2: Контроль качества</p>
                    <span class="badge badge-success">Live</span>
                </div>
                <div class="video-stats">
                    <span><i class="fas fa-check"></i> Без дефектов</span>
                    <span>FPS: 30</span>
                </div>
            </div>
            <div class="video-card">
                <div class="video-placeholder">
                    <i class="fas fa-video"></i>
                    <p>Камера 3: Упаковка</p>
                    <span class="badge badge-warning">Алерт</span>
                </div>
                <div class="video-stats">
                    <span><i class="fas fa-exclamation-triangle"></i> 1 дефект</span>
                    <span>FPS: 30</span>
                </div>
            </div>
            <div class="video-card">
                <div class="video-placeholder">
                    <i class="fas fa-video"></i>
                    <p>Камера 4: Склад</p>
                    <span class="badge badge-success">Live</span>
                </div>
                <div class="video-stats">
                    <span><i class="fas fa-check"></i> Норма</span>
                    <span>FPS: 30</span>
                </div>
            </div>
        </div>
        ${moduleFootnotes.vision}
    `,
    
    acoustic: `
        <div class="module-header">
            <h2><i class="fas fa-volume-up"></i> Акустическая диагностика</h2>
            <p>Предиктивное обслуживание на основе анализа звука</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card success">
                <div class="stat-icon"><i class="fas fa-microphone"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Активные датчики</div>
                    <div class="stat-value">36</div>
                    <div class="stat-change positive"><i class="fas fa-check-circle"></i> Все в норме</div>
                </div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Требуют внимания</div>
                    <div class="stat-value">3</div>
                    <div class="stat-change neutral"><i class="fas fa-info-circle"></i> Осмотр</div>
                </div>
            </div>
            <div class="stat-card info">
                <div class="stat-icon"><i class="fas fa-calendar-check"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Предотвращено поломок</div>
                    <div class="stat-value">12</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-up"></i> За месяц</div>
                </div>
            </div>
            <div class="stat-card primary">
                <div class="stat-icon"><i class="fas fa-tools"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Запланировано ТО</div>
                    <div class="stat-value">5</div>
                    <div class="stat-change neutral"><i class="fas fa-calendar"></i> Эта неделя</div>
                </div>
            </div>
        </div>

        <div class="equipment-list">
            <h3><i class="fas fa-cogs"></i> Состояние оборудования</h3>
            <div class="equipment-grid">
                <div class="equipment-card status-good">
                    <div class="equipment-header">
                        <i class="fas fa-fan"></i>
                        <span>Насос #12</span>
                    </div>
                    <div class="equipment-status">
                        <span class="status-badge good">Отлично</span>
                        <div class="health-bar">
                            <div class="health-fill" style="width: 95%; background: #16a34a;"></div>
                        </div>
                        <p>95% здоровья</p>
                    </div>
                </div>
                <div class="equipment-card status-warning">
                    <div class="equipment-header">
                        <i class="fas fa-cog"></i>
                        <span>Компрессор #3</span>
                    </div>
                    <div class="equipment-status">
                        <span class="status-badge warning">Внимание</span>
                        <div class="health-bar">
                            <div class="health-fill" style="width: 65%; background: #f59e0b;"></div>
                        </div>
                        <p>Рекомендуется ТО через 14 дней</p>
                    </div>
                </div>
                <div class="equipment-card status-good">
                    <div class="equipment-header">
                        <i class="fas fa-industry"></i>
                        <span>Турбина #1</span>
                    </div>
                    <div class="equipment-status">
                        <span class="status-badge good">Отлично</span>
                        <div class="health-bar">
                            <div class="health-fill" style="width: 88%; background: #16a34a;"></div>
                        </div>
                        <p>88% здоровья</p>
                    </div>
                </div>
            </div>
        </div>
        ${moduleFootnotes.acoustic}
    `,
    
    knowledge: `
        <div class="module-header">
            <h2><i class="fas fa-brain"></i> Цифровой технолог (AI)</h2>
            <p>Интеллектуальный помощник на базе больших языковых моделей</p>
        </div>

        <div class="ai-chat-container">
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message bot">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Здравствуйте! Я цифровой технолог NPAI. Чем могу помочь?</p>
                        <span class="message-time">Только что</span>
                    </div>
                </div>
                <div class="chat-suggestions">
                    <button class="suggestion-btn" onclick="askAI('Как устранить утечку в насосе #12?')">
                        <i class="fas fa-tools"></i> Как устранить утечку в насосе #12?
                    </button>
                    <button class="suggestion-btn" onclick="askAI('Покажи историю поломок компрессора #3')">
                        <i class="fas fa-history"></i> Покажи историю поломок компрессора #3
                    </button>
                    <button class="suggestion-btn" onclick="askAI('Сгенерируй отчет за месяц')">
                        <i class="fas fa-file-alt"></i> Сгенерируй отчет за месяц
                    </button>
                    <button class="suggestion-btn" onclick="askAI('Какие работы запланированы на эту неделю?')">
                        <i class="fas fa-calendar"></i> Какие работы запланированы на эту неделю?
                    </button>
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chatInput" class="chat-input" placeholder="Задайте вопрос AI-технологу...">
                <button class="chat-send-btn" onclick="sendMessage()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
        ${moduleFootnotes.knowledge}
    `,
    
    safety: `
        <div class="module-header">
            <h2><i class="fas fa-shield-alt"></i> Промышленная безопасность</h2>
            <p>Контроль безопасности и соблюдения правил на производстве</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card success">
                <div class="stat-icon"><i class="fas fa-hard-hat"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Соблюдение СИЗ</div>
                    <div class="stat-value">98%</div>
                    <div class="stat-change positive"><i class="fas fa-check-circle"></i> Отлично</div>
                </div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Нарушения сегодня</div>
                    <div class="stat-value">3</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-down"></i> -50% за день</div>
                </div>
            </div>
            <div class="stat-card info">
                <div class="stat-icon"><i class="fas fa-user-check"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Сотрудников на объекте</div>
                    <div class="stat-value">142</div>
                    <div class="stat-change neutral"><i class="fas fa-users"></i> Смена</div>
                </div>
            </div>
            <div class="stat-card primary">
                <div class="stat-icon"><i class="fas fa-calendar-times"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Дней без травм</div>
                    <div class="stat-value">87</div>
                    <div class="stat-change positive"><i class="fas fa-trophy"></i> Рекорд</div>
                </div>
            </div>
        </div>

        <div class="safety-alerts">
            <h3><i class="fas fa-bell"></i> Последние события</h3>
            <div class="activity-list">
                <div class="activity-item">
                    <div class="activity-icon warning">
                        <i class="fas fa-hard-hat"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Сотрудник без каски в зоне 3</div>
                        <div class="activity-time">5 минут назад</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon success">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Инструктаж по ТБ завершен (смена A)</div>
                        <div class="activity-time">2 часа назад</div>
                    </div>
                </div>
            </div>
        </div>
        ${moduleFootnotes.safety}
    `,
    
    smartgrid: `
        <div class="module-header">
            <h2><i class="fas fa-bolt"></i> Энергоменеджмент</h2>
            <p>Оптимизация энергопотребления и управления ресурсами</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card primary">
                <div class="stat-icon"><i class="fas fa-plug"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Текущее потребление</div>
                    <div class="stat-value">185 МВт</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-down"></i> -8% от пика</div>
                </div>
            </div>
            <div class="stat-card success">
                <div class="stat-icon"><i class="fas fa-leaf"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Экономия за месяц</div>
                    <div class="stat-value">23%</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +5% к цели</div>
                </div>
            </div>
            <div class="stat-card info">
                <div class="stat-icon"><i class="fas fa-dollar-sign"></i></div>
                <div class="stat-content">
                    <div class="stat-label">Сэкономлено</div>
                    <div class="stat-value">$42,800</div>
                    <div class="stat-change positive"><i class="fas fa-chart-line"></i> За месяц</div>
                </div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon"><i class="fas fa-seedling"></i></div>
                <div class="stat-content">
                    <div class="stat-label">CO2 (тонн/мес)</div>
                    <div class="stat-value">342</div>
                    <div class="stat-change positive"><i class="fas fa-arrow-down"></i> -18%</div>
                </div>
            </div>
        </div>

        <div class="energy-recommendations">
            <h3><i class="fas fa-lightbulb"></i> Рекомендации по оптимизации</h3>
            <div class="recommendation-list">
                <div class="recommendation-card">
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <h4>Оборудование работает вхолостую</h4>
                        <p>Компрессор #7 работает без нагрузки уже 3 часа. Потенциальная экономия: $120/день</p>
                    </div>
                    <button class="btn-primary">Применить</button>
                </div>
                <div class="recommendation-card">
                    <i class="fas fa-chart-line"></i>
                    <div>
                        <h4>Оптимизация пиковой нагрузки</h4>
                        <p>Перенос запуска линии 4 на 2 часа позже снизит пиковую нагрузку на 15%</p>
                    </div>
                    <button class="btn-primary">Применить</button>
                </div>
            </div>
        </div>
        ${moduleFootnotes.smartgrid}
    `,
    
    marketplace: `
        <div class="module-header">
            <h2><i class="fas fa-store"></i> Marketplace решений</h2>
            <p>Каталог готовых модулей и решений для вашего предприятия</p>
        </div>

        <div class="marketplace-categories">
            <button class="category-btn active">Все</button>
            <button class="category-btn">Аналитика</button>
            <button class="category-btn">Безопасность</button>
            <button class="category-btn">Качество</button>
            <button class="category-btn">Оптимизация</button>
        </div>

        <div class="marketplace-grid">
            <div class="marketplace-card">
                <div class="card-badge">Популярное</div>
                <div class="card-icon"><i class="fas fa-robot"></i></div>
                <h3>AI Defect Detector Pro</h3>
                <p>Расширенная детекция дефектов с точностью 99.2%</p>
                <div class="card-price">$299/мес</div>
                <div class="card-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span>4.8 (124)</span>
                </div>
                <button class="btn-primary" onclick="showToast('success', 'Модуль', 'Модуль добавлен в корзину')">
                    <i class="fas fa-shopping-cart"></i> Купить
                </button>
            </div>
            <div class="marketplace-card">
                <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
                <h3>Safety Monitor Plus</h3>
                <p>Расширенный контроль безопасности труда</p>
                <div class="card-price">$199/мес</div>
                <div class="card-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <span>4.2 (89)</span>
                </div>
                <button class="btn-primary" onclick="showToast('success', 'Модуль', 'Модуль добавлен в корзину')">
                    <i class="fas fa-shopping-cart"></i> Купить
                </button>
            </div>
            <div class="marketplace-card">
                <div class="card-badge">Новое</div>
                <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                <h3>Predictive Analytics AI</h3>
                <p>Прогнозирование поломок оборудования</p>
                <div class="card-price">$399/мес</div>
                <div class="card-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>5.0 (42)</span>
                </div>
                <button class="btn-primary" onclick="showToast('success', 'Модуль', 'Модуль добавлен в корзину')">
                    <i class="fas fa-shopping-cart"></i> Купить
                </button>
            </div>
        </div>
        ${moduleFootnotes.marketplace}
    `,
    
    settings: `
        <div class="module-header">
            <h2><i class="fas fa-cog"></i> Настройки</h2>
            <p>Управление настройками платформы и предприятия</p>
        </div>

        <div class="settings-grid">
            <div class="settings-card">
                <h3><i class="fas fa-building"></i> Информация о предприятии</h3>
                <div class="form-group">
                    <label>Название предприятия</label>
                    <input type="text" value="ТОО 'Промышленник'" class="form-input">
                </div>
                <div class="form-group">
                    <label>Адрес</label>
                    <input type="text" value="г. Астана, ул. Промышленная, 1" class="form-input">
                </div>
                <div class="form-group">
                    <label>Отрасль</label>
                    <select class="form-input">
                        <option>Металлургия</option>
                        <option>Химическая промышленность</option>
                        <option>Пищевая промышленность</option>
                    </select>
                </div>
                <button class="btn-primary" onclick="showToast('success', 'Сохранено', 'Настройки успешно сохранены')">
                    Сохранить
                </button>
            </div>

            <div class="settings-card">
                <h3><i class="fas fa-bell"></i> Уведомления</h3>
                <div class="toggle-group">
                    <div class="toggle-item">
                        <span>Email уведомления</span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="toggle-item">
                        <span>Push уведомления</span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="toggle-item">
                        <span>Критические алерты</span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-card">
                <h3><i class="fas fa-users"></i> Пользователи</h3>
                <p>Управление доступом пользователей к платформе</p>
                <button class="btn-secondary" onclick="showToast('info', 'Пользователи', 'Открытие управления пользователями...')">
                    <i class="fas fa-user-plus"></i> Добавить пользователя
                </button>
            </div>
        </div>
        ${moduleFootnotes.settings}
    `
};

// Load module content
function loadModuleContent(moduleName, moduleElement) {
    if (moduleTemplates[moduleName]) {
        moduleElement.innerHTML = moduleTemplates[moduleName];
        
        // Initialize module-specific functionality
        initializeModuleFeatures(moduleName);
    } else {
        moduleElement.innerHTML = `
            <div class="module-header">
                <h2><i class="fas fa-construction"></i> Модуль в разработке</h2>
                <p>Этот модуль находится в разработке и скоро будет доступен</p>
            </div>
        `;
    }
}

// Initialize module-specific features
function initializeModuleFeatures(moduleName) {
    switch(moduleName) {
        case 'knowledge':
            initializeAIChat();
            break;
        case 'eco':
            // Initialize eco monitoring features
            break;
        // Add more module-specific initializations
    }
}

// AI Chat functionality
function initializeAIChat() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">Только что</span>
        </div>
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    chatMessages.appendChild(userMessage);
    
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        botMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Я обработал ваш запрос. Вот что я нашел по вопросу "${message}"...</p>
                <span class="message-time">Только что</span>
            </div>
        `;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function askAI(question) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        sendMessage();
    }
}

// Make functions globally available
window.loadModuleContent = loadModuleContent;
window.sendMessage = sendMessage;
window.askAI = askAI;

