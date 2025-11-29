@echo off
REM OpenID Connect Authentication - Startup Script for Windows
REM This script installs dependencies and starts the development server

echo ==================================
echo OpenID Connect Authentication App
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo [OK] npm is installed
npm --version
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo [WARNING] .env.local file not found!
    echo.
    echo Please create .env.local file with your Firebase credentials:
    echo   copy .env.local.example .env.local
    echo   REM Then edit .env.local with your Firebase config
    echo.
    set /p continue="Do you want to continue anyway? (y/n): "
    if /i not "%continue%"=="y" exit /b 1
)

REM Check if node_modules exists
if not exist node_modules (
    echo [INSTALL] Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo X Failed to install dependencies!
        echo Please check the error messages above.
        pause
        exit /b 1
    )
    
    echo.
    echo [OK] Dependencies installed successfully!
) else (
    echo [OK] Dependencies already installed
)

echo.
echo ==================================
echo Starting development server...
echo ==================================
echo.
echo The application will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
call npm run dev
