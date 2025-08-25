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
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          <Link href="/private">Private</Link>
        </div>

        <div className="flex items-center gap-x-5">
          {navbar.navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              className={item.isButtonLink ? "bg-blue-600 text-white px-4 py-2 rounded-sm" : ""}
            >
              {item.label}
            </Link>
          ))}
        </div> 

        <div className="flex items-center gap-x-5">
          {!user ? (
            <Link href="/login">
              <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">{user?.email}</div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


