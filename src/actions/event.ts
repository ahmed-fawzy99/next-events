'use server';

import {auth} from "@/auth";
import z from 'zod';
import {prisma} from "@/prisma";
import type {Event} from "@prisma/client";
import {revalidatePath} from "next/cache";


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
        date?: (Date | null)[] | null;
        location?: string;
        color?: string;
    };
    message?: string;
}

export async function createEvent(
    dateRange: (Date | null)[] | null,
    formState: CreateNewEventFormState,
    formData: FormData
): Promise<CreateNewEventFormState>
{
    const session = await auth();
    if (!session?.user?.id)
        return {errors: {_form: ['You must be logged in to create an event']}};

    const schema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        date: z.array(z.date()),
        location: z.string().min(2),
        color: z.string(),
    })

    dateRange = dateRange?.filter((date) => date !== null) || null;

    const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        date: dateRange,
        location: formData.get('location') as string,
        color: formData.get('color') as string,
    }
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
                start: res.data.date[0],
                end: res.data.date[1] ?? null,
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

    revalidatePath(`/dashboard`);

    return {
        errors: {},
        message: 'Event created successfully',
    };
}


export async function editEvent(
    eventId: string,
    dateRange: (Date | null)[] | null,
    formState: CreateNewEventFormState,
    formData: FormData
): Promise<CreateNewEventFormState>
{
    const session = await auth();
    if (!session?.user?.id)
        return {errors: {_form: ['You must be logged in to create an event']}};

    const schema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        date: z.array(z.date()),
        location: z.string().min(2),
        color: z.string(),
    })

    dateRange = dateRange?.filter((date) => date !== null) || null;

    const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        date: dateRange,
        location: formData.get('location') as string,
        color: formData.get('color') as string,
    }
    const res = schema.safeParse(formValues);

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors,
            values: formValues,
        };
    }

    try {
        // Save event to database
        await prisma.event.update({
            where: {
                id: eventId,
            },
            data: {
                title: res.data.title,
                description: res.data.description,
                start: res.data.date[0],
                end: res.data.date[1] ?? null,
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

    revalidatePath(`/dashboard`);

    return {
        errors: {},
        message: 'Event updated successfully',
    };
}

export async function deleteEvent(
    eventId: string,
    // formState: CreateNewEventFormState,
    // formData: FormData
): Promise<CreateNewEventFormState>
{
    const session = await auth();
    if (!session?.user?.id)
        return {errors: {_form: ['You must be logged in to delete an event']}};

    try {
        await prisma.event.delete({
            where: {
                id: eventId,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {_form: [error.message]},
            };
        } else {
            return {
                errors: {
                    _form: ['An unknown error occurred. Please try again.'],
                },
            }
        }
    }

    revalidatePath(`/dashboard`);

    return {
        errors: {},
        message: 'Event deleted successfully',
    };
}


export async function getMyEvents(): Promise<Event[]> {
    const session = await auth();
    if (!session?.user?.id)
        return [];

    return prisma.event.findMany({
        where: {
            userId: session.user.id ,
        },
        orderBy: {
            start: 'desc',
        },
    });
}