'use client';
import {redirect} from "next/navigation";
import { useSession } from "next-auth/react"
import {useEffect, useState} from "react";
import CreateEvent from "@/components/dashboard/CreateEvent";
import EventCalendar from "@/components/home/EventCalendar";
import MyEvents from "@/components/dashboard/MyEvents";
import type {Event} from "@prisma/client";
import ViewEvent from "@/components/dashboard/ViewEvent";
import {getMyEvents} from "@/actions/event";

export default function Dashboard() {
    const { data: session } = useSession()
    if (!session?.user?.email) {
        redirect('/auth')
    }
    const [selectedEvent, setSelectedEvent] = useState<Event|null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    // loading events and checking for mobile
    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);

        const fetchMyEvents = async () => {
            setMyEvents(await getMyEvents());
        };
        try {
            fetchMyEvents().then(()=> setLoading(false));
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false)
        }
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <section className="grid grid-cols-3 gap-4">
                <div className="content-box overflow-y-scroll relative">
                    <MyEvents onSelect={setSelectedEvent} myEvents={myEvents} eventLoadingState={loading}
                              className="absolute inset-0 p-4 overflow-y-auto"/>
                </div>
                <div className="col-span-2 grid grid-cols-2 flex gap-4">
                    <div className={`content-box ${selectedEvent ? 'col-span-1' : 'hidden'} relative`}>
                        <ViewEvent event={selectedEvent} onClose={() => setSelectedEvent(null)} className="absolute inset-0 p-4 overflow-y-auto"/>
                    </div>
                    <div className={`content-box col-span-${selectedEvent ? '1' : '2'}`}>
                        <CreateEvent mode="create"/>
                    </div>
                </div>
            </section>

            <section className="flex">
                <div className="content-box w-full">
                    <EventCalendar numberOfMonths={isMobile ? 1 : 2} myEvents={myEvents}/>
                </div>
            </section>
        </div>
    );
}