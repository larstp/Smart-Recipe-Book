import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { LoginFormData, LoginFormError } from '../types/loginForm';

export default function Login() {
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // Error state
  const [errors, setErrors] = useState<LoginFormError>({});

  // handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Validation logic
  function validate(): LoginFormError {
    const newErrors: LoginFormError = {};

    // email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // password validation
    if (formData.password.trim().length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    return newErrors;
  }

  // submit handler
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // if no errors
    if (Object.keys(validationErrors).length === 0) {
      // clear errors
      setErrors({});

      // reset form
      setFormData({
        email: '',
        password: '',
      });
    }
  }

  return (
    <main className="container mx-auto p-6">
      <img rel="icon" src="/loginpage.svg" className="" />
      <h1 className="text-2xl font-bold">Welcome Back</h1>
      <p className="text-gray-500">Log in to access your recipes</p>

      <form className="" onSubmit={handleSubmit}>
        {/* email */}
        <label>Email</label>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Example@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="">&#11205;{errors.email}</p>}
        </div>

        {/* password */}
        <label>Password</label>
        <div>
          <input
            type="password"
            name="password"
            placeholder="***"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="">&#11205;{errors.password}</p>}
        </div>

        {/* button */}
        <button className="" type="submit">
          Log In
        </button>

        <p className="">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}
