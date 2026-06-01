import { NavLink, Outlet, useLocation } from 'react-router-dom';
import LoginButton from './LoginOutButton';
import { useAuth } from '../context/useAuth';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const { user } = useAuth();

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/my-recipes', label: 'My Recipes' },
    { to: '/pantry', label: 'Pantry' },
    { to: '/meal-plan', label: 'Meal Plan' },
    { to: '/favorites', label: 'Favorites' },
  ];

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
      isActive ? 'text-[var(--brand)]' : 'text-gray-600 hover:text-gray-900'
    }`;

  // different header for auth pages
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            color: '#1e40af',
            backgroundColor: '#dbeafe',
            border: '1px solid #93c5fd',
          },
          success: {
            style: {
              color: '#166534',
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
            },
          },
          error: {
            style: {
              color: '#991b1b',
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
            },
          },
        }}
      />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 items-center h-16">
            <div className="flex items-center gap-3 justify-self-start">
              <div
                className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center"
                aria-hidden
              >
                {/* Logo placeholder until we get/make one */}
              </div>
              <span className="text-lg font-semibold text-(--text-primary) whitespace-nowrap">
                Smart Recipe Book
              </span>
            </div>

            <nav className="flex items-center justify-center gap-1 justify-self-center">
              <div className="flex items-center gap-1">
                {isAuthPage ? (
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${linkClass(isActive)} whitespace-nowrap`
                    }
                  >
                    <span>Home</span>
                  </NavLink>
                ) : (
                  navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `${linkClass(isActive)} whitespace-nowrap`
                      }
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  ))
                )}
              </div>
            </nav>

            {/* show username after login */}
            <div className="flex items-center justify-self-end gap-3">
              {user && (
                <span className="text-sm text-gray-500 hidden sm:inline">
                  Hi, {user.name}!
                </span>
              )}

              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Smart Recipe Book. A project for learning
          React & TypeScript.
        </div>
      </footer>
    </div>
  );
}
