# Деплой проекта

## Сервер
- IP: 91.135.157.42
- ОС: Ubuntu 24.04
- Веб-сервер: Nginx
- Процесс: PM2

## Команды деплоя
```bash
cd /var/www/my-portfolio
git pull
npm install
npm run build
pm2 restart portfolio