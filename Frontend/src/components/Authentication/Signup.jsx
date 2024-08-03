import React, { useState } from 'react';
import Logo from '../../ui/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/api/useSignup';
import { useAuthContext } from '../../contexts/AuthContext';

const initialState = {
  username: '',
  password: '',
  email: '',
};

function Signup() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { setAuthuser } = useAuthContext();
  const { isSigning, signupMutation } = useSignup();
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    signupMutation(formData, {
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
              htmlFor="username"
              className="text-custom-text-1 font-semibold tracking-wider text-3xl"
            >
              Username
            </label>
            <input
              required
              type="text"
              placeholder="e.g Faiz Alam"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border text-custom-text-2 border-custom-text-2 p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
            />
          </div>
          <div className="tite-input flex flex-col gap-3 mt-8">
            <label
              htmlFor="email"
              className="text-custom-text-1 font-semibold tracking-wider text-3xl"
            >
              Email
            </label>
            <input
              required
              type="email"
              placeholder="e.g example@gmail.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border text-custom-text-2 border-custom-text-2 p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
            />
          </div>

          <div className="tite-input flex flex-col gap-3 mt-8">
            <label
              htmlFor="password"
              className="text-custom-text-1 font-semibold tracking-wider text-3xl"
            >
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="name"
              className="border text-custom-text-2 border-custom-text-2 p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
            />
          </div>
          <div className="text-custom-text-2 flex items-center gap-2 mt-6">
            <p>Already have an account?</p>
            <Link to="/login" className="transition hover:text-primary">
              Login
            </Link>
          </div>
          <button className="px-4 py-4  rounded-full bg-primary w-full text-2xl cursor-pointer  mt-4 font-semibold bg-custom-text-2 text-slate-50">
            {isSigning ? 'Signing..' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
