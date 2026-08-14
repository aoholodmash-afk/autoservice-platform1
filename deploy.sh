#!/bin/bash
# ============================================
# AutoService Platform — VPS Setup Script
# Сервер: 80.78.241.124 (v3x3.ru)
# ============================================

set -e

echo "🚀 Настройка AutoService Platform на VPS..."

# 1. Обновление системы
echo "📦 Обновление системы..."
apt update && apt upgrade -y

# 2. Установка Node.js 20
echo "📦 Установка Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 3. Установка nginx
echo "📦 Установка nginx..."
apt install -y nginx

# 4. Создание директорий
echo "📁 Создание директорий..."
mkdir -p /opt/autoservice
mkdir -p /opt/pocketbase
mkdir -p /var/log/pocketbase

# 5. Скачивание PocketBase
echo "📦 Скачивание PocketBase..."
cd /opt/pocketbase
wget -q https://github.com/pocketbase/pocketbase/releases/download/v0.22.0/pocketbase_0.22.0_linux_amd64.zip
unzip -o pocketbase_0.22.0_linux_amd64.zip
chmod +x pocketbase
rm pocketbase_0.22.0_linux_amd64.zip

# 6. Создание systemd сервиса для PocketBase
echo "⚙️ Создание сервиса PocketBase..."
cat > /etc/systemd/system/pocketbase.service << 'EOF'
[Unit]
Description=PocketBase
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/pocketbase
ExecStart=/opt/pocketbase/pocketbase serve --http=0.0.0.0:8090 --dir=/opt/pocketbase/pb_data
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable pocketbase
systemctl start pocketbase

# 7. Клонирование проекта
echo "📦 Клонирование проекта..."
cd /opt/autoservice
if [ -d ".git" ]; then
    git pull
else
    git clone https://github.com/aoholodmash-afk/autoservice-platform1.git .
fi

# 8. Установка зависимостей
echo "📦 Установка зависимостей..."
cd /opt/autoservice
npm install

# 9. Создание .env
echo "⚙️ Создание .env..."
cat > .env.local << 'EOF'
NEXT_PUBLIC_PB_URL=https://api.v3x3.ru
EOF

# 10. Сборка Next.js
echo "🔨 Сборка Next.js..."
npm run build

# 11. Создание systemd сервиса для Next.js
echo "⚙️ Создание сервиса Next.js..."
cat > /etc/systemd/system/autoservice.service << 'EOF'
[Unit]
Description=AutoService Next.js
After=network.target pocketbase.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/autoservice
ExecStart=/usr/bin/npm start -- -p 3000
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable autoservice
systemctl start autoservice

# 11. nginx конфигурация
echo "⚙️ Настройка nginx..."
cat > /etc/nginx/sites-available/v3x3.ru << 'EOF'
# PocketBase API
server {
    listen 80;
    server_name api.v3x3.ru;

    location / {
        proxy_pass http://localhost:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Next.js App
server {
    listen 80;
    server_name v3x3.ru www.v3x3.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/v3x3.ru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 12. Настройка SSL (Let's Encrypt)
echo "🔒 Настройка SSL..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d v3x3.ru -d www.v3x3.ru -d api.v3x3.ru --non-interactive --agree-tos --email ai3ayp@yanex.ru

echo ""
echo "✅ Установка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Откройте https://api.v3x3.ru/_/ для настройки PocketBase"
echo "2. Создайте Super Admin через https://v3x3.ru/super/register"
echo "3. DNS записи должны быть:"
echo "   v3x3.ru      → 80.78.241.124"
echo "   api.v3x3.ru  → 80.78.241.124"
echo ""
