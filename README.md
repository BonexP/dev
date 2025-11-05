# 订阅链接处理工具 🎯

> 轻量化订阅链接处理工具 - Vue 3 + Vite + Tailwind CSS

一个现代化、功能完整的Web编码处理工具，支持Base64编码、URL编码、JSON格式化等功能，采用MVVM双向绑定设计，提供流畅的用户体验。

## ✨ 核心特性

- 🔄 **实时双向绑定** - 输入框变化时结果自动更新
- 📦 **多种编码格式** - Base64、URL编码、JSON格式化
- 🌙 **暗色主题支持** - 保护眼睛的深色模式
- 💾 **配置持久化** - 本地保存用户偏好设置
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **轻量高效** - 构建后仅45KB，加载速度快

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

### 部署到GitHub Pages
```bash
npm run deploy
```

## 📁 项目结构详解

### 🏗️ 核心目录

```
subscription-tool/
├── src/                          # 源代码目录
│   ├── components/              # Vue组件
│   │   ├── EncoderForm.vue     # 编码表单组件
│   │   │                       └── 功能：用户输入、编码类型选择
│   │   │                       └── 特性：v-model双向绑定、实时验证
│   │   │
│   │   ├── ResultPreview.vue   # 结果预览组件  
│   │   │                       └── 功能：展示编码结果、一键复制
│   │   │                       └── 特性：实时更新、错误处理
│   │   │
│   │   └── ConfigPanel.vue     # 配置面板组件
│   │                           └── 功能：主题切换、配置管理
│   │                           └── 特性：暗色模式、导入导出
│   │
│   ├── composables/            # 组合式函数
│   │   ├── useEncoder.js      # 编码逻辑处理
│   │   │                       └── 实现：Base64、URL、JSON编码算法
│   │   │
│   │   ├── useClipboard.js    # 剪贴板操作
│   │   │                       └── 实现：现代API + 降级方案
│   │   │
│   │   └── useStorage.js      # 本地存储管理
│   │                           └── 实现：配置保存、导入导出
│   │
│   ├── styles/                 # 样式文件
│   │   └── main.css           # 全局样式
│   │                           └── 包含：Tailwind CSS、自定义主题
│   │
│   ├── App.vue                # 主应用组件
│   │                           └── 功能：组件协调、状态管理
│   │
│   └── main.js                # 应用入口文件
│                               └── 功能：Vue应用初始化
│
├── public/                     # 静态资源
│   ├── index.html             # 主模板页面
│   └── favicon.svg            # 应用图标
│
├── package.json               # 项目配置和依赖
├── vite.config.js            # Vite构建配置
├── tailwind.config.js        # Tailwind CSS配置
└── postcss.config.js         # PostCSS配置
```

### 📚 文档目录

```
doc/                           # 项目文档
├── README.md                 # 文档导航
├── architecture.md           # 架构设计文档
└── technology-selection.md   # 技术栈选择说明
```

## 🛠️ 技术栈详解

### 前端框架
- **Vue 3** (Composition API) - 现代化开发框架，完美的MVVM支持
- **Vite** - 极速构建工具，1-2秒开发服务器启动
- **Tailwind CSS** - 原子化CSS，快速样式开发

### 构建工具
- **PostCSS** - CSS后处理器
- **Autoprefixer** - 自动添加浏览器前缀
- **gh-pages** - GitHub Pages部署工具

### 核心功能实现
- **原生Web API** - 剪贴板操作、本地存储
- **ES6+ JavaScript** - 模块化开发、异步处理
- **响应式设计** - 移动端优先设计

## 📋 组件说明

### 🎯 EncoderForm 组件
**文件位置**: `src/components/EncoderForm.vue`

**核心功能**:
- 用户文本输入处理
- 编码类型选择
- 实时输入验证
- 字符数统计显示

**技术实现**:
```vue
<template>
  <textarea v-model="localInput" />           <!-- v-model双向绑定 -->
  <select v-model="localEncoderType">
  <span>{{ characterCount }}</span>            <!-- 实时字符统计 -->
</template>

<script setup>
const localInput = ref(props.input)           <!-- 本地响应式状态 -->
watch(localInput, (newValue) => {             <!-- 同步到父组件 -->
  emit('update:input', newValue)
})
</script>
```

