import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { setLogout } from "../store/authSlice";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps>= ({isLoggedIn}) => {
    const dispatch = useAppDispatch()
    const handleLogOut = ()=>{
        dispatch(setLogout())
    }

  return (
    <>
      <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
          <div className="relative flex items-center">
            <a href="/">
              <img
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F417622%2Ftodo&psig=AOvVaw0K4Z-ChacHrlmHoaUabCQF&ust=1755697851063000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPjf_6iCl48DFQAAAAAdAAAAABAE"
                loading="lazy"
                style={{ color: "transparent" }}
                width={32}
                height={32}
              />
            </a>
          </div>
          
          <div className="flex-grow" />
          <div className="hidden items-center justify-center gap-6 md:flex">
            {
                isLoggedIn ? (
                    <div>
                        <Link to={"/login"}
              className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
            >
              Sign in
            </Link>
            <Link to={"/register"}
              className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
            >
              Sign up for free
            </Link>
                    </div>
                )
             : (
                <>
                <Link to={"/register"}>
                <button onClick={handleLogOut} className="rounded-md bg-gradient-to-br from-red-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"></button>
                
                
              Logout
                    </Link>
                </>)}

          </div>
          <div className="relative flex items-center justify-center md:hidden">
            <button type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-auto text-slate-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
