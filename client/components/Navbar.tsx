import Link from "next/link";
import React from "react";
import { NavItem } from "@/types/strapi";
import UserMenu from "./UserMenu"; // import the client component

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
  return (
    <nav className="bg-background border-b shadow-md">
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

        {/* Client component that reacts to auth changes */}
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
