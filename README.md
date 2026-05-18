# Smart Recipe Book

A web application built with React, Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **React** 19
- **Vite** 7
- **TypeScript** 5.9
- **Tailwind CSS** 4
- **Storybook** 10
- **Vitest** with Playwright browser testing
- **ESLint** 9 + **Prettier**
- **Husky** + **lint-staged** for pre-commit checks

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

Copy the environment template and configure as needed:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

Output is in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Code Quality

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format:check  # Check formatting
npm run format        # Auto-fix formatting
```

### Type Check

```bash
npm run typecheck
```

Pre-commit hooks automatically run linting, formatting checks, and type checking via Husky and lint-staged.

## Storybook

```bash
npm run storybook
```

Opens Storybook at [http://localhost:6006](http://localhost:6006).

Build a static Storybook site:

```bash
npm run build-storybook
```

## Project Structure

```
src/
├── assets/                  # Static assets
├── components/
│   ├── Button.tsx           # Reusable UI components
│   └── Button.stories.ts    # Storybook stories
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── index.css                # Global styles & Tailwind import
```
