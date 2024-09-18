"use client";

import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link';


const ListMenuNav = () => {
    const pathname = usePathname()

  return (
    <ul className="menu menu-horizontal px-1">
        <li ><Link className={pathname === '/' && 'active'} href={'/'}>Home</Link></li>
        <li className="md:mx-5"><Link className={pathname === '/settings' && 'active'} href={'/settings'}>Settings</Link></li>
        {/* <li><a>Logout</a></li> */}
    </ul>
  )
}

export default ListMenuNav