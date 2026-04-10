@echo off
setlocal

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

if defined CATALINA_HOME (
    set "TOMCAT_HOME=%CATALINA_HOME%"
) else (
    set "TOMCAT_HOME=D:\tools\apache-tomcat-9.0.117"
)

set "WAR_PATH=%PROJECT_DIR%target\ROOT.war"
set "DEPLOY_WAR=%TOMCAT_HOME%\webapps\ROOT.war"
set "DEPLOY_DIR=%TOMCAT_HOME%\webapps\ROOT"

echo [1/5] Checking environment...
where mvn >nul 2>nul
if errorlevel 1 (
    echo Maven was not found in PATH.
    exit /b 1
)

if not exist "%TOMCAT_HOME%\bin\startup.bat" (
    echo Tomcat startup script was not found:
    echo %TOMCAT_HOME%\bin\startup.bat
    echo Set CATALINA_HOME or update this script.
    exit /b 1
)

echo [2/5] Building project...
call mvn -DskipTests package
if errorlevel 1 (
    echo Maven build failed.
    exit /b 1
)

if not exist "%WAR_PATH%" (
    echo Build output was not found:
    echo %WAR_PATH%
    exit /b 1
)

echo [3/5] Stopping existing Tomcat...
call "%TOMCAT_HOME%\bin\shutdown.bat" >nul 2>nul
timeout /t 2 /nobreak >nul

echo [4/5] Deploying ROOT.war...
if exist "%DEPLOY_DIR%" (
    rmdir /s /q "%DEPLOY_DIR%"
)
if exist "%DEPLOY_WAR%" (
    del /f /q "%DEPLOY_WAR%"
)

copy /y "%WAR_PATH%" "%DEPLOY_WAR%" >nul
if errorlevel 1 (
    echo Failed to copy ROOT.war to Tomcat.
    exit /b 1
)

echo [5/5] Starting Tomcat...
call "%TOMCAT_HOME%\bin\startup.bat"
if errorlevel 1 (
    echo Tomcat failed to start.
    exit /b 1
)

echo.
echo Project started: http://localhost:8080
start "" "http://localhost:8080"

endlocal
