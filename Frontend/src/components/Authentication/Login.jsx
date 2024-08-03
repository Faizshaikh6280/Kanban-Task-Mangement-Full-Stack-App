import React, { useState } from 'react';
import Logo from '../../ui/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/api/useLogin';
import { useAuthContext } from '../../contexts/AuthContext';

const initialState = { username: '', password: '' };

function Login() {
  const { setAuthuser } = useAuthContext();
  const [formData, setFormData] = useState(initialState);
  const { isLoging, loginMutation } = useLogin();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginMutation(formData, {
      onSuccess: (user) => {
        setAuthuser(user);
        setFormData(initialState);
        navigate('/');
      },
    });
  }

  return (
    <div className="flex items-center justify-center h-[100vh] w-full bg-custom-bg-main">
      <div className="container w-[400px]">
        <div className="header flex justify-between items-center">
          <Logo />
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="tite-input flex flex-col gap-3 mt-8">
            <label
              htmlFor="name"
              className="text-custom-text-1 font-semibold tracking-wider text-3xl"
            >
              Username
            </label>
            <input
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              id="username"
              className="border text-custom-text-2 border-custom-text-2 p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
            />
          </div>

          <div className="tite-input flex flex-col gap-3 mt-8">
            <label
              htmlFor="name"
              className="text-custom-text-1 font-semibold tracking-wider text-3xl"
            >
              Password
            </label>
            <input
              required
              name="password"
              onChange={handleChange}
              value={formData.password}
              type="password"
              id="name"
              className="border text-custom-text-2 border-custom-text-2 p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
            />
          </div>
          <div className="text-custom-text-2 flex items-center gap-2 mt-6">
            <p>Don't have an account?</p>
            <Link to="/signup" className="transition hover:text-primary">
              {' '}
              Signup
            </Link>
          </div>
          <button
            disabled={isLoging}
            className="px-4 py-4 rounded-full bg-primary w-full text-2xl cursor-pointer  mt-4 font-semibold bg-custom-text-2 text-slate-50"
          >
            {isLoging ? 'Loging...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
