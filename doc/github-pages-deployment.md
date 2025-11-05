# GitHub Pages 部署指南

## 📋 概述

本项目支持通过 GitHub Pages 进行在线部署，让您可以快速将应用发布到互联网上供用户访问。本指南将详细介绍如何配置和部署项目到 GitHub Pages。

## 🎯 部署方式

项目支持两种部署方式：

### 方式一：自动部署（推荐）
通过 GitHub Actions 自动构建和部署，代码推送到 main 分支后自动发布。

### 方式二：手动部署
使用 npm 脚本手动构建和部署到 GitHub Pages。

## 🚀 方式一：自动部署配置

### 1. GitHub Actions 工作流配置

项目已经配置了 GitHub Actions 工作流文件：`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy to GitHub Pages
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          force_orphan: true
```

### 2. 启用 GitHub Pages

在 GitHub 仓库中启用 GitHub Pages：

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages** 选项
3. 在 **Source** 部分选择 `gh-pages` 分支
4. 点击 **Save** 保存设置

### 3. 工作流程说明

当您推送代码到 main 分支时：

1. GitHub Actions 自动触发工作流
2. 安装 Node.js 和项目依赖
3. 执行 `npm run build` 构建项目
4. 将构建产物（`dist/` 目录）部署到 `gh-pages` 分支
5. GitHub Pages 自动从 `gh-pages` 分支发布网站

### 4. 查看部署状态

- 在仓库的 **Actions** 标签页查看工作流执行状态
- 部署成功后，访问 `https://<username>.github.io/<repository>/` 查看网站

## 🔧 方式二：手动部署

### 1. 前置要求

确保已安装以下工具：
- Node.js (v18 或更高版本)
- npm (v9 或更高版本)
- Git

### 2. 安装依赖

```bash
npm install
```

### 3. 执行部署命令

```bash
npm run deploy
```

这个命令会：
1. 执行 `npm run build` 构建项目
2. 使用 `gh-pages` 工具将 `dist/` 目录发布到 `gh-pages` 分支

### 4. 首次部署配置

如果是首次部署，需要确保：

1. 已在 GitHub 上创建仓库
2. 本地仓库已关联远程仓库
3. 有推送权限

### 5. 验证部署

部署完成后：
1. 前往 GitHub 仓库的 **Settings > Pages**
2. 确认 Source 设置为 `gh-pages` 分支
3. 访问显示的 URL 查看网站

## ⚙️ 项目配置说明

### Vite 配置

`vite.config.js` 中的关键配置：

```javascript
export default defineConfig({
  base: './',  // 使用相对路径，适配 GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: true,
    sourcemap: false
  }
})
```

**重要说明**：
- `base: './'` 确保资源使用相对路径，适配 GitHub Pages 的子路径部署
- 如果仓库名为 `<username>.github.io`，可以使用 `base: '/'`
- 如果仓库名为其他名称，建议保持 `base: './'`

### package.json 配置

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

### 静态资源配置

项目在 `public/` 目录中包含 `.nojekyll` 文件，用于禁用 GitHub Pages 的 Jekyll 处理：

```
public/
├── favicon.svg
└── .nojekyll  # 告诉 GitHub Pages 不要使用 Jekyll 处理
```

**说明**：`.nojekyll` 文件确保 GitHub Pages 不会尝试用 Jekyll 处理网站，这对于 Vite 构建的单页应用很重要。

## 🔍 常见问题

### 1. 部署后页面显示 404

**原因**：GitHub Pages 的 Source 分支设置不正确

**解决方案**：
- 确保在 Settings > Pages 中选择了 `gh-pages` 分支
- 等待几分钟让 GitHub Pages 完成部署

### 2. 资源文件加载失败（404）

**原因**：资源路径配置不正确

**解决方案**：
- 检查 `vite.config.js` 中的 `base` 配置
- 使用 `base: './'` 适配子路径部署
- 重新构建和部署

### 3. GitHub Actions 工作流失败

**原因**：依赖安装或构建失败

**解决方案**：
- 查看 Actions 标签页的错误日志
- 确保 `package.json` 中的依赖版本正确
- 本地执行 `npm ci && npm run build` 测试

### 4. 手动部署权限错误

**原因**：没有推送权限或认证失败

**解决方案**：
- 确保已登录 GitHub 账号
- 检查 SSH 密钥或 Personal Access Token 配置
- 使用 `git remote -v` 确认远程仓库地址

### 5. 部署后样式丢失

**原因**：Tailwind CSS 构建配置问题

**解决方案**：
- 确保 `tailwind.config.js` 配置正确
- 确保 `postcss.config.js` 包含了必要的插件
- 本地运行 `npm run build && npm run preview` 验证

## 📊 部署检查清单

在部署前，请确认：

- [ ] 所有代码已提交到 Git 仓库
- [ ] `package.json` 中的依赖版本正确
- [ ] `vite.config.js` 的 `base` 配置适合部署环境
- [ ] 本地构建成功（`npm run build`）
- [ ] 本地预览正常（`npm run preview`）
- [ ] GitHub Pages 已启用并配置正确
- [ ] GitHub Actions 工作流文件存在且配置正确

## 🎉 部署成功

部署成功后，您的应用将可以通过以下 URL 访问：

```
https://<username>.github.io/<repository>/
```

或者，如果使用自定义域名：

```
https://<your-custom-domain>/
```

## 📚 更多资源

- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Vite 部署文档](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages 工具文档](https://github.com/tschaub/gh-pages)

## 🔄 持续集成建议

为了获得更好的开发体验：

1. **使用自动部署**：每次推送到 main 分支自动部署
2. **设置分支保护**：要求 PR 通过构建测试才能合并
3. **添加状态徽章**：在 README.md 中展示部署状态
4. **配置通知**：在 GitHub Actions 失败时发送通知

---

**提示**：首次部署可能需要等待几分钟才能访问网站，这是正常现象。GitHub Pages 需要时间来构建和发布内容。
