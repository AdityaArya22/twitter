import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userStatus = useSelector(state => state.auth.status);

  const navItems = [
    { name: "Home", link: "/", status: userStatus },
    { name: "login", link: "/login", status: !userStatus },
    { name: "signup", link: "/signup", status: !userStatus },
    { name: "profile", link: "/profile", status: userStatus },
    { name: "add-post", link: "/add-post", status: userStatus },
  ];

  return (
    <nav className="w-full lg:fixed lg:h-screen lg:w-[20%] flex lg:flex-col justify-between p-7 lg:py-20 items-center bg-gradient-to-b from-slate-800 to-slate-900 text-white">
      <div className="logo text-xl">Logo</div>
      <div className="nav-items px-4 flex lg:flex-col gap-5">
        {navItems.map((item) => 
          item.status && (
            <Link to={item.link} key={item.name}>
              <div className="text-xl cursor-pointer capitalize">{item.name}</div>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
