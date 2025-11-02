#!/bin/bash

# 订阅链接处理工具 - 开发启动脚本

echo "🚀 启动订阅链接处理工具开发环境..."
echo "=================================="

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js 版本: $NODE_VERSION"

# 检查npm版本
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm 版本: $NPM_VERSION"

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ 依赖安装成功"
    else
        echo "❌ 依赖安装失败"
        exit 1
    fi
else
    echo "✅ 依赖已存在"
fi

echo ""
echo "🌟 功能预览:"
echo "  - 实时双向绑定编码处理"
echo "  - Base64、URL、JSON 编码支持"
echo "  - 深色主题和响应式设计"
echo "  - 配置导入导出功能"
echo ""
echo "🎯 启动开发服务器..."
echo "按 Ctrl+C 停止服务器"
echo "=================================="

# 启动开发服务器
npm run dev