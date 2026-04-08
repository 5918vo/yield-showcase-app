// 简单的测试脚本来验证应用结构
const fs = require('fs');
const path = require('path');

console.log('✅ 验证项目结构...\n');

const requiredFiles = [
  'package.json',
  'src/App.tsx',
  'src-tauri/Cargo.toml',
  'src-tauri/tauri.conf.json',
  '.github/workflows/build-android.yml',
  'README.md'
];

let allPassed = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
    
    // 检查文件内容
    if (file === 'package.json') {
      const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (pkg.name === 'yield-showcase-app') {
        console.log('   ✓ 包名正确');
      } else {
        console.log('   ✗ 包名不正确');
        allPassed = false;
      }
    }
    
    if (file === 'src-tauri/tauri.conf.json') {
      const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (config.tauri?.bundle?.android?.packageName === 'com.yieldshowcase.app') {
        console.log('   ✓ Android包名配置正确');
      } else {
        console.log('   ✗ Android包名配置不正确');
        allPassed = false;
      }
    }
  } else {
    console.log(`❌ ${file} - 文件不存在`);
    allPassed = false;
  }
});

console.log('\n📦 检查依赖...');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const requiredDeps = ['react', 'html2canvas', 'date-fns', 'styled-components'];
  const missingDeps = requiredDeps.filter(dep => !pkg.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('✅ 所有必需依赖已安装');
  } else {
    console.log(`❌ 缺少依赖: ${missingDeps.join(', ')}`);
    allPassed = false;
  }
} catch (error) {
  console.log('❌ 无法读取package.json');
  allPassed = false;
}

console.log('\n🚀 检查GitHub Actions工作流...');
const workflowPath = path.join(__dirname, '.github/workflows/build-android.yml');
if (fs.existsSync(workflowPath)) {
  const workflow = fs.readFileSync(workflowPath, 'utf8');
  if (workflow.includes('Build Android APK') && workflow.includes('tauri android build')) {
    console.log('✅ GitHub Actions工作流配置正确');
  } else {
    console.log('❌ GitHub Actions工作流配置不正确');
    allPassed = false;
  }
}

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('🎉 所有检查通过！项目已准备就绪。');
  console.log('\n下一步：');
  console.log('1. 访问 https://github.com/5918vo/yield-showcase-app 查看仓库');
  console.log('2. 在Actions标签页查看构建进度');
  console.log('3. 构建完成后在Releases页面下载APK');
  console.log('4. 本地开发: npm run dev → npm run tauri dev');
} else {
  console.log('⚠️  有些检查未通过，请检查上述问题。');
}
console.log('='.repeat(50));