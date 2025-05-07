import SocialAuthForm from "@/components/forms/SocialAuthForm";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light dark:bg-auth-dark bg-cover bg-center bg-no-repeat px-5 py-10">
      <section className="light-border background-light800_dark200 shadow-light-100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark-100_light900">
              Join Blue<span className="text-primary-500">dit</span>
            </h1>
            <p className="paragraph-regular text-dark500_light400">
              Ask for help and help others
            </p>
          </div>
        </div>
        {children}
        {/* TODO: Add social authentication */}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
