'use server';

import {auth} from "@/auth";
import z from 'zod';
import {prisma} from "@/prisma";

interface CreateNewEventFormState {
    errors: {
        title?: string[];
        description?: string[];
        date?: string[];
        location?: string[];
        color?: string[];
        _form?: string[];
    };
    values?: {
        title?: string;
        description?: string;
        date?: Date[];
        location?: string;
        color?: string;
    };
}

export async function createEvent(
    formState: CreateNewEventFormState,
    formData: FormData
): Promise<CreateNewEventFormState>
{
    console.log(FormData.prototype.getAll.call(formData, 'date'))
    const session = await auth();
    if (!session?.user?.id)
        return {errors: {_form: ['You must be logged in to create an event']}};

    const schema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        date: z.array(z.date()),
        location: z.string().min(3),
        color: z.string(),
    })

    const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        date: formData.get('date'),
        location: formData.get('location') as string,
        color: formData.get('color') as string,
    }
    console.log(formValues.date)

    const res = schema.safeParse(formValues);

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors,
            values: formValues,
        };
    }

    try {
        // Save event to database
        await prisma.event.create({
            data: {
                title: res.data.title,
                description: res.data.description,
                start: res.data.date,
                end: res.data.date,
                location: res.data.location,
                Etiquette: res.data.color,
                userId: session.user.id,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {_form: [error.message]},
                values: formValues,
            };
        } else {
            return {
                errors: {
                    _form: ['An unknown error occurred. Please try again.'],
                },
                values: formValues
            }
        }
    }

    return {
        errors: {},
    };
}
