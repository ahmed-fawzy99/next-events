import React from 'react';
import AuthHeaderStatus from "@/components/header/AuthHeaderStatus";
import Link from "next/link";

export default async function NavMenu() {
    return (
        <header>
            <nav className={`container mx-auto content-box flex justify-between items-center h-20 mb-6`}>
                <h1 className="text-xl font-semibold text-[var(--text-color)] ms-2"><Link href="/">Event calendar</Link></h1>
                <AuthHeaderStatus/>
            </nav>
        </header>

)
}