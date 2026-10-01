# Smart Recipe Book

<p align="center">
  <img src="public/icons/orange/lucide_chef-hat.svg" alt="Smart Recipe Book chef hat logo" width="180" />
</p>

<p align="center">A recipe management application for discovering, creating, editing, and organizing recipes, with favorites, pantry items, comments, and meal planning.</p>

## Contents

<details>
  <summary>Table of Contents</summary>

- [1. Project Overview](#1-project-overview)
  - [Project History](#project-history)
  - [Pull Request Archive](#pull-request-archive)
- [2. Setup and Installation](#2-setup-and-installation)
- [3. Contributors](#3-contributors)
- [4. Technologies Used](#4-technologies-used)
- [5. Features](#5-features)
- [6. Accessibility and Responsive Design](#6-accessibility-and-responsive-design)
- [7. Testing and Validation](#7-testing-and-validation)
- [8. Project Structure](#8-project-structure)
- [9. Development Notes](#9-development-notes)
- [10. Known Limitations](#10-known-limitations)
- [11. Credits](#11-credits)

</details>

---

## 1. Project Overview

Smart Recipe Book is a web application for managing recipes and kitchen ingredients. Users can browse recipes, save favorites, create their own recipes, manage pantry items, write comments, and plan meals.

This repository is copied from the NOROFF GitHub Classroom project **Smart Recipe Book OCT24FT**, created for the NOROFF Front End Development Year 2 Agency 2 course.

All planning and execution took place on a private GitHub Projects board. The board is not linked here because it is not publicly accessible.

### Project History

The repository contains unmerged branches kept for posterity. Because the original school repository is private, the pull request references below point to placeholders in this repository. Replace each placeholder with the relevant screenshot when it is uploaded.

### Pull Request Archive

- [add-edit-and-delete-pantry-items #18](documentation/screenshots/pull-requests/add-edit-and-delete-pantry-items-18.png)
- [feature-add-comment #22](documentation/screenshots/pull-requests/feature-add-comment-22.png)

---

## 2. Setup and Installation

### Prerequisites

- Node.js 18 or newer
- npm
- Access to the API and any required environment variables

### Installation

1. Clone or download the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and configure it as needed:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The application opens at [http://localhost:5173](http://localhost:5173).

### Available Scripts

```bash
npm run dev              # Start the Vite development server
npm run build            # Typecheck and create a production build
npm run preview          # Preview the production build locally
npm run typecheck        # Run TypeScript checks
npm run lint             # Run ESLint
npm run format:check     # Check Prettier formatting
npm run format           # Format supported files
npm run storybook        # Start Storybook on port 6006
npm run build-storybook  # Build a static Storybook site
```

---

## 3. Contributors

<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/31161694?v=4" alt="larstp profile picture" width="64" height="64" style="border-radius: 32px !important;"><br><a href="https://github.com/larstp">larstp</a></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/94002041?v=4" alt="emmelinlarina profile picture" width="64" height="64" style="border-radius: 32px !important;"><br><a href="https://github.com/emmelinlarina">emmelinlarina</a></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/127958662?v=4" alt="telecasteren profile picture" width="64" height="64" style="border-radius: 32px !important;"><br><a href="https://github.com/telecasteren">telecasteren</a></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/185394804?v=4" alt="jb12-art profile picture" width="64" height="64" style="border-radius: 32px !important;"><br><a href="https://github.com/jb12-art">jb12-art</a></td>
  </tr>
</table>

---

## 4. Technologies Used

- **React** 19 - User interface
- **TypeScript** 5.9 - Type-safe application code
- **Vite** 7 - Development server and production bundling
- **React Router** 7 - Client-side routing
- **Tailwind CSS** 4 - Styling and layout
- **React Hot Toast** - User feedback notifications
- **Storybook** 10 - Component development and documentation
- **Vitest** with Playwright - Browser test tooling
- **ESLint** 9 and **Prettier** - Code quality and formatting
- **Husky** and **lint-staged** - Pre-commit checks

---

## 5. Features

### Recipe Management

- Browse and view recipes
- Create new recipes with ingredients, instructions, tags, and images
- Edit and delete recipes owned by the signed-in user
- View recipe details and relative timestamps

### Favorites and Meal Planning

- Add and remove recipes from favorites
- View a dedicated favorites page
- Organize recipes through the meal plan page

### Pantry Management

- Add pantry items
- Edit existing pantry items
- Delete pantry items
- View pantry contents in a dedicated page

### Accounts and Navigation

- Register and log in
- Maintain an authenticated session
- Log out securely
- Navigate between home, recipes, favorites, meal planning, and pantry views
- Display clear loading, error, and not-found states

### Comments

- Add comments to recipes when signed in
- View comments associated with recipe details

---

## 6. Accessibility and Responsive Design

The application is designed for desktop and mobile use and includes:

- Semantic headings, forms, buttons, and navigation landmarks
- Labels and accessible controls for form inputs
- Keyboard-accessible interactive elements
- Alternative text for recipe imagery
- Responsive layouts for the main pages and forms
- Loading, empty, error, and not-found states

Accessibility should be manually checked with keyboard navigation and browser accessibility tools when making substantial UI changes.

---

## 7. Testing and Validation

Run the main checks before delivery:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Storybook can be used to inspect isolated components:

```bash
npm run storybook
```

Important manual flows include registration, login, logout, recipe creation and editing, favorites, pantry item management, comments, meal planning, protected routes, error states, and responsive layouts.

---

## 8. Project Structure

```text
src/
├── components/       # Reusable UI components and Storybook stories
├── constants/        # Shared application constants
├── context/          # Authentication and favorites providers
├── hooks/             # Custom React hooks
├── lib/               # Error handling and helper functions
├── pages/             # Application pages and route views
├── services/          # API clients, types, and domain models
├── types/             # Shared TypeScript types
├── App.tsx            # Root component and route setup
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind import
```

---

## 9. Development Notes

### React Hot Toast

The `Toaster` component is configured in [Layout.tsx](src/components/Layout.tsx). Toast notifications can be triggered from application components with the `toast` function.

```tsx
import toast from 'react-hot-toast';

toast('Useful information here');
toast.success('Operation successful');
toast.error('An error occurred.');
```

The recipe form contains an example usage in [RecipeForm.tsx](src/components/RecipeForm/RecipeForm.tsx).

### Storybook Components

Storybook stories are located alongside components in `src/components`. The existing examples include:

- [Button.stories.ts](src/components/Button.stories.ts)
- [Badge.stories.ts](src/components/badge/Badge.stories.ts)

When adding a reusable component, add a matching `*.stories.ts` file to document its states and behavior.

---

## 10. Known Limitations

- The original GitHub Classroom repository and planning board are private and therefore are not linked here.
- The pull request archive currently contains placeholders until screenshots of the private pull requests are uploaded.
- API behavior depends on the configured backend and environment variables.
- Some browser and Storybook tests require the project dependencies and Playwright browsers to be installed locally.

---

## 11. Credits

### Icons

- [Lucide](https://lucide.dev/) - Chef hat and interface icons

### Tools and Resources

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)
- [React Hot Toast](https://react-hot-toast.com/)
