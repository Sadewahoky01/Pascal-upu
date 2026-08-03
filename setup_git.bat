@echo off
chcp 65001 > nul
title MAPALA PASCAL - Setup Git & GitHub
color 0B

echo ============================================
echo   SETUP GIT - MAPALA PASCAL UPU
echo   Repo: github.com/Sadewahoky01/Pascal-upu
echo ============================================
echo.

REM -- Pindah ke folder project (folder yang sama dengan file ini)
cd /d "%~dp0"

echo [1/6] Inisialisasi git repository...
git init

echo [2/6] Setting identitas git...
git config user.name "Sadewahoky01"
git config user.email "anandapratama0011@gmail.com"

echo [3/6] Menghubungkan ke GitHub...
git remote remove origin > nul 2>&1
git remote add origin https://github.com/Sadewahoky01/Pascal-upu.git

echo [4/6] Menambahkan semua file...
git add .

echo [5/6] Membuat commit pertama...
git commit -m "Initial commit - MAPALA PASCAL UPU Website"

echo [6/6] Push ke GitHub (branch main)...
git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    color 0A
    echo ============================================
    echo   SUKSES! Project sudah ada di GitHub!
    echo   https://github.com/Sadewahoky01/Pascal-upu
    echo   Selanjutnya cukup klik: push.bat
    echo ============================================
) else (
    color 0C
    echo ============================================
    echo   Ada masalah saat push.
    echo   Coba: login GitHub di browser dulu, lalu
    echo   jalankan ulang setup_git.bat ini.
    echo ============================================
)

echo.
pause
