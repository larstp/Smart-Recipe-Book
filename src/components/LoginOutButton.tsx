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
        src="/icons/black/lucide_log-out.svg"
        alt=""
        aria-hidden="true"
        className="w-3.5 h-3.5"
      />

      <span>Log Out</span>
    </Button>
  ) : (
    <div className="flex items-center gap-2">
      <Link
        to="/login"
        className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-3 py-1.5 text-sm text-white transition-colors cursor-pointer"
      >
        <img
          src="/icons/white/lucide_log-in.svg"
          alt=""
          aria-hidden="true"
          className="w-3.5 h-3.5"
        />

        <span>Log In</span>
      </Link>

      <Link
        to="/register"
        className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-[#4A5565] transition-colors hover:bg-gray-50 cursor-pointer"
      >
        <span>Register</span>
      </Link>
    </div>
  );
}
