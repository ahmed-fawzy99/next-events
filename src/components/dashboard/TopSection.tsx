'use client';
import MyEvents from "@/components/dashboard/MyEvents";
import ViewEvent from "@/components/dashboard/ViewEvent";
import CreateEvent from "@/components/dashboard/CreateEvent";
import {useState} from "react";
import type {Event} from "@prisma/client";

export default function TopSection({myEvents}: {myEvents: Event[]}) {
    const [selectedEvent, setSelectedEvent] = useState<Event|null>(null);

    return (
        <>
            <div id="my-events" className="content-box overflow-y-scroll relative !min-h-[60px]">
                <MyEvents onSelect={setSelectedEvent} myEvents={myEvents} eventLoadingState={false}
                          className="absolute inset-0 p-4 overflow-y-auto"/>
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 flex gap-4">
                <div className={`content-box ${selectedEvent ? 'col-span-1' : 'hidden'} relative max-sm:h-[400px]`}>
                    <ViewEvent event={selectedEvent} onClose={() => setSelectedEvent(null)}
                               className="absolute inset-0 p-4 overflow-y-auto"/>
                </div>
                <div className={`content-box ${selectedEvent ? 'col-span-1' : 'sm:col-span-2'}`}>
                    <CreateEvent mode={selectedEvent ? "edit" : "create"} event={selectedEvent}
                                 onEdit={() => setSelectedEvent(null)}/>
                </div>
            </div>
        </>
    );
}