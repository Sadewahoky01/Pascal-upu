@echo off
chcp 65001 > nul
title MAPALA PASCAL - Auto Push ke GitHub
color 0A

echo ============================================
echo   MAPALA PASCAL UPU - Auto Git Push
echo ============================================
echo.

REM -- Pindah ke folder project (folder yang sama dengan file bat ini)
cd /d "%~dp0"

REM -- Cek apakah git sudah di-setup
git remote -v > nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Remote GitHub belum dikonfigurasi!
    echo.
    echo Jalankan dulu: setup_git.bat
    echo.
    pause
    exit /b 1
)

REM -- Tampilkan status file yang berubah
echo [INFO] File yang berubah:
git status --short
echo.

REM -- Input pesan commit
set /p PESAN="Masukkan pesan commit (tekan Enter untuk default): "
if "%PESAN%"=="" set PESAN=Update %DATE% %TIME%

REM -- Proses Add, Commit, Push
echo.
echo [1/3] Menambahkan semua file...
git add .

echo [2/3] Membuat commit: "%PESAN%"
git commit -m "%PESAN%"

echo [3/3] Pushing ke GitHub...
git push origin main

echo.
if %errorlevel% equ 0 (
    color 0A
    echo ============================================
    echo   SUKSES! Project sudah di-push ke GitHub!
    echo ============================================
) else (
    color 0C
    echo ============================================
    echo   GAGAL! Cek koneksi internet atau login GitHub
    echo ============================================
)

echo.
pause
