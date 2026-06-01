import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Button } from './Button';

// This button function does both, Login and Logout.

export default function LoginButton() {
  const { user, logout } = useAuth();
  return user ? (
    <Button
      onClick={logout}
      variant="secondary"
      className="inline-flex items-center gap-2 px-3! py-2! text-sm font-semibold transition-colors bg-gray-100! text-black cursor-pointer"
    >
      <img
        src="/lucide_log-out.svg"
        alt=""
        aria-hidden="true"
        className="w-3.5 h-3.5"
      />

      <span>Log Out</span>
    </Button>
  ) : (
    <Link
      to="/login"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors bg-orange-500 text-white cursor-pointer"
    >
      <img
        src="/login-btn-icon.svg"
        alt=""
        aria-hidden="true"
        className="w-3.5 h-3.5"
      />

      <span>Log In</span>
    </Link>
  );
}
