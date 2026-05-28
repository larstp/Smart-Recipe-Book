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
├── hooks/                   # Custom hooks
├── lib/                     # Library of helpers and utilities
├── services/                # Library of API services and models (interfaces)
├── pages/                   # Folder for page components
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── index.css                # Global styles & Tailwind import
```

---

## React Hot Toast

_See in [Layout.tsx](src/components/Layout.tsx), for how the `Toaster` component is set up to display toast notifications._

**When developing and in need of a toast notification, you can simply call them from any component using the `toast` function.**

**Usage:**

```tsx
import toast from 'react-hot-toast';

// Default toast
toast('Useful information here');

// Success toast
toast.success('<Operation> successful');

// Error toast
toast.error('An error occurred.');
```

**File where a `toast` is currently used:**

- [RecipeForm.tsx](src/components/RecipeForm/RecipeForm.tsx)

---

## Storybook Components

**_1 component = 1 story_**

_Storybook "stories" are located in the `src/components` directory, with each component having a `.stories.ts` file._

_Run `npm run storybook` to start the Storybook preview and see how the components look and behave._

### How to add a Story

1. Create a new `*.stories.ts` file in the `src/components` directory for your component.
2. Export a default story function that returns the component you want to display in the Storybook preview.

**Usage:**

```tsx
import { Meta, Story } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
  },
};
```

**Example files to have a look at:**

- [Button.stories.ts](src/components/Button.stories.ts)
- [Badge.stories.ts](src/components/Badge.stories.ts)
