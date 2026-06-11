@echo off
echo Running quality checks...
call npm run build
call npm run lint
echo Quality check passed!
pause