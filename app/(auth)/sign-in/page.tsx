"use client";
import AuthForm from "@/components/forms/AuthForm";
import { signInSchema } from "@/lib/validations";
import React from "react";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={(data) => Promise.resolve({ succuess: true, data })}
    />
  );
};

export default SignIn;
