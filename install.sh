#!/bin/bash

# Yield Showcase App 安装脚本
# 作者: Hermes Agent

set -e

echo "🎉 欢迎使用 Yield Showcase App 安装脚本！"
echo "=========================================="

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装。请先安装 Node.js 18+"
    echo "参考: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本过低。需要 18+，当前版本: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi
echo "✅ npm $(npm -v)"

# 检查Rust（Tauri需要）
if ! command -v rustc &> /dev/null; then
    echo "⚠️  Rust 未安装。Tauri需要Rust环境。"
    read -p "是否安装Rust？(y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "正在安装Rust..."
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
        source $HOME/.cargo/env
        echo "✅ Rust 安装完成: $(rustc --version)"
    else
        echo "跳过Rust安装，但Tauri开发需要Rust。"
    fi
else
    echo "✅ Rust $(rustc --version)"
fi

# 安装项目依赖
echo ""
echo "📦 安装项目依赖..."
npm install

# 安装Tauri CLI
echo ""
echo "🔧 安装 Tauri CLI..."
npm install @tauri-apps/cli

echo ""
echo "=========================================="
echo "🎊 安装完成！"
echo ""
echo "下一步："
echo "1. 启动开发服务器: npm run dev"
echo "2. 启动Tauri应用: npm run tauri dev"
echo ""
echo "📱 构建Android APK:"
echo "   - 需要Android开发环境"
echo "   - 或使用GitHub Actions自动构建"
echo ""
echo "📚 更多信息请查看 README.md"
echo "=========================================="