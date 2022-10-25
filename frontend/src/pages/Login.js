import { Fragment } from "react";
import { Link } from "react-router-dom";

// components
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="p-5">
        <div className="w-full max-w-xs mx-auto">
          <form className="border-b-2 py-3">
            <h1 className="text-xl mb-4">Log in</h1>
            <div className="mb-4">
              <label className="block mb-2">
                <input
                  className="appearance-none block w-full bg-white border border-gray-400 rounded-md p-3 mb-3 focus:outline-none focus:border-gray-700"
                  type="email"
                  placeholder="Email"
                  autoFocus
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                <input
                  className="appearance-none block w-full bg-white border border-gray-400 rounded-md p-3 mb-3 focus:outline-none focus:border-gray-700"
                  type="password"
                  placeholder="Password"
                />
              </label>
            </div>
            <div>
              <button className="bg-violet-800 text-white px-3 py-2 rounded-md">
                Log in
              </button>
            </div>
          </form>
          <div className="mt-2 mb-3">
            <Link to="" className="text-sm text-violet-800 hover:underline">Sign up</Link>
            <br />
            <Link to="" className="text-sm text-violet-800 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
