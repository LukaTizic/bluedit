// signout on server import
import { auth } from "@/auth";
import React from "react";

const Home = async () => {
  const session = await auth();

  return (
    <>
      <h1 className="h1-bold text-white">Hello</h1>
    </>
  );
};

export default Home;