### 📊 ResultPreview 组件
**文件位置**: `src/components/ResultPreview.vue`

**核心功能**:
- 编码结果展示
- 一键复制到剪贴板
- 错误状态提示
- 加载状态显示

**技术实现**:
```vue
<template>
  <pre v-if="result">{{ result }}</pre>          <!-- 结果展示 -->
  <button @click="handleCopy">复制</button>    <!-- 复制功能 -->
  <div v-if="error" class="error">{{ error }}</div> <!-- 错误提示 -->
</template>

<script setup>
const handleCopy = async () => {              <!-- 剪贴板API -->
  await navigator.clipboard.writeText(result)
}
</script>
```

### ⚙️ ConfigPanel 组件
**文件位置**: `src/components/ConfigPanel.vue`

**核心功能**:
- 主题切换（明暗模式）
- 自动复制开关
- 配置导入导出
- 重置功能

**技术实现**:
```vue
<template>
  <input type="checkbox" v-model="isDarkTheme" />    <!-- 主题切换 -->
  <input type="checkbox" v-model="localConfig.autoCopy" /> <!-- 自动复制 -->
</template>

<script setup>
const isDarkTheme = ref(false)
const toggleTheme = () => {                          <!-- 主题切换逻辑 -->
  document.documentElement.classList.toggle('dark', isDarkTheme.value)
}
</script>
```

## 🎮 使用指南

### 基本操作流程
1. **输入文本** - 在文本框中输入要处理的内容
2. **选择编码类型** - 从下拉菜单选择Base64、URL或JSON格式
3. **查看结果** - 编码结果实时显示在右侧预览区
4. **复制结果** - 点击"复制结果"按钮复制到剪贴板
5. **保存配置** - 配置会自动保存到本地存储

### 支持的编码类型
- **Base64 编码/解码** - 文本与Base64格式互转，适用于URL、Cookie等场景
- **URL 编码/解码** - 特殊字符转换为%开头的URL安全格式
- **JSON 格式化** - 美化JSON格式，提高可读性

### 配置选项
- **自动复制结果** - 编码完成后自动复制到剪贴板
- **深色主题** - 切换到深色模式，保护眼睛
- **配置导入导出** - 备份和恢复用户配置

## 📚 详细文档

完整的项目文档已整理到 [doc/](doc/) 目录，包括：

### 📖 核心文档
- **[文档索引](doc/README.md)** - 所有文档的导航和快速入口
- **[架构设计](doc/architecture.md)** - 项目架构、组件划分、数据流设计
- **[技术栈选择](doc/technology-selection.md)** - 技术决策依据和方案对比
- **[用户使用指南](doc/user-guide.md)** - 面向最终用户的使用说明

### 🔧 实现文档
- **[订阅转换器实现](doc/subscription-converter-implementation.md)** - 核心功能实现说明
- **[远程配置增强报告](doc/remote-config-enhancement-report.md)** - 功能增强说明

### 📊 项目报告
- **[项目总结报告](doc/project-summary.md)** - 完整的项目实施总结
- **[功能测试报告](doc/functionality-test-report.md)** - 全面的功能测试结果

## 🚀 部署说明

### GitHub Pages 部署（推荐）

**自动部署**：推送到 main 分支后自动部署
```bash
git push origin main
```

**手动部署**：
```bash
npm run deploy
```

**详细说明**：查看 [GitHub Pages 部署指南](doc/github-pages-deployment.md) 了解完整配置和故障排查。

### 其他部署方式

**Vercel 部署**
1. 连接 GitHub 仓库到 Vercel
2. 自动检测 Vite 项目配置
3. 一键部署完成

**手动部署**
1. 运行 `npm run build` 构建项目
2. 将 `dist/` 目录上传到静态托管服务
3. 配置服务器路由（指向 `index.html`）

## 📊 性能指标

- **构建后大小**: ~45KB (gzipped)
- **首次加载**: < 2秒
- **Lighthouse评分**: 95+ (性能、可访问性、最佳实践、SEO)

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

## 📄 许可证

MIT License

---

**基于 Vue 3 + Vite + Tailwind CSS 构建，为开发者提供简单高效的编码处理工具。**
