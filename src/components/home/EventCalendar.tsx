import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';


export  default function EventCalendar({numberOfMonths = 2}: {numberOfMonths?: number}) {
    const [date, setDate] = useState<Date|null>(null);

    const dateTemplate = (date: {day: number, month: number, year: number}) => {
        if (date.day > 10 && date.day < 15) {
            return (
                <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
            );
        }

        return date.day;
    }

    return (
        <div className="!w-full">
            <Calendar inline numberOfMonths={ numberOfMonths }
                      className="!w-full" value={date} onChange={(e) => setDate(e.value ?? null)} dateTemplate={dateTemplate} />
        </div>
    )
}