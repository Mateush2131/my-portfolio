@echo off
echo Backing up database...
npx prisma migrate dev --name backup_%date%
echo Done!
pause