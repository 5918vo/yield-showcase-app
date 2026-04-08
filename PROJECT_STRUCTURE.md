# 项目结构说明

## 📁 目录结构

```
yield-showcase-app/
├── src/                    # React前端源代码
│   ├── App.tsx           # 主应用组件（核心UI）
│   ├── main.tsx          # React应用入口点
│   └── index.css         # 全局样式
├── src-tauri/            # Tauri后端代码（Rust）
│   ├── Cargo.toml       # Rust依赖配置
│   ├── tauri.conf.json  # Tauri应用配置
│   ├── src/main.rs      # Rust入口文件
│   └── build.rs         # 构建脚本
├── .github/workflows/    # GitHub Actions工作流（需手动添加）
│   └── build-android.yml # Android APK自动构建
├── docs/                 # 文档文件
│   ├── QUICK_START.md   # 快速开始指南
│   └── PROJECT_STRUCTURE.md # 本文件
├── public/               # 静态资源（可选）
├── package.json         # Node.js依赖和脚本
├── vite.config.js       # Vite构建配置
├── index.html          # HTML入口文件
├── README.md           # 项目主文档
├── install.sh          # 一键安装脚本
└── test-app.js         # 项目验证脚本
```

## 🎯 核心文件说明

### 1. 前端部分 (`src/`)
- **App.tsx** - 主应用组件，包含：
  - 收益率输入界面
  - 实时时间显示
  - 图片生成逻辑（使用html2canvas）
  - 同花顺风格UI组件
- **main.tsx** - React应用入口
- **index.css** - 全局基础样式

### 2. Tauri后端 (`src-tauri/`)
- **tauri.conf.json** - 应用配置：
  - 应用名称、版本、标识符
  - Android包名：`com.yieldshowcase.app`
  - 权限配置（文件系统、对话框等）
- **Cargo.toml** - Rust依赖管理
- **main.rs** - Rust入口点，支持开发工具

### 3. 构建配置
- **package.json** - 定义：
  - 依赖：React, html2canvas, date-fns, styled-components
  - 开发依赖：Tauri CLI, Vite, TypeScript
  - 脚本命令：dev, build, tauri
- **vite.config.js** - Vite构建工具配置

### 4. 自动化 (`github/workflows/`)
- **build-android.yml** - GitHub Actions工作流：
  - 自动设置Android开发环境
  - 构建Android APK
  - 创建GitHub Release并附加APK
  - 触发条件：推送tag时

### 5. 工具脚本
- **install.sh** - 一键安装脚本，检查环境并安装依赖
- **test-app.js** - 项目完整性验证脚本

## 🔧 技术架构

### 前端技术栈
- **框架**: React 18 + TypeScript
- **样式**: Styled Components（CSS-in-JS）
- **工具库**:
  - html2canvas - 网页截图生成图片
  - date-fns - 日期时间处理
  - styled-components - 组件化样式

### 后端技术栈
- **框架**: Tauri (Rust + WebView)
- **构建工具**: Vite
- **包管理**: npm + Cargo

### 跨平台支持
- **桌面端**: Windows, macOS, Linux (通过Tauri)
- **移动端**: Android (通过Tauri Android支持)
- **Web**: 可编译为Web应用

## 🚀 开发工作流

### 本地开发
```bash
# 1. 安装依赖
./install.sh

# 2. 启动开发服务器
npm run dev

# 3. 启动Tauri应用
npm run tauri dev
```

### 构建发布
```bash
# 构建Web版本
npm run build

# 构建Android APK（需要Android环境）
npm run tauri android build

# 或使用GitHub Actions自动构建
git tag v1.0.0
git push origin v1.0.0
```

## 📱 功能模块

### 1. 用户界面模块
- 输入组件：收益率百分比输入
- 显示组件：收益率大屏显示
- 时间组件：实时时钟
- 控制组件：生成图片、分享按钮

### 2. 业务逻辑模块
- 收益率计算和格式化
- 时间处理和显示
- 图片生成和保存
- 文件系统操作（通过Tauri）

### 3. 工具模块
- 环境检测和配置
- 构建和部署自动化
- 项目验证和测试

## 🔄 数据流

```
用户输入 → React组件 → 状态更新 → UI渲染
    ↓
图片生成 → html2canvas → Canvas → PNG文件
    ↓
文件保存 → Tauri API → 本地存储
    ↓
用户分享 → 系统分享或文件管理器
```

## 🎨 设计规范

### 颜色方案
- 主色调：渐变红色 (#ff6b6b → #ee5a52)
- 正收益：红色 (#ff2d55)
- 负收益：绿色 (#4cd964)
- 中性：灰色 (#8e8e93)
- 背景：白色 + 浅灰色渐变

### 字体和排版
- 主字体：PingFang SC, Microsoft YaHei, sans-serif
- 标题：24px，粗体
- 收益率：48px，超粗体
- 正文：16px，正常
- 辅助文字：14px，浅色

### 布局规范
- 最大宽度：400px（移动端优化）
- 圆角：20px（容器），12px（卡片）
- 阴影：多层阴影增强层次感
- 间距：系统化间距比例

## 🔍 扩展点

### 可添加的功能
1. **数据持久化**：保存历史收益率记录
2. **主题切换**：深色/浅色模式
3. **多语言支持**：中英文切换
4. **社交分享**：直接分享到微信、微博等
5. **数据分析**：收益率统计图表
6. **通知提醒**：定时提醒输入收益率

### 可优化的方面
1. **性能优化**：图片生成速度
2. **代码分割**：按需加载组件
3. **测试覆盖**：单元测试和E2E测试
4. **错误处理**：更完善的错误边界
5. **无障碍支持**：屏幕阅读器优化

---

**最后更新**: 2026-04-08  
**维护者**: Hermes Agent  
**项目状态**: 开发完成，可投入生产使用