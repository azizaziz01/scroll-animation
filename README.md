# Scroll Animation Showcase

A premium, interactive web experience demonstrating advanced scroll animations, parallax depth effects, and modern responsive design. Built with React 19, TypeScript, and powered by GSAP.

## 🌟 Features

- **Advanced Animations**: Complex, choreographed animations using **GSAP** (GreenSock Animation Platform).
- **Butter-Smooth Scrolling**: Integrated **Lenis** for a premium, inertial scrolling experience.
- **Parallax Depth**: Multi-layered parallax effects utilizing 3D transforms for immersive visual depth.
- **Performance Optimized**: 
  - Lazy loading for heavy components.
  - GPU-accelerated animations (`will-change`, `transform-gpu`).
  - Paint containment optimizations.
- **Modern Styling**: Built with **Tailwind CSS v4** for a sleek, responsive design system.
- **Responsive Layout**: Carefully crafted experiences for both desktop and mobile devices.

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP (ScrollTrigger, ScrollToPlugin)
- **Scrolling**: Lenis
- **Fonts**: Inter & Custom Display Fonts

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd scroll-animation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components & Sections
│   ├── Hero.tsx       # Landing area
│   ├── Navbar.tsx     # Responsive navigation
│   ├── PinnedTextSection.tsx # Parallax works showcase
│   ├── Services.tsx   # Horizontal scroll services
│   ├── ImageGrowSection.tsx # Scroll-triggered video expansion
│   └── ...
├── data/              # Static data definitions (Works, Services)
├── constants/         # Animation & Theme constants
├── assets/            # Images and static assets
└── App.tsx            # Main application entry
