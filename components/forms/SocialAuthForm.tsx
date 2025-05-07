"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
// If using client, next-auth/react import
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const authButtonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer";

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        // redirect: false,
      });
    } catch (error) {
      console.log(error);
      toast("Sign-in Failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className={authButtonClass}
        onClick={() => handleSignIn("google")}
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className=" mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
      <Button
        className={authButtonClass}
        onClick={() => handleSignIn("github")}
      >
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with Github</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
