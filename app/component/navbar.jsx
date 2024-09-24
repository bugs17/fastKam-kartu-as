import Image from "next/image";
import React from "react";
import Logo from '../asset/img/newlogo.png'
import Logo2 from '../asset/img/logoonly.png'
import Link from "next/link";
import ListMenuNav from "./list-menu-navbar";

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-[#382c64] rounded-lg">
                <div className="navbar-start">
                    {/* <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                    </div> */}
                    <Link href={'/'} className="hidden md:block">
                        <Image alt="Logo" src={Logo} height={100} width={100} />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ListMenuNav />
                </div>
                <div className="navbar-end">
                    <ul className="menu menu-horizontal px-1">
                        <li className="text-xs text-slate-400">Made with 💜</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
