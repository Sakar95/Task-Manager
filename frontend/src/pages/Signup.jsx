import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signUp } from "../operations/authApi";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Password length validation
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setLoading(false); // Stop loading since there's an error
      return;
    }

    const { name, email, username, password } = formData;
    dispatch(signUp(name, username, email, password, navigate));

    // Reset form data
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center min-h-screen px-16 py-12 max-md:px-5">
      <div className="w-[500px] max-w-full mb-16">
        <div className="gap-5 flex max-md:flex-col max-md:items-center max-md:gap-0 shadow-sm shadow-slate-500 rounded-3xl">
          {/* Main form section */}
          <div className="flex flex-col items-center w-full p-6">
            <div className="w-full max-md:mt-10">
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <div className="flex-col overflow-hidden relative flex min-h-[300px] grow py-12 max-md:max-w-full">
                    <div className="text-slate-700 text-2xl font-bold leading-10 tracking-normal text-center mb-10">
                      Create an Account
                    </div>
                    <div className="flex flex-col items-center">
                      <input
                        className="w-72 text-zinc-400 text-base leading-6 mt-5 border border-[#E5E5E5] pl-2 py-3 rounded-md"
                        onChange={onChange}
                        type="text"
                        placeholder="Name"
                        name="name"
                      />
                      <input
                        className="w-72 text-zinc-400 text-base leading-6 mt-5 border border-[#E5E5E5] pl-2 py-3 rounded-md"
                        onChange={onChange}
                        type="email"
                        placeholder="Email"
                        name="email"
                      />
                      <input
                        className="w-72 text-zinc-400 text-base leading-6 mt-5 border border-[#E5E5E5] pl-2 py-3 rounded-md"
                        onChange={onChange}
                        type="text"
                        placeholder="Username"
                        name="username"
                      />
                      <div className="relative w-72">
                        <input
                          className="w-full text-zinc-400 text-base leading-6 mt-5 border border-[#E5E5E5] pr-10 pl-2 py-3 rounded-md"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password *"
                          name="password"
                          onChange={onChange}
                        />
                        <span
                          className="absolute top-1/2 right-4 transform cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {/* Password visibility toggle */}
                        </span>
                      </div>

                      {!loading && (
                        <button
                          className="w-52 text-white text-sm font-bold tracking-normal bg-[#4f8f5e] hover:bg-[#3b6a46] duration-300 mt-6 px-7 py-4 rounded-xl"
                          onClick={onSubmit}
                        >
                          Submit & Register
                        </button>
                      )}

                      {/* Conditionally render the loading spinner */}
                      {loading && <div className="mt-4">Loading...</div>}

                      {/* Login prompt below submit button */}
                      <div className="text-center mt-4 text-blue-800 font-semibold">
                        <span className="text-lg">Already have an account?</span>
                        <Link
                          to="/login"
                          className="text-blue-900 font-bold ml-2"
                        >
                          Sign In
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End of form section */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
