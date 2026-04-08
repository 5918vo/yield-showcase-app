# 快速开始指南 🚀

## 项目概述

这是一个基于Tauri开发的Android应用，用于输入和炫耀今日投资收益率。应用界面模仿同花顺App，可以生成包含收益率和时间的炫耀图片。

## 📱 应用功能

1. **输入收益率**: 输入今日收益率百分比
2. **实时显示**: 显示当前时间和收益率
3. **生成图片**: 一键生成炫耀图片（PNG格式）
4. **分享功能**: 保存图片到本地并分享

## 🛠️ 开发环境设置

### 前提条件
- Node.js 18+
- npm 或 yarn
- Rust (Tauri需要)
- Android开发环境（用于构建APK）

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/5918vo/yield-showcase-app.git
cd yield-showcase-app
```

2. **安装依赖**
```bash
npm install
```

3. **安装Tauri CLI**
```bash
npm install @tauri-apps/cli
```

4. **运行开发服务器**
```bash
npm run dev
```

5. **运行Tauri应用**
```bash
npm run tauri dev
```

## 📦 构建APK

### 使用GitHub Actions（推荐）

1. **推送tag触发构建**
```bash
git tag v1.1.0
git push origin v1.1.0
```

2. **查看构建进度**
   - 访问 https://github.com/5918vo/yield-showcase-app/actions
   - 点击最新的工作流运行

3. **下载APK**
   - 构建完成后，访问 https://github.com/5918vo/yield-showcase-app/releases
   - 下载最新版本的APK文件

### 本地构建（需要完整Android环境）

```bash
# 安装Android SDK和NDK
# 参考：https://tauri.app/zh-cn/v1/guides/building/android/

# 构建APK
npm run tauri android build
```

## 🎨 自定义应用

### 修改界面样式
编辑 `src/App.tsx` 文件：
- 修改颜色：在Styled Components中调整颜色值
- 修改布局：调整组件结构和样式
- 添加新功能：扩展React组件

### 修改应用配置
编辑 `src-tauri/tauri.conf.json`：
- 应用名称：`package.productName`
- 版本号：`package.version`
- 包标识符：`tauri.bundle.identifier`

### 添加新依赖
```bash
npm install <package-name>
```

## 🔧 故障排除

### 常见问题

1. **Tauri开发服务器无法启动**
   - 检查Node.js版本（需要18+）
   - 确保所有依赖已安装：`npm ci`
   - 检查Rust安装：`rustc --version`

2. **Android构建失败**
   - 确保Android SDK和NDK已正确安装
   - 检查环境变量：`ANDROID_SDK_ROOT`, `ANDROID_HOME`
   - 查看详细错误日志

3. **图片生成失败**
   - 检查html2canvas版本
   - 确保浏览器支持Canvas API
   - 检查文件写入权限

### 调试技巧

1. **查看Tauri日志**
```bash
npm run tauri dev -- --verbose
```

2. **检查浏览器控制台**
   - 在开发模式下按F12打开开发者工具
   - 查看Console和Network标签页

3. **测试React组件**
```bash
# 可以添加测试文件进行单元测试
```

## 📄 项目结构

```
yield-showcase-app/
├── src/                    # React前端代码
│   ├── App.tsx           # 主应用组件
│   ├── main.tsx          # 入口文件
│   └── index.css         # 全局样式
├── src-tauri/            # Tauri后端代码
│   ├── Cargo.toml       # Rust依赖配置
│   ├── tauri.conf.json  # Tauri应用配置
│   └── src/main.rs      # Rust入口文件
├── .github/workflows/    # GitHub Actions工作流
├── package.json          # Node.js依赖配置
├── vite.config.js       # Vite构建配置
└── README.md            # 项目说明文档
```

## 🤝 贡献指南

1. Fork仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 创建Pull Request

## 📞 支持

- 提交Issue：https://github.com/5918vo/yield-showcase-app/issues
- 查看文档：README.md
- 参考Tauri文档：https://tauri.app/zh-cn/

---

**投资有风险，数据仅供参考**