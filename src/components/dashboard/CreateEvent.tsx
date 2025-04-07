'use client';
import {createEvent} from "@/actions/event";
import FormInputText from "@/components/form/FormInputText";
import FormInputTextArea from "@/components/form/FormInputTextArea";
import {Button} from "primereact/button";
import FormInputDateRange from "@/components/form/FormInputDateRange";
import FormEtiquetteText from "@/components/form/FormEtiquetteText";
import {useActionState, useState} from "react";

export default function CreateEvent({mode = "create"}: {mode?: "create" | "edit"}) {
    const actionText = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Event`
    const [dates, setDates] = useState<(Date | null)[] | null>(defaultValue ?? null);

    const [formState, action, isPending] = useActionState(createEvent, {
        errors: {}
    });
    return (
        <div className="px-2 py-4">
            <h1 className="!mx-0 mb-2">{actionText}</h1>
            <form action={action}>
                <div className="flex flex-col gap-4 items-end">
                    <FormInputText name="title" label="Title" placeholder="Title" errors={formState.errors.title} defaultValue={formState.values?.title}/>
                    <FormInputTextArea name="description" label="Description" placeholder="Description" errors={formState.errors?.description} defaultValue={formState.values?.description}/>
                    <FormInputDateRange name="date" label="Date (Range)" placeholder="Selet Date(s)" errors={formState.errors?.date}  defaultValue={formState.values?.date}/>
                    <FormInputText name="location" label="Location" placeholder="Location" errors={formState.errors?.location}  defaultValue={formState.values?.location}/>
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