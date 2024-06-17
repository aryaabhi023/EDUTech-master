import React, { useState } from "react";
import logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Problems",
      slug: "/problems",
      active: true,
    },
    {
      name: "POTD",
      slug: "/potd",
      active: true,
    },
    {
      name: "Courses",
      slug: "/courses",
      active: true,
    },
    {
      name: "Leaderboard",
      slug: "/leaderboard",
      active: true,
    },
  ];

  const buttons = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  const adminOptions = [
    {
      name: "Upload Problem",
      slug: "/upload-problem",
    },
    {
      name:"Upload Chapter",
      slug: "/upload-chapter",
    },
    {
      name:"Create Course",
      slug: "/create-course",
    }
  ];

  return (
    <div>
      <nav className="bg-zinc-100 dark:bg-zinc-600 shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <img className="h-8 w-auto rounded-md" src={logo} alt="Logo" />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navItems.map((item) => (
                    <Link
                      to={item.slug}
                      className={
                        "text-zinc-700 dark:text-zinc-300 hover:text-green-600"
                      }
                      key={item.name}
                    >
                      {item.name}
                    </Link>
                  ))}
                   {authStatus && userData?.isAdmin && (
                 <ul className="flex space-x-4">
                 <li className="relative group">
                   <a href="#" className="text-zinc-700 dark:text-zinc-300 hover:text-green-600">Admin<span className="inline-block transform group-hover:rotate-180">&#9662;</span></a>
                   <ul className="absolute left-0 mt-2 w-56 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     {adminOptions.map((item) => (
                      <li className="border-b border-zinc-200 dark:border-zinc-700" key={item.slug}>
                      <Link to={item.slug} className="block px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">{item.name}<span className="float-right">&#9656;</span></Link>
                    </li>
                     ))}
                   </ul>
                 </li>
                 
               </ul>
              )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {!authStatus &&
                buttons.map((item) => (
                  <button
                    key={item.name}
                    className="ml-3 bg-zinc-800 p-1 rounded text-zinc-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white"
                    onClick={() => {
                      navigate(item.slug);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              {authStatus && (
                <div key="logout">
                  <LogoutBtn />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}