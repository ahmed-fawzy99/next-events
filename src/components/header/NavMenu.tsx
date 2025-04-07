import React from 'react';
import AuthHeaderStatus from "@/components/header/AuthHeaderStatus";
import Link from "next/link";

export default async function NavMenu() {
    return (
        <header>
            <nav className={`container mx-auto content-box flex justify-between items-center h-20 mb-4 mt-2`}>
                <h1><Link href="/">Event calendar</Link></h1>
                <AuthHeaderStatus/>
            </nav>
        </header>

)
}