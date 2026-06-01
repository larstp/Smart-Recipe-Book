import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginFormData, LoginFormError } from '../types/loginForm';
import { useAuth } from '../context/useAuth';
import { createApiKey, loginUser } from '../services/api/auth';
import { STORAGE_KEYS } from '../constants/storage';
import { Button } from '../components/Button';

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormError>({});

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate(): LoginFormError {
    const newErrors: LoginFormError = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.trim().length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    try {
      setLoading(true);
      setApiError('');

      const data = await loginUser(formData.email, formData.password);

      const accessToken = data.data.accessToken;

      const user = {
        name: data.data.name,
        email: data.data.email,
      };

      login(accessToken, user);

      const storedApiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);

      if (!storedApiKey) {
        const apiKeyResponse = await createApiKey(accessToken);

        localStorage.setItem(STORAGE_KEYS.API_KEY, apiKeyResponse.data.key);
      }

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-6 sm:p-6">
      <img
        src="/loginpage.svg"
        className="mx-auto w-12 h-12 sm:w-14 sm:h-14 mb-4"
      />
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
        Welcome Back
      </h1>
      <p className="text-gray-500 text-center">Log in to access your recipes</p>

      <form
        className="w-full mx-auto max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6 sm:mt-8"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-semibold">Email</label>
        <div>
          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 sm:py-1.5 text-sm mb-4 mt-1"
            type="text"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="mt-0 text-red">&#11205;{errors.email}</p>
          )}
        </div>

        <label className="text-sm font-semibold">Password</label>
        <div>
          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 sm:py-1.5 text-sm mb-4 mt-1"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="">&#11205;{errors.password}</p>}
        </div>

        {apiError && <p className="text-red-500 text-sm-mb-4">{apiError}</p>}

        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white sm:py-2 text-sm font-semibold mb-5 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in..' : 'Log In'}
        </Button>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-500 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
