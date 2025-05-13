"use client";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  const userId = 1;

  return (
    <>
      {sidebarLinks.map((item) => {
        const isExternal =
          item.route.startsWith("http") || item.route.startsWith("www.");
        const isActive =
          (!isExternal &&
            pathname.includes(item.route) &&
            item.route.length > 1) ||
          (!isExternal && pathname === item.route);

        let route = item.route;

        // Append userId for profile
        if (item.route === "/profile" && userId) {
          route = `${item.route}/${userId}`;
        }

        const linkContent = (
          <>
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-bold text-primary-500",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </>
        );

        const LinkComponent = isExternal ? (
          <a
            href={route.startsWith("http") ? route : `https://${route}`}
            key={item.label}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            {linkContent}
          </a>
        ) : (
          <Link
            href={route}
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-3"
            )}
          >
            {linkContent}
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.label}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.label}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};
export default NavLinks;
