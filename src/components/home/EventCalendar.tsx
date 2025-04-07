import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import type {Event} from "@prisma/client";

interface EventCalendarProps {
    numberOfMonths?: number;
    myEvents?: Event[];
}

export  default function EventCalendar({numberOfMonths = 2, myEvents}: EventCalendarProps) {
    const [date, setDate] = useState<Date|null>(null);

    const dateTemplate = (date: { day: number, month: number, year: number }) => {
        if (!myEvents || myEvents.length === 0) {
            return date.day;
        }

        const eventsForTheDay = myEvents.filter(event => {
            const eventStart = new Date(event.start);
            const eventEnd = event.end ? new Date(event.end) : eventStart;

            const eventDayMatches = eventStart.getDate() <= date.day && eventEnd.getDate() >= date.day;
            const eventMonthMatches = eventStart.getMonth() === date.month;
            const eventYearMatches = eventStart.getFullYear() === date.year;

            return eventDayMatches && eventMonthMatches && eventYearMatches;
        });

        if (eventsForTheDay.length > 0) {
            const eventEtiquette = eventsForTheDay[0].Etiquette; // Get the Etiquette of the first event
            return (
                <strong>
                    {date.day} <sup className={`text-${eventEtiquette}-500`}>({eventsForTheDay.length})</sup>
                </strong>
            );
        }

        return date.day;
    };

    return (
        <div className="!w-full">
            <Calendar inline numberOfMonths={ numberOfMonths }
                      className="!w-full" value={date} onChange={(e) => setDate(e.value ?? null)} dateTemplate={dateTemplate} />
        </div>
    )
}