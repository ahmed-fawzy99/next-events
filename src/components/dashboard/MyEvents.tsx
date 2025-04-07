'use client';

import type {Event} from "@prisma/client";

interface MyEventsProps {
    onSelect: (event: Event | null) => void;
    className?: string;
    myEvents: Event[];
    eventLoadingState?: boolean;
}

export default function MyEvents({onSelect, className, myEvents, eventLoadingState}: MyEventsProps) {


    return (
        <div className={className}>
            <h2 className="!mx-0 mb-2">My Events</h2>
            {eventLoadingState && <div>Loading...</div>}
            {!eventLoadingState && myEvents.length === 0 &&
                <div className="text-[var(--text-color-secondary)]">No events found.</div>
            }
            {!eventLoadingState && myEvents.length > 0 && (
                <div className="flex flex-col gap-2 overflow-hidden">
                    {myEvents.map((event) => (
                        <div key={event.id} onClick={() => onSelect(event)}
                             className="px-3 py-1.5 border-2 border-[var(--surface-border)] rounded-xl flex flex-col gap-1 cursor-pointer">
                            <h3 className={`font-semibold text-${event.Etiquette}-500`}>{event.title}</h3>
                            <p className="font-mono italic">{event.description.slice(0, 40)}</p>
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