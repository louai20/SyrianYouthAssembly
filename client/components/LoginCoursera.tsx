/*"use client";

import React, { useTransition } from "react";
//import { FaGithub } from "react-icons/fa";

const LoginCoursera = () => {
  const [isPending, startTransition] = useTransition();

  const handleCourseraLogin = () => {
    startTransition(async () => {
      // await signInWithGithub();
    });
  };
  return (
    <div
      onClick={handleCourseraLogin}
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-gray-800 rounded-md p-4 flex justify-center items-center"
    >
      <FaGithub className="text-white" />
      <p className="text-white">
        {isPending ? "Redirecting..." : "Login with Github"}
      </p>
    </div>
  );
};

export default LoginCoursera;
 */