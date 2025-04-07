'use client';
import {redirect} from "next/navigation";
import { useSession } from "next-auth/react"
import {useEffect, useState} from "react";
import CreateEvent from "@/components/dashboard/CreateEvent";
import EventCalendar from "@/components/home/EventCalendar";
import MyEvents from "@/components/dashboard/MyEvents";
import type {Event} from "@prisma/client";
import ViewEvent from "@/components/dashboard/ViewEvent";
// interface Event {
//     id: number;
//     title: string;
//     date: string;
// }

export default function Dashboard() {
    const { data: session } = useSession()
    if (!session?.user?.email) {
        redirect('/auth')
    }
    const [selectedEvent, setSelectedEvent] = useState<Event|null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <section className="grid grid-cols-3 gap-4">
                <div className="content-box  overflow-y-scroll">
                    <MyEvents onSelect={setSelectedEvent}/>
                </div>
                <div className="col-span-2 grid grid-cols-2 flex gap-4">
                    <div className={`content-box ${selectedEvent ? 'col-span-1' : 'hidden'}`}>
                        <ViewEvent event={selectedEvent} onClose={() => setSelectedEvent(null)}/>
                    </div>
                    <div className={`content-box col-span-${selectedEvent ? '1' : '2'}`}>
                        <CreateEvent mode="create"/>
                    </div>
                </div>
            </section>

            <section className="flex">
                <div className="content-box w-full">
                    <EventCalendar numberOfMonths={isMobile ? 1 : 2}/>
                </div>
            </section>
        </div>
    );
}