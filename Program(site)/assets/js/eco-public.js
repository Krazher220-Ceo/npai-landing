/**
 * Публичный модуль Eco (бесплатный доступ)
 */

// Симуляция данных (в реальности будут приходить с сервера)
function generateEcoData() {
    return {
        aqi: Math.floor(Math.random() * 100) + 50, // 50-150
        co2: Math.floor(Math.random() * 100) + 400, // 400-500 ppm
        temp: (Math.random() * 20 + 15).toFixed(1), // 15-35°C
        pm25: Math.floor(Math.random() * 30) + 10, // 10-40 µg/m³
        pm10: Math.floor(Math.random() * 50) + 20, // 20-70 µg/m³
        humidity: Math.floor(Math.random() * 40) + 40 // 40-80%
    };
}

function getAQIStatus(aqi) {
    if (aqi <= 50) return { text: 'Хорошо', color: '#10b981' };
    if (aqi <= 100) return { text: 'Удовлетворительно', color: '#f59e0b' };
    if (aqi <= 150) return { text: 'Нездорово для чувствительных', color: '#f97316' };
    if (aqi <= 200) return { text: 'Нездорово', color: '#ef4444' };
    if (aqi <= 300) return { text: 'Очень нездорово', color: '#dc2626' };
    return { text: 'Опасно', color: '#991b1b' };
}

function updateEcoDashboard() {
    const data = generateEcoData();
    const aqiStatus = getAQIStatus(data.aqi);
    
    // Обновляем значения
    const aqiEl = document.getElementById('eco-aqi');
    const aqiStatusEl = document.getElementById('eco-aqi-status');
    const co2El = document.getElementById('eco-co2');
    const tempEl = document.getElementById('eco-temp');
    const pm25El = document.getElementById('eco-pm25');
    const pm10El = document.getElementById('eco-pm10');
    const humidityEl = document.getElementById('eco-humidity');
    
    if (aqiEl) {
        aqiEl.textContent = data.aqi;
        aqiEl.style.color = aqiStatus.color;
    }
    if (aqiStatusEl) {
        aqiStatusEl.textContent = aqiStatus.text;
        aqiStatusEl.style.color = aqiStatus.color;
    }
    if (co2El) co2El.textContent = data.co2;
    if (tempEl) tempEl.textContent = data.temp;
    if (pm25El) pm25El.textContent = data.pm25;
    if (pm10El) pm10El.textContent = data.pm10;
    if (humidityEl) humidityEl.textContent = data.humidity;
}

// Обновляем данные каждые 30 секунд
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        updateEcoDashboard();
        setInterval(updateEcoDashboard, 30000); // Обновление каждые 30 секунд
    });
}


