import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-[#2a2a2a] px-6 md:px-10 py-4 bg-charcoal/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3 text-primary">
        <div className="size-9 flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl text-white shadow-lg shadow-purple-500/30">
          <span className="material-symbols-outlined">rocket_launch</span>
        </div>
        <h2 className="text-white text-lg md:text-xl font-extrabold leading-tight tracking-tight">
          CareerViewX
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-gray-300 text-sm font-semibold leading-normal hover:text-purple-400 transition-colors relative group"
            href="#"
          >
            Careers
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
          </a>
          <a
            className="text-gray-300 text-sm font-semibold leading-normal hover:text-purple-400 transition-colors relative group"
            href="#"
          >
            Resources
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
          </a>
          <a
            className="text-gray-300 text-sm font-semibold leading-normal hover:text-purple-400 transition-colors relative group"
            href="#"
          >
            Mentors
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-5 border border-purple-500 text-purple-400 text-sm font-bold hover:bg-purple-500/10 transition-all"
            onClick={()=> navigate("/login")}>
            <span>Log In</span>
          </button>
          <button className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
            <span>Join Free</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
