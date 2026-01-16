import React from "react";
import GraphImg from "../../assets/main-graph.png";
const Login = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* LEFT SIDE – LOGIN FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back <span className="inline-block">👋</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Today is a new day. It's your day. You shape it.  
            Sign in to start managing your projects.
          </p>

          {/* FORM */}
          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Example@email.com"
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="At least 8 characters"
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-violet-500 text-white py-3 rounded-lg font-semibold hover:bg-violet-400 transition"
            >
              Sign in
            </button>
          </form>

          {/* OR */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Sign in with Facebook</span>
            </button>
          </div>

          {/* SIGN UP */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t you have an account?
            <a href="#" className="text-blue-600 font-medium ml-1">
              Sign up
            </a>
          </p>

          <p className="text-xs text-gray-400 text-center mt-6">
            © 2023 ALL RIGHTS RESERVED
          </p>
        </div>

        {/* RIGHT SIDE – IMAGE */}
        <div className="hidden md:block relative">
          <img
            src={GraphImg}
            alt="Flowers"
            className="h-full w-full object-cover"
          />

          {/* MOBILE CARD PREVIEW (like your image) */}
          <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-4 w-72">
            <h3 className="font-semibold">Welcome Back 👋</h3>
            <p className="text-xs text-gray-500 mt-1">
              Today is a new day. Sign in to start managing your projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
