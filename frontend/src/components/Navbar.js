import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      {/* <div className="bg-red-700 text-white p-5">
        <p>You need to log in or sign up before continuing.</p>
      </div>
      <div className="bg-green-400 text-white p-5">
        <p>Signed in successfully.</p>
      </div> */}
      <nav>
        <ul className="flex justify-end p-5">
          {/* <li className="mr-4">
          <Link to="/login" className="flex justify-center rounded-md bg-violet-800 p-2 lg:p-1 text-white w-28 lg:leading-9">Post a job</Link>
        </li> */}
          <li className="mr-4">
            <Link to="/login">Log in</Link>
          </li>
          <li className="mr-4">
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <span>Log out</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
