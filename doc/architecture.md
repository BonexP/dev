# 订阅链接处理工具 - 架构设计

## 📁 项目结构

```
subscription-tool/
├── public/                     # 静态资源目录
│   ├── index.html             # 主页面模板
│   └── favicon.svg            # 应用图标
├── src/                       # 源代码目录
│   ├── components/            # Vue组件
│   │   ├── EncoderForm.vue    # 编码表单组件
│   │   ├── ResultPreview.vue  # 结果预览组件
│   │   └── ConfigPanel.vue    # 配置面板组件
│   ├── composables/           # 组合式函数
│   │   ├── useEncoder.js      # 编码逻辑
│   │   ├── useClipboard.js    # 剪贴板功能
│   │   └── useStorage.js      # 本地存储
│   ├── styles/                # 样式文件
│   │   └── main.css          # 全局样式
│   ├── App.vue               # 主应用组件
│   └── main.js               # 应用入口
├── package.json               # 项目配置
├── vite.config.js            # Vite构建配置
├── tailwind.config.js        # Tailwind配置
└── postcss.config.js         # PostCSS配置
```

## 🏗️ 架构层次

### 1. 表现层 (Presentation Layer)
- **职责**：用户界面展示，交互逻辑处理
- **文件**：
  - `src/components/EncoderForm.vue` - 输入表单处理
  - `src/components/ResultPreview.vue` - 结果预览展示
  - `src/components/ConfigPanel.vue` - 配置选项管理

### 2. 业务逻辑层 (Business Logic Layer)
- **职责**：核心业务逻辑处理，数据转换
- **文件**：
  - `src/composables/useEncoder.js` - 编码/解码算法
  - `src/composables/useClipboard.js` - 剪贴板操作

### 3. 工具层 (Utility Layer)
- **职责**：通用工具函数，基础设施
- **文件**：
  - `src/composables/useStorage.js` - 本地存储管理
  - `src/styles/main.css` - 样式系统

## 🔧 核心功能模块

### 编码处理模块
```javascript
const ENCODERS = {
    base64: {
        encode: (text) => btoa(unescape(encodeURIComponent(text))),
        decode: (encoded) => decodeURIComponent(escape(atob(encoded)))
    },
    'url-encode': {
        encode: (text) => encodeURIComponent(text),
        decode: (encoded) => decodeURIComponent(encoded)
    },
    'json-format': {
        encode: (text) => {
            const parsed = JSON.parse(text);
            return JSON.stringify(parsed, null, 2);
        }
    }
};
```

### 数据流架构
```
用户输入 → 表单验证 → 编码处理 → 结果生成 → 预览展示 → 链接复制
    ↓
本地存储 ← 配置保存 ← 用户偏好 ← 界面设置
```

## 🎯 组件设计说明

### EncoderForm 组件
- **功能**：用户输入处理和编码类型选择
- **关键特性**：
  - v-model双向绑定输入框
  - 实时输入验证
  - 字符数统计
  - 加载状态显示

### ResultPreview 组件
- **功能**：编码结果展示和复制操作
- **关键特性**：
  - 实时结果更新
  - 一键复制功能
  - 错误状态提示
  - 空状态处理

### ConfigPanel 组件
- **功能**：用户配置管理
- **关键特性**：
  - 主题切换（明暗模式）
  - 自动复制开关
  - 配置导入导出
  - 重置功能

## 📱 响应式设计

### 布局策略
- **移动端**：垂直堆叠布局
- **平板端**：双列布局
- **桌面端**：网格布局（左右分栏）

### 关键断点
```css
/* 移动端优先设计 */
@media (min-width: 768px) { /* 平板样式 */ }
@media (min-width: 1024px) { /* 桌面端样式 */ }
```

## 🔄 数据流设计

### 状态管理
```javascript
const appState = {
    input: '',           // 用户输入
    encoderType: 'base64', // 编码类型
    result: '',          // 编码结果
    config: {
        autoCopy: false, // 自动复制
        theme: 'light',   // 主题
        autoSave: true   // 自动保存
    },
    isProcessing: false, // 处理状态
    error: ''           // 错误信息
};
```

### MVVM双向绑定实现
- 使用Vue 3的`v-model`指令
- 组合式函数管理响应式状态
- 计算属性处理自动编码
- 事件驱动更新界面

## 🛠️ 技术特色

### Vue 3 Composition API
```javascript
// 组合式函数示例
export function useEncoder() {
    const isProcessing = ref(false);
    
    const processText = async (input, type) => {
        isProcessing.value = true;
        try {
            return await ENCODERS[type].encode(input);
        } finally {
            isProcessing.value = false;
        }
    };
    
    return { isProcessing, processText };
}
```

### 样式系统
- Tailwind CSS原子化样式
- CSS自定义属性支持主题
- 暗色模式适配
- 响应式设计

## 📊 性能优化

### 构建优化
- 代码分割（vendor vs 业务代码）
- Tree Shaking去除未使用代码
- CSS/JS文件压缩
- 图片资源优化

### 运行时优化
- 防抖处理用户输入
- 懒加载非关键组件
- 本地缓存用户配置
- 异步编码处理

## 🚀 部署架构

### 静态托管
- **构建产物**：`dist/`目录
- **部署目标**：GitHub Pages、Vercel等
- **构建命令**：`npm run build`
- **预览命令**：`npm run preview`

---

**技术栈**：Vue 3 + Vite + Tailwind CSS + 原生Web API