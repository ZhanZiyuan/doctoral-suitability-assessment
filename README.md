<p align="center">
    <img alt="logo" src="./src/app/icon.svg"
        width="138" />
</p>

# Doctoral Suitability Assessment Scale

<p align="right">
    <b>English</b> | <a href="./README_zh.md">简体中文</a>
</p>

[![GitHub last commit](https://img.shields.io/github/last-commit/ZhanZiyuan/doctoral-suitability-assessment)](https://github.com/ZhanZiyuan/doctoral-suitability-assessment/commits/main/)
[![GitHub License](https://img.shields.io/github/license/ZhanZiyuan/doctoral-suitability-assessment)](https://github.com/ZhanZiyuan/doctoral-suitability-assessment/blob/main/LICENSE)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ZhanZiyuan/doctoral-suitability-assessment/total)](https://github.com/ZhanZiyuan/doctoral-suitability-assessment/releases)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/dsascale)](https://dsascale.vercel.app/)

A scientific, non-diagnostic self-assessment tool to evaluate your readiness for a PhD program.

## 📕 Introduction

Pursuing a Doctor of Philosophy (PhD) is a significant life decision that involves substantial investment in time, effort, and resources. It is a process filled with academic challenges, research pressures, and personal growth. Therefore, conducting a thorough self-assessment before embarking on this journey is crucial. Many prospective students may be unsure if they possess the necessary motivation, research skills, psychological resilience, and other key competencies required for doctoral studies. This ambiguity can lead to hesitation in decision-making or difficulties in adaptation after enrollment.

The Doctoral Suitability Assessment Scale (DSAS) is a scientific, non-diagnostic self-assessment tool designed to help prospective doctoral students comprehensively evaluate their readiness for pursuing a PhD. Through a series of multi-dimensional questions, this tool assists users in gaining a deeper understanding of their strengths and areas for improvement, providing a valuable reference for their decision-making.

## ✨ Key Features

- **Interactive Experience**: A smooth, single-page application experience built with [Next.js](https://nextjs.org/).
- **Rich Data Visualization**: Displays assessment results using an interactive radar chart, built with [Recharts](https://recharts.org/).
- **Modern UI/UX**: Crafted with [Tailwind CSS](https://tailwindcss.com/) and [Shadcn UI](https://ui.shadcn.com/) for a responsive and aesthetically pleasing interface.
- **Multi-Language Support**: Easily adaptable for different languages (currently supports English and Simplified Chinese).
- **Full-Stack TypeScript**: Ensures type safety and better developer experience across the entire application.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20 or later recommended)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)

### Installation & Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ZhanZiyuan/doctoral-suitability-assessment.git
    cd doctoral-suitability-assessment
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Run the development servers:**

    ```bash
    pnpm run dev
    ```

    This will start the frontend application, typically on `http://localhost:9002`.

4. **Open the application:**
    Open your browser and navigate to `http://localhost:9002` to see the application in action.

## 🌐 Online Deployment

This application is deployed on [Vercel](https://dsascale.vercel.app/).

## 📄 License

This project is licensed under the GPLv3 License - see the [LICENSE](./LICENSE) file for details.
