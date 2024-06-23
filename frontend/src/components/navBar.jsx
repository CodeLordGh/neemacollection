import avatar from "../assets/smiling-face-with-heart-eyes.svg";
import logo from "../assets/NeemaCollection-color_black.svg";
const NavBar = () => {
  return (
    <div className="bg-[rgb(246,237,243)] text-white h-[72px] flex justify-between px-8">
      <div className="flex items-center">
        <img src={logo} alt="Store logo" className="h-full" />
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="h-8 text-[#251616] focus:outline-none rounded-md pl-2"
        />
        <img src={avatar} alt="profile picture" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default NavBar;