@echo off
echo ================================================
echo  NGB Interiors Next.js - Quick Start
echo ================================================
echo.

REM Check if we're in the correct directory
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the next-app directory
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [1/2] Installing dependencies...
    echo This will take about 30 seconds...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo ✓ Dependencies installed successfully!
    echo.
) else (
    echo ✓ Dependencies already installed
    echo.
)

echo [2/2] Starting development server...
echo.
echo Your site will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

REM Start the development server
call npm run dev
