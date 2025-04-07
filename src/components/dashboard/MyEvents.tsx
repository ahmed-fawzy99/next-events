'use client';

import {getMyEvents} from "@/actions/event";
import type {Event} from "@prisma/client";
import {useEffect, useState} from "react";

export default function MyEvents({onSelect}: {onSelect: (event: Event | null) => void}) {
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyEvents = async () => {
            setMyEvents(await getMyEvents());
        };
        try {
            fetchMyEvents().then();
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="">
            <h2 className="!mx-0 mb-2">My Events</h2>
            {loading && <div>Loading...</div>}
            {!loading && myEvents.length === 0 &&
                <div className="text-[var(--text-color-secondary)]">No events found.</div>
            }
            {!loading && myEvents.length > 0 && (
                <div className="flex flex-col gap-2 overflow-hidden">
                    {myEvents.map((event) => (
                        <div key={event.id} onClick={() => onSelect(event)}
                             className="px-3 py-1.5 border-2 border-[var(--surface-border)] rounded-xl flex flex-col gap-1 cursor-pointer">
                            <h3 className={`font-semibold text-${event.Etiquette}-500`}>{event.title}</h3>
                            <p className="font-mono italic">{event.description}</p>
                            <div className="flex justify-between gap-2 text-[var(--text-color-secondary)] text-sm">
                                <p className="inline-flex gap-1 items-center">
                                    <span className="pi pi-clock" />
                                    {event.location}
                                </p>
                                <p>{event.start.toDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}