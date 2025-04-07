'use client';
import {createEvent} from "@/actions/event";
import FormInputText from "@/components/form/FormInputText";
import FormInputTextArea from "@/components/form/FormInputTextArea";
import {Button} from "primereact/button";
import FormInputDateRange from "@/components/form/FormInputDateRange";
import FormEtiquetteText from "@/components/form/FormEtiquetteText";
import {useActionState, useEffect, useState} from "react";
import Swal from 'sweetalert2'

export default function CreateEvent({mode = "create"}: {mode?: "create" | "edit"}) {
    const actionText = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Event`
    const [dates, setDates] = useState<(Date | null)[] | null>(null);

    const [formState, action, isPending] = useActionState(createEvent.bind(null, dates), {
        errors: {}
    });

    useEffect(() => {
        if(!isPending && formState.message) { // Handle success
            Swal.fire({
                icon: 'success',
                title: 'Your event has been created',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                theme: 'dark',
            });
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