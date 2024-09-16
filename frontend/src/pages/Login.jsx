import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../operations/authApi';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
      <div className="w-full max-w-md mt-8 mb-16">
        <div className="flex flex-col max-md:flex-col items-center shadow-sm shadow-slate-500 rounded-3xl p-6 bg-white">
          {/* Form section */}
          <div className="flex flex-col items-center w-full">
            <div className="text-slate-700 text-2xl font-bold leading-10 tracking-normal mb-6">
              Login
            </div>
            <div className="flex flex-col items-stretch w-full">
              <input
                className="w-full text-zinc-400 text-base leading-6 mb-5 border border-[#E5E5E5] pl-2 py-3 rounded-md"
                type="email"
                placeholder="Email *"
                name="email"
                onChange={onChange}
              />
              <div className="relative mb-5">
                <input
                  className="w-full text-zinc-400 text-base leading-6 border border-[#E5E5E5] pr-10 pl-2 py-3 rounded-md"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  name="password"
                  onChange={onChange}
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                    >
                      <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
                      <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
                    </svg>
                  )}
                </span>
              </div>
              <button
                type="button"
                className="w-full text-white text-sm font-bold tracking-normal bg-[#1b2556e7] hover:bg-[#232752] duration-300 py-3 rounded-xl"
                onClick={onSubmit}
              >
                Login
              </button>
              <div className="text-center mt-4  font-semibold">
                <span className="text-lg">Don't have an account?</span>
                <Link
                  to="/signup"
                  className="text-blue-900 font-bold ml-2"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          {/* End of form section */}
        </div>
      </div>
    </div>
  );
}

export default Login;
