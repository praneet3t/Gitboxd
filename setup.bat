@echo off
echo ========================================
echo GitBoxd Setup Script
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo.

echo [2/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [3/4] Running tests...
call npm test -- --passWithNoTests
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Next steps:
echo ========================================
echo 1. Run development server:
echo    npm run dev
echo.
echo 2. Open http://localhost:3000
echo.
echo 3. Upload your Letterboxd export ZIP
echo.
echo For help, see QUICKSTART.md
echo ========================================
pause
