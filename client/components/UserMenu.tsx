"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Logout from "./Logout";
import Link from "next/link";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return (
    <>
      {!user ? (
        <div className="flex gap-3">
          <Link href="/login">
            <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm hover:bg-blue-700 transition">
              Login
            </div>
          </Link>
          <Link href="/register">
            <div className="border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded-sm hover:bg-blue-50 transition">
              Register
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-x-3">
          <span className="text-sm text-gray-700">{user.email}</span>
          <Logout />
        </div>
      )}
    </>
  );
}
