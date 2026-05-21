import { Link } from 'react-router-dom';

export default function LoginButton() {
  return (
    <Link
      to="/login"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors bg-orange-500 text-white"
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
