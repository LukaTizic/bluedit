import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FAQ = [
  { _id: "1", title: "How is you 1?" },
  { _id: "2", title: "How is you 2?" },
  { _id: "3", title: "How is you 3?" },
];

const RightSidebar = () => {
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-lg:hidden">
      <div>
        <h3 className="h3-bold text-dark-200_light900">FAQ</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {FAQ.map(({ _id, title }) => (
            <Link
              key={_id}
              className="flex cursor-pointer items-center justify-between gap-7"
              href={ROUTES.PROFILE(_id)}
            >
              <p className="body-medium text-dark500_light700">{title}</p>

              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
