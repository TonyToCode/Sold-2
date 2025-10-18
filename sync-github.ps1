# PowerShell скрипт для синхронизации с GitHub репозиторием
# Запускать каждые 5 минут через Планировщик заданий Windows

param(
    [string]$RepoPath = "c:/Users/ovsin/CascadeProjects/windsurf-project-4",
    [string]$RepoUrl = "https://github.com/TonyToCode/Sold.git"
)

Write-Host "🔄 Синхронизация с GitHub репозиторием..." -ForegroundColor Green

try {
    # Переходим в папку проекта
    Set-Location $RepoPath

    # Проверяем, существует ли .git папка
    if (!(Test-Path ".git")) {
        Write-Host "📥 Инициализация git репозитория..." -ForegroundColor Yellow
        git init
        git remote add origin $RepoUrl
    }

    # Получаем изменения с GitHub
    Write-Host "⬇️ Получение обновлений с GitHub..." -ForegroundColor Blue
    git fetch origin main

    # Сбрасываем локальные изменения к состоянию на GitHub
    Write-Host "🔄 Сброс к состоянию GitHub..." -ForegroundColor Blue
    git reset --hard origin/main

    Write-Host "✅ Синхронизация завершена!" -ForegroundColor Green
    Write-Host "📅 $(Get-Date)" -ForegroundColor Gray

} catch {
    Write-Host "❌ Ошибка синхронизации: $($_.Exception.Message)" -ForegroundColor Red
}
