#!/bin/bash

# Скрипт для запуска локального сервера NPAI

echo "🚀 Запуск NPAI Project..."
echo ""

# Проверка Python
if command -v python3 &> /dev/null; then
    echo "✅ Python3 найден"
    PORT=8000
    echo "📡 Запуск сервера на http://localhost:$PORT"
    echo ""
    echo "Откройте в браузере:"
    echo "  🌐 Главная страница: http://localhost:$PORT/index.html"
    echo "  🔐 Авторизация: http://localhost:$PORT/auth/login.html"
    echo "  📊 Офлайн дашборд: http://localhost:$PORT/dashboard-offline.html"
    echo "  🌐 Онлайн дашборд: http://localhost:$PORT/dashboard-online.html"
    echo "  🛒 Marketplace: http://localhost:$PORT/module/marketplace/index.html"
    echo ""
    echo "Нажмите Ctrl+C для остановки сервера"
    echo ""
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "✅ Python найден"
    PORT=8000
    echo "📡 Запуск сервера на http://localhost:$PORT"
    echo ""
    echo "Откройте в браузере:"
    echo "  🌐 Главная страница: http://localhost:$PORT/index.html"
    echo "  🔐 Авторизация: http://localhost:$PORT/auth/login.html"
    echo "  📊 Офлайн дашборд: http://localhost:$PORT/dashboard-offline.html"
    echo "  🌐 Онлайн дашборд: http://localhost:$PORT/dashboard-online.html"
    echo "  🛒 Marketplace: http://localhost:$PORT/module/marketplace/index.html"
    echo ""
    echo "Нажмите Ctrl+C для остановки сервера"
    echo ""
    python -m http.server $PORT
else
    echo "❌ Python не найден!"
    echo ""
    echo "Установите Python 3 или используйте другой способ:"
    echo "  - Node.js: npx serve -p 8000"
    echo "  - PHP: php -S localhost:8000"
    exit 1
fi


