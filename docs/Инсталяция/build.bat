@echo off
echo Building project...
cd /d %~dp0
call npm run build
echo Done!
pause