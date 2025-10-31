@echo off
echo ========================================
echo GitBoxd Installation Verification
echo ========================================
echo.

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] Node.js not found
    echo Please install from https://nodejs.org/
    goto :error
)
node --version
echo [OK] Node.js installed
echo.

echo [2/5] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] npm not found
    goto :error
)
npm --version
echo [OK] npm installed
echo.

echo [3/5] Checking dependencies...
if not exist "node_modules\" (
    echo [WARN] Dependencies not installed
    echo Run: npm install
    goto :warn
)
echo [OK] Dependencies installed
echo.

echo [4/5] Checking source files...
if not exist "src\app\page.tsx" (
    echo [FAIL] Source files missing
    goto :error
)
if not exist "src\lib\parser.ts" (
    echo [FAIL] Parser missing
    goto :error
)
if not exist "src\components\Heatmap.tsx" (
    echo [FAIL] Components missing
    goto :error
)
echo [OK] All source files present
echo.

echo [5/5] Checking configuration...
if not exist "package.json" (
    echo [FAIL] package.json missing
    goto :error
)
if not exist "tsconfig.json" (
    echo [FAIL] tsconfig.json missing
    goto :error
)
if not exist "tailwind.config.js" (
    echo [FAIL] tailwind.config.js missing
    goto :error
)
echo [OK] Configuration files present
echo.

echo ========================================
echo Verification Complete - All Checks Passed!
echo ========================================
echo.
echo Ready to run GitBoxd:
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo ========================================
pause
exit /b 0

:warn
echo.
echo ========================================
echo Verification Complete - With Warnings
echo ========================================
echo.
echo Next step: npm install
echo ========================================
pause
exit /b 0

:error
echo.
echo ========================================
echo Verification Failed
echo ========================================
echo.
echo Please check the errors above
echo See GETTING_STARTED.md for help
echo ========================================
pause
exit /b 1
