import Link from "next/link";
import React from "react";
import LandingImg from "@/components/home/LandingImg";

export default async function Home() {
    return (
        <div className="content-box grid grid-cols-1 md:grid-cols-2 max-md:text-center items-center gap-8 !md:p-12 ">
            <div className="flex justify-center">
                <div
                    className="flex flex-col gap-4 max-w-xl text-neutral-800 dark:text-neutral-200 max-md:items-center p-8">
                    <h1 className="!text-3xl font-medium">
                        Plan your events with ease
                    </h1>
                    <LandingImg className="flex md:hidden w-full"/>
                    <p className="text-pretty">
                        Schedule and manage your events effortlessly! Stay organized and never miss an important date again.
                    </p>
                    <Link href="/dashboard"
                          className="flex gap-2 items-center px-4 py-2 bg-[var(--primary-color)] hover:bg-primary-600
                            text-white rounded-md font-semibold w-fit transition-colors ease-in-out duration-100">
                        <span>Get Started</span>
                        <span className="pi pi-arrow-right"/>
                    </Link>
                </div>
            </div>
            <LandingImg className="hidden md:flex "/>
        </div>
    );
}
