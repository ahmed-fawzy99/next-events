'use client';
import type {Event} from "@prisma/client";

interface ViewEventProps {
    event: Event | null;
    onClose: () => void;
}
export default function ViewEvent({event, onClose}: ViewEventProps) {
    if(event) {
        return (
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="!mx-0 mb-2">Event <span className="italic">{event?.title}</span></h2>
                    <span className="pi pi-times cursor-pointer" onClick={() => onClose()}/>
                </div>

            </div>
        );
    }
}