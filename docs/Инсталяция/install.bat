@echo off
echo Installing dependencies...
cd /d %~dp0
call npm install
echo Done!
pause