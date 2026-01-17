import { FiSearch, FiBell } from "react-icons/fi";
import avatar from "../../assets/avatar.png";

const Topbar = () => {
  return (
    <div className="w-full h-16 px-6 flex items-center justify-between bg-gradient-to-r from-[#1f1b2e] to-[#2a2340] rounded-xl shadow-md">

      {/* LEFT ICON */}
      <div className="text-white text-xl cursor-pointer">
        ❮
      </div>

      {/* CENTER TITLE */}
      <h1 className="text-white font-medium text-lg">
        Home
      </h1>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">

        {/* SEARCH BAR */}
        <div className="flex items-center bg-[#3a3456] px-4 py-2 rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-white placeholder-gray-300 w-32"
          />
          <FiSearch className="text-gray-300 ml-2" />
        </div>

        {/* NOTIFICATION */}
        <FiBell className="text-white text-xl cursor-pointer" />

        {/* AVATAR */}
        <img
          src={avatar}
          alt="User Avatar"
          className="w-9 h-9 rounded-full object-cover cursor-pointer border border-white/30"
        />
      </div>
    </div>
  );
};

export default Topbar;
