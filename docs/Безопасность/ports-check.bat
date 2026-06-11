@echo off
echo Checking port 3000...
netstat -ano | findstr :3000
pause