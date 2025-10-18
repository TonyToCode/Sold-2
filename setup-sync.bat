@echo off
echo Настройка автоматической синхронизации с GitHub...
powershell -ExecutionPolicy Bypass -File "%~dp0setup-sync.ps1"
echo.
echo Готово! Теперь файлы будут синхронизироваться каждые 5 минут.
echo.
pause
