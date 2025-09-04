// src/components/Navbar.tsx
import Link from "next/link";
import React from "react";
import Logout from "./Logout";
import { createClient } from "@/utils/supabase/server";
import { NavItem } from "@/types/strapi";
// Props to receive global data from Strapi
interface NavbarProps {
  navbar: {
    navItems: NavItem[];
    banner: {
      header: {
        navItems: NavItem[];
      };
    };
  };
}

const Navbar = async ({ navbar }: NavbarProps) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <nav className="bg-background border-b shadow-md ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link className="font-bold text-xl text-blue-600 hover:text-blue-800" href="/">
          Home
        </Link>

        <div className="flex space-x-6">
          <Link href="/private" className="text-l text-gray-700 hover:text-blue-600">Private</Link>
        </div>

        <div className="flex items-center gap-x-5">
          {navbar.navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              className={`text-l text-gray-700 hover:text-blue-600 ${item.isButtonLink ? "bg-blue-600 text-white px-4 py-2 rounded-sm" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div> 

        <div className="flex items-center gap-x-5">
          {!user ? (
            <Link href="/login">
              <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm hover:bg-blue-700">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="text-sm text-gray-700">{user?.email}</div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


