import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { createApiKey } from '../api/auth';
import { STORAGE_KEYS } from '../constants/storage';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFromError = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // errors
  const [errors, setErrors] = useState<RegisterFromError>({});

  const [apiError, setApiError] = useState('');

  const [loading, setLoading] = useState(false);

  //
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // validation
  function validate(): RegisterFromError {
    const newErrors: RegisterFromError = {};

    // display name
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Username must be at least 2 characters';
    }

    // email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enater a valid email address';
    }

    // password
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // password confirm
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password do not match';
    }

    return newErrors;
  }

  // submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    // stop if errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setApiError('');

      // registration request
      const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      // api errors
      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'Failed to register');
      }

      // auto login after register
      const loginResponse = await fetch(
        'https://v2.api.noroff.dev/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const loginData = await loginResponse.json();

      const accessToken = loginData.data.accessToken;

      const user = {
        name: loginData.data.name,
        email: loginData.data.email,
      };

      // login user
      login(accessToken, user);

      // create api key
      const apiKeyResponse = await createApiKey(accessToken);

      localStorage.setItem(STORAGE_KEYS.API_KEY, apiKeyResponse.data.key);

      // redirect home
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
        src="/icons/orange/register-icon.svg"
        className="mx-auto w-12 h-12 sm:w-14 sm:h-14 mb-4"
      />

      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
        Create Account
      </h1>

      <p className="text-gray-500 text-center">Join Smart Recipe Book today</p>

      <form
        className="w-full mx-auto max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6 sm:mt-8"
        onSubmit={handleSubmit}
      >
        {/* display name */}
        <label className="text-sm font-semibold">Display Name</label>

        <input
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-2 mt-1"
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-3">{errors.name}</p>
        )}

        {/* email */}
        <label className="text-sm font-semibold">Email</label>

        <input
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-2 mt-1"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>
        )}

        {/* password */}
        <label className="text-sm font-semibold">Password</label>

        <input
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-2 mt-1"
          type="password"
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        {/* confirm password */}
        <label className="text-sm font-semibold">Confirm Password</label>

        <input
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-2 mt-1"
          type="password"
          name="confirmPassword"
          placeholder="********"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-3">{errors.confirmPassword}</p>
        )}

        {/* api error */}
        {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg text-sm font-semibold mb-5 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 font-semibold">
            Log In
          </Link>
        </p>
      </form>
    </main>
  );
}
