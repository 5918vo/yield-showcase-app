# Yield Showcase App 📈

一个基于Tauri开发的Android应用，用于输入和炫耀今日投资收益率，生成美观的分享图片。

## ✨ 功能特性

- 📊 输入今日收益率百分比
- 🎨 模仿同花顺App的优美界面设计
- ⏰ 实时显示当前时间
- 📸 一键生成炫耀图片（包含收益率和时间信息）
- 📤 分享功能（保存图片到本地）
- 📱 支持Android平台
- 🚀 使用GitHub Actions自动构建APK

## 🖼️ 界面预览

应用界面设计灵感来自同花顺，包含：
- 渐变红色标题栏
- 收益率数字大屏显示
- 实时时间戳
- 市场指数对比
- 一键生成图片按钮

## 🛠️ 技术栈

- **前端**: React + TypeScript + Styled Components
- **框架**: Tauri (Rust + WebView)
- **构建工具**: Vite
- **图片生成**: html2canvas
- **时间处理**: date-fns
- **CI/CD**: GitHub Actions

## 📦 安装与运行

### 开发环境

1. 克隆仓库：
```bash
git clone https://github.com/5918vo/yield-showcase-app.git
cd yield-showcase-app
```

2. 安装依赖：
```bash
npm install
```

3. 运行开发服务器：
```bash
npm run dev
```

4. 运行Tauri应用：
```bash
npm run tauri dev
```

### 构建APK

#### 本地构建（需要Android环境）：
```bash
npm run tauri android build
```

#### 使用GitHub Actions自动构建：

1. 推送一个tag来触发构建：
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. 或者手动触发GitHub Actions工作流

3. 构建完成后，在Releases页面下载APK

## 🚀 GitHub Actions 构建流程

项目配置了自动构建工作流，当推送tag时会：
1. 设置Node.js环境
2. 安装Tauri CLI和Android依赖
3. 构建Android APK
4. 上传APK到Artifacts
5. 创建GitHub Release并附加APK

## 📱 APK下载

在GitHub Releases页面可以下载最新版本的APK文件：
- https://github.com/5918vo/yield-showcase-app/releases

## 🎯 使用说明

1. 打开应用
2. 在输入框中输入今日收益率（例如：5.67）
3. 应用会实时显示收益率和当前时间
4. 点击"📸 生成炫耀图片"按钮保存图片到本地
5. 点击"📤 分享炫耀"按钮分享图片

## 🔧 配置

### 修改应用信息
编辑 `src-tauri/tauri.conf.json`：
- `package.productName`: 应用名称
- `package.version`: 版本号
- `tauri.bundle.identifier`: 包标识符

### 修改界面样式
编辑 `src/App.tsx` 中的Styled Components

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系

如有问题，请通过GitHub Issues联系。

---

**投资有风险，数据仅供参考**