import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LoginButton from './LoginButton';
import { useAuth } from '../context/useAuth';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/my-recipes', label: 'My Recipes' },
    { to: '/pantry', label: 'Pantry' },
    { to: '/meal-plan', label: 'Meal Plan' },
    { to: '/favorites', label: 'Favorites' },
  ];

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-2 rounded-md px-3 py-1 text-sm transition-colors ${
      isActive ? 'text-[#FF6900]' : 'text-[#4A5565] hover:text-gray-900'
    }`;

  const visibleNavItems = user ? navItems : navItems.slice(0, 1);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

      <header className="relative z-100 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between md:hidden">
            <div className="flex items-center gap-3 justify-self-start">
              <img
                src="/icons/orange/lucide_chef-hat.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0"
              />
              <span className="text-lg font-semibold text-(--text-primary) whitespace-nowrap">
                Smart Recipe Book
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#4A5565] transition hover:bg-gray-100"
            >
              <img
                src={
                  isMobileMenuOpen
                    ? '/icons/black/lucide_x.svg'
                    : '/icons/black/lucide_menu.svg'
                }
                alt=""
                aria-hidden="true"
                className="h-6 w-6"
              />
            </button>
          </div>

          <div className="hidden h-16 grid-cols-3 items-center md:grid">
            <div className="flex items-center gap-3 justify-self-start">
              <img
                src="/icons/orange/lucide_chef-hat.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0"
              />
              <span className="text-lg font-semibold text-(--text-primary) whitespace-nowrap">
                Smart Recipe Book
              </span>
            </div>

            <nav className="flex items-center justify-center gap-1 justify-self-center">
              <div className="flex items-center gap-1">
                {visibleNavItems.map((item) =>
                  item.to === '/' ? (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `${linkClass(isActive)} whitespace-nowrap`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <img
                            src={
                              isActive
                                ? '/icons/orange/lucide_home.svg'
                                : '/icons/black/lucide_home.svg'
                            }
                            alt=""
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0"
                          />
                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `${linkClass(isActive)} whitespace-nowrap`
                      }
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  ),
                )}
              </div>
            </nav>

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

        <div
          className={`fixed inset-0 top-16 z-90 md:hidden transition-opacity duration-300 ease-out ${
            isMobileMenuOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
          onClick={closeMobileMenu}
        >
          <div
            className={`absolute inset-0 backdrop-blur-md transition-opacity duration-300 ease-out ${
              isMobileMenuOpen
                ? 'bg-white/25 opacity-100'
                : 'bg-white/0 opacity-0'
            }`}
          />

          <aside
            className={`absolute right-3 top-3 w-[min(22rem,calc(100vw-1.5rem))] max-h-[calc(100vh-5rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out ${
              isMobileMenuOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-full flex-col p-4">
              <nav className="flex flex-col gap-2 pb-16">
                {visibleNavItems.map((item) =>
                  item.to === '/' ? (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `${linkClass(isActive)} justify-start py-3 text-base`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <img
                            src={
                              isActive
                                ? '/icons/orange/lucide_home.svg'
                                : '/icons/black/lucide_home.svg'
                            }
                            alt=""
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0"
                          />
                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `${linkClass(isActive)} justify-start py-3 text-base`
                      }
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  ),
                )}
              </nav>

              <div className="pt-6" onClick={closeMobileMenu}>
                <LoginButton />
              </div>
            </div>
          </aside>
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
