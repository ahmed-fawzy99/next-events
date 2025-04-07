'use client';
import type {Event} from "@prisma/client";
import {Button} from "primereact/button";
import {useActionState, useEffect} from "react";
import {deleteEvent} from "@/actions/event";

interface ViewEventProps {
    event: Event | null;
    onClose: () => void;
    className?: string;
}
export default function ViewEvent({event, onClose, className}: ViewEventProps) {
    const [formState, action, isPending] = useActionState(deleteEvent.bind(null, event?.id || ''), {
        errors: {}
    });

    useEffect(() => {
        if(!isPending && formState.message) {
            formState.message = '';
            onClose();
        }
    }, [formState, isPending, onClose]);
    if(event) {
        return (
            <div className={`${className}`}>
                <div className="flex justify-between items-center">
                    <h2 className="!mx-0 mb-2">Event <span className="italic">{event?.title}</span></h2>
                    <span className="pi pi-times cursor-pointer" onClick={() => onClose()}/>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto">
                    <h3 className={`font-semibold text-${event.Etiquette}-500`}>{event.title}</h3>
                    <p className="font-mono italic">{event.description}</p>
                    <p className="inline-flex gap-1 items-center">
                        <span className="pi pi-clock"/>
                        {event.location}
                    </p>
                    <div className="flex justify-between gap-2 text-[var(--text-color-secondary)] text-sm">

                        <p>{event.end ? 'Start' : 'Date'}: {event.start.toDateString()}</p>

                        {
                            event.end && (
                                <p>End: {event.end.toDateString()}</p>
                            )
                        }
                    </div>
                    <form action={action}>
                        <Button label={isPending ? 'Processing...' : 'Delete Event'} severity="danger" className="w-full" type="submit" icon="pi pi-trash" disabled={isPending} />
                        {formState.errors?._form && (
                            <small className="text-red-500">{formState.errors._form.join(', ')}</small>
                        )}
                    </form>
                </div>

            </div>
        );
    }
}