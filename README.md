# 个人财务管理系统

## 项目概述

个人财务管理系统是一个基于 Vue 3 和 TypeScript 开发的单页面应用(SPA),旨在帮助用户轻松管理个人财务。该应用提供了直观的界面,用于记录收支、设置预算、生成财务报表,帮助用户更好地了解和控制自己的财务状况。

![首页](https://ice.frostsky.com/2024/08/20/f54a169132300ef2c87109ebec3e9402.png)

![交易](https://ice.frostsky.com/2024/08/20/b5d91ba0f172bbf55e4e919ca1bc1741.png)

![财务报表](https://ice.frostsky.com/2024/08/20/b77bf98f43b31d888d8872bfb94bc0c3.png)

## 主要功能

- **交易记录管理**
  - 添加收入和支出记录
  - 查看、编辑和删除交易记录
  - 按类别、日期筛选交易记录

- **预算管理**
  - 设置不同类别的月度预算
  - 查看预算使用情况
  - 预算超支提醒

- **财务报表**
  - 收支概览
  - 月度收支趋势图
  - 支出类别分布饼图
  - 预算执行情况条形图

- **数据持久化**
  - 使用本地存储保存用户数据
  - 数据导入/导出功能(计划中)

## 技术栈

- **前端框架**: Vue 3
- **编程语言**: TypeScript
- **状态管理**: Pinia
- **路由管理**: Vue Router
- **UI 框架**: Tailwind CSS
- **图表库**: Chart.js / vue-chartjs
- **构建工具**: Vite
- **包管理器**: npm

## 安装和运行

1. 克隆仓库:
   ```
   git clone git@github.com:Aaronwn/personal-finance-manager.git
   cd personal-finance-manager
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 运行开发服务器:
   ```
   npm run dev
   ```

4. 构建生产版本:
   ```
   npm run build
   ```

## 项目结构

```
personal-finance-manager/
├── src/
│   ├── assets/
│   ├── components/
│   ├── router/
│   ├── stores/
│   ├── views/
│   ├── App.vue
│   └── main.ts
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 贡献指南

我们欢迎并感谢任何形式的贡献。如果您想为项目做出贡献,请遵循以下步骤:

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 将您的更改推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 待办事项

- [ ] 实现数据导入/导出功能
- [ ] 添加多货币支持
- [ ] 实现账户管理功能
- [ ] 添加财务目标设置和跟踪
- [ ] 优化移动端体验

