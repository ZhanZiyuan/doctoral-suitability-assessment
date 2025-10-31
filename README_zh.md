<p align="center">
    <img alt="logo" src="./src/app/icon.svg"
        width="138" />
</p>

# 博士适合性评价量表

<p align="right">
    <a href="./README.md">English</a> | <b>简体中文</b>
</p>

[![GitHub last commit](https://img.shields.io/github/last-commit/ZhanZiyuan/doctoral-suitability-assessment)](https://github.com/ZhanZiyuan/doctoral-suitability-assessment/commits/main/)
[![GitHub License](https://img.shields.io/github/license/ZhanZiyuan/doctoral-suitability-assessment)](https://github.com/ZhanZiyuan/doctoral-suitability-assessment/blob/main/LICENSE)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ZhanZiyuan/doctoral-suitability-assessment/total)](https://github.com/ZhanZiyuan/doctoral-suitability-assessment/releases)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/dsascale)](https://dsascale.vercel.app/)

一份科学但非诊断性的自我评估工具，旨在帮助您评估攻读博士学位的准备情况。

## 📕 介绍

攻读哲学博士（PhD）学位是一项重大的人生决策，需要投入大量的时间、精力和资源。
这是一个充满学术挑战、科研压力和个人成长的过程。
因此，在开启这段旅程前进行充分的自我评估至关重要。
许多潜在的申请者可能不确定自己是否具备读博所需的动机、研究能力、心理韧性等关键素质。
这种不确定性可能导致决策的犹豫，或是在入学后出现适应困难。

“博士适合性评价量表”（Doctoral Suitability Assessment Scale, DSAS）是一份科学的、非诊断性的自我评估工具，
旨在帮助准博士生们全面衡量自己是否为攻读博士学位做好了准备。
通过一系列多维度的问题，本工具能够帮助使用者更深入地了解自身的优势与待提升的方面，为最终决策提供有价值的参考。

## ✨ 主要功能

- **流畅的交互体验**: 基于 [Next.js](https://nextjs.org/) 构建的平滑单页应用体验。
- **丰富的数据可视化**: 使用 [Recharts](https://recharts.org/) 构建的交互式雷达图来展示评估结果。
- **现代化的 UI/UX**: 采用 [Tailwind CSS](https://tailwindcss.com/) 和 [Shadcn UI](https://ui.shadcn.com/) 精心设计，界面美观且响应迅速。
- **多语言支持**: 可轻松适配不同语言（目前支持英文和简体中文）。
- **全栈 TypeScript**: 在整个应用中确保类型安全，提升开发体验。

## 🛠️ 技术栈

- **框架**: [Next.js](https://nextjs.org/) (React)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**: [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **图表**: [Recharts](https://recharts.org/)
- **表单处理**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 快速开始

请遵循以下说明，在你的本地机器上设置并运行该项目，以便进行开发和测试。

### 环境要求

- [Node.js](https://nodejs.org/en) (推荐 v20 或更高版本)
- [pnpm](https://pnpm.io/installation) (或 npm/yarn)

### 安装与设置

1. **克隆仓库:**

    ```bash
    git clone https://github.com/ZhanZiyuan/doctoral-suitability-assessment.git
    cd doctoral-suitability-assessment
    ```

2. **安装依赖:**

    ```bash
    pnpm install
    ```

3. **运行开发服务器:**

    ```bash
    pnpm run dev
    ```

    这会启动前端应用，通常监听 `http://localhost:9002`。

4. **打开应用:**
    打开你的浏览器并访问 `http://localhost:9002` 即可看到运行中的应用。

## 🌐 在线部署

此应用已部署在 [Vercel](https://dsascale.vercel.app/) 上。

## 📄 开源许可

本项目基于 GPLv3 许可证 - 详情请参阅 [LICENSE](./LICENSE) 文件。
