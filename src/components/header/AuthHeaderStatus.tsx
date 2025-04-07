'use client';
import Link from "next/link";
import {Avatar} from "primereact/avatar";
import React from "react";
import { useSession, signOut} from "next-auth/react";
import {Button} from "primereact/button";

export default function AuthHeaderStatus() {
    const { data: session, status } = useSession()
    let authContent: React.ReactNode = null
    if (session?.user) {
        authContent = (
            <div className="flex gap-2 items-center">
                <Button link onClick={() => signOut({ redirectTo: "/", redirect: true })} label="Sign Out" icon="pi pi-sign-out" className="!text-[var(--text-color)]"/>
                <div className="w-10 rounded-full overflow-hidden flex items-center">
                    <Avatar image={session.user.image || ""} shape="circle" style={{ aspectRatio: 1/1 }}/>
                </div>
            </div>
        )
    } else {
        authContent = (
            <Link href="/auth" className="p-button font-bold flex gap-2 items-center font-semibold">
            <span className="pi pi-sign-in !hidden sm:!block"/>
            <span>Sign In</span>
        </Link>
        )
    }
    return (
        <div className="flex items-center gap-2">
            {status === 'loading' ? '' : authContent}
        </div>
    );

}