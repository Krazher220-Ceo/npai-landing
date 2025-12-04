// ===========================
// NPAI Dashboard - Charts and Data
// ===========================

let productionChart = null;
let energyChart = null;

// Initialize charts when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        initializeCharts();
        startDataRefresh();
    }, 500);
});

// ===========================
// Production Chart
// ===========================

function initializeCharts() {
    initProductionChart();
    initEnergyChart();
}

function initProductionChart() {
    const ctx = document.getElementById('productionChart');
    if (!ctx) return;
    
    productionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [
                {
                    label: 'Производительность (%)',
                    data: [85, 88, 92, 87, 90, 93, 89],
                    borderColor: '#2d7fc4',
                    backgroundColor: 'rgba(45, 127, 196, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Качество (%)',
                    data: [92, 90, 94, 91, 93, 95, 92],
                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'OEE (%)',
                    data: [78, 79, 86, 80, 84, 88, 82],
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// ===========================
// Energy Chart
// ===========================

function initEnergyChart() {
    const ctx = document.getElementById('energyChart');
    if (!ctx) return;
    
    energyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            datasets: [
                {
                    label: 'Потребление (МВт)',
                    data: [120, 90, 180, 200, 195, 170, 140],
                    backgroundColor: [
                        'rgba(45, 127, 196, 0.8)',
                        'rgba(45, 127, 196, 0.6)',
                        'rgba(217, 119, 6, 0.8)',
                        'rgba(220, 38, 38, 0.8)',
                        'rgba(217, 119, 6, 0.8)',
                        'rgba(45, 127, 196, 0.8)',
                        'rgba(45, 127, 196, 0.6)'
                    ],
                    borderColor: [
                        '#2d7fc4',
                        '#2d7fc4',
                        '#d97706',
                        '#dc2626',
                        '#d97706',
                        '#2d7fc4',
                        '#2d7fc4'
                    ],
                    borderWidth: 2,
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Потребление: ' + context.parsed.y + ' МВт';
                        },
                        afterLabel: function(context) {
                            const avg = 165;
                            const diff = context.parsed.y - avg;
                            const percent = ((diff / avg) * 100).toFixed(1);
                            if (diff > 0) {
                                return `+${percent}% от среднего`;
                            } else if (diff < 0) {
                                return `${percent}% от среднего`;
                            }
                            return 'Средний уровень';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' МВт';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ===========================
// Data Refresh
// ===========================

function startDataRefresh() {
    // Refresh data every 30 seconds
    setInterval(() => {
        if (NPAI.currentModule === 'dashboard') {
            updateDashboardData();
        }
    }, 30000);
}

function updateDashboardData() {
    // Simulate real-time data updates
    if (productionChart) {
        const lastDataPoint = productionChart.data.datasets[0].data[6];
        const newDataPoint = Math.max(75, Math.min(95, lastDataPoint + (Math.random() - 0.5) * 5));
        
        productionChart.data.datasets.forEach(dataset => {
            dataset.data.shift();
            dataset.data.push(Math.max(70, Math.min(100, dataset.data[5] + (Math.random() - 0.5) * 5)));
        });
        
        productionChart.update('none');
    }
    
    // Update stats
    updateStats();
}

function updateStats() {
    // Simulate stat updates
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const currentValue = stat.textContent;
        if (currentValue.includes('%')) {
            const numValue = parseInt(currentValue);
            const change = Math.floor(Math.random() * 3) - 1;
            const newValue = Math.max(0, Math.min(100, numValue + change));
            stat.textContent = newValue + '%';
        }
    });
}

// ===========================
// Period Change
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const periodSelectors = document.querySelectorAll('.chart-period');
    
    periodSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            showToast('info', 'Обновление данных', 'Загружаем данные за выбранный период...');
            
            setTimeout(() => {
                // Re-initialize charts with new data
                if (this.closest('.chart-card').querySelector('#productionChart')) {
                    updateChartData(productionChart, this.value);
                } else if (this.closest('.chart-card').querySelector('#energyChart')) {
                    updateChartData(energyChart, this.value);
                }
                
                showToast('success', 'Данные обновлены', 'Графики успешно обновлены');
            }, 1000);
        });
    });
});

function updateChartData(chart, period) {
    if (!chart) return;
    
    // Generate new random data based on period
    const dataLength = chart.data.labels.length;
    
    chart.data.datasets.forEach(dataset => {
        dataset.data = generateRandomData(dataLength, 70, 95);
    });
    
    chart.update();
}

// ===========================
// Export Functions
// ===========================

window.productionChart = productionChart;
window.energyChart = energyChart;
window.updateDashboardData = updateDashboardData;







