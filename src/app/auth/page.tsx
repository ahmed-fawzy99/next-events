import React from "react";
import OAuthBtn from "@/components/auth/OAuthBtn";

export default function Auth() {
    return (
        <div className="flex sm:h-full sm:items-center ">
            <div className="flex flex-col max-sm:items-center max-sm:w-full sm:w-xl flex flex-col gap-4 mx-auto p-6 shadow-2 border-round bg-[var(--surface-card)] rounded-lg">
                <h1 className="text-2xl font-semibold text-neutral-100 mb-4 text-center">
                    Continue with your account
                </h1>
                <div className="w-full grid grid-cols-1 gap-4 ">
                    <OAuthBtn provider="github" iconClass="pi-github" />
                    <OAuthBtn provider="google" iconClass="pi-google" />
                </div>
            </div>
        </div>
    );
}