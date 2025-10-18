# Скрипт для настройки автоматической синхронизации с GitHub
# Запустите этот скрипт один раз для настройки планировщика

$ScriptPath = "C:\Users\ovsin\CascadeProjects\windsurf-project-4\sync-github.ps1"
$TaskName = "GitHub Sync"

# Проверяем, существует ли задача
$existingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "🗑️ Удаляем существующую задачу..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

# Создаем новую задачу
Write-Host "⚙️ Создаем планировщик заданий..." -ForegroundColor Green

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File `"$ScriptPath`""
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration (New-TimeSpan -Days 365)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings -Description "Автоматическая синхронизация проекта с GitHub репозиторием каждые 5 минут"

Write-Host "✅ Планировщик настроен!" -ForegroundColor Green
Write-Host "🔄 Синхронизация будет запускаться каждые 5 минут" -ForegroundColor Blue
Write-Host "📋 Чтобы изменить интервал, откройте 'Планировщик заданий' > '$TaskName'" -ForegroundColor Gray
