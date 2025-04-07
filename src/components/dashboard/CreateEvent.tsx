'use client';
import {createEvent, editEvent} from "@/actions/event";
import FormInputText from "@/components/form/FormInputText";
import FormInputTextArea from "@/components/form/FormInputTextArea";
import {Button} from "primereact/button";
import FormInputDateRange from "@/components/form/FormInputDateRange";
import FormEtiquetteText from "@/components/form/FormEtiquetteText";
import {useActionState, useEffect, useState} from "react";
import Swal from 'sweetalert2'
import type {Event} from "@prisma/client";

interface CreateEventProps {
    mode?: "create" | "edit";
    event?: Event | null;
    onEdit?: () => void;
}

export default function CreateEvent({mode = "create", event, onEdit}: CreateEventProps) {
    const isEditMode = mode === "edit";
    const actionText = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Event`
    const [dates, setDates] = useState<(Date | null)[] | null>(null);

    const actionFn = isEditMode ? editEvent.bind(null, event?.id || '', dates,) : createEvent.bind(null, dates);
    const [formState, action, isPending] = useActionState(actionFn, {
        errors: {}
    });

    if (isEditMode && event) {
        formState.values = {
            title: event.title,
            description: event.description,
            date: [new Date(event.start), event.end ? new Date(event.end) : null],
            location: event.location,
            color: event.Etiquette
        };
    }

    useEffect(() => {
        if (isEditMode && event) {
            setDates([
                new Date(event.start),
                event.end ? new Date(event.end) : null
            ]);
        }
    }, [isEditMode, event]);

    useEffect(() => {
        if(!isPending && formState.message) { // Handle success
            Swal.fire({
                icon: 'success',
                title: isEditMode ? 'Event updated successfully' : 'Event created successfully',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                theme: 'dark',
            });
            if (isEditMode && onEdit) {
                onEdit();
            }
        } else { // Error
            setDates(formState.values?.date ?? null);
        }
    }, [formState, isPending]);

    return (
        <div>
            <h2 className="!mx-0 mb-2">{actionText}</h2>
            <form action={action}>
                <div className="flex flex-col gap-4 items-end">
                    <FormInputText name="title" label="Title" placeholder="Title" errors={formState.errors.title} defaultValue={formState.values?.title}/>
                    <FormInputTextArea name="description" label="Description" placeholder="Description" errors={formState.errors?.description} defaultValue={formState.values?.description}/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        <FormInputDateRange name="date" label="Date (Range)" placeholder="Selet Date(s)" errors={formState.errors?.date}  defaultValue={dates} setDates={setDates}/>
                        <FormInputText name="location" label="Location" placeholder="Location" errors={formState.errors?.location}  defaultValue={formState.values?.location}/>
                    </div>
                    <FormEtiquetteText  errors={formState.errors?.color}  defaultValue={formState.values?.color}/>
                    {formState.errors?._form && (
                        <small className="text-red-500">{formState.errors._form.join(', ')}</small>
                    )}
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? 'Processing...' : actionText}
                    </Button>
                </div>

            </form>
        </div>
    );
}