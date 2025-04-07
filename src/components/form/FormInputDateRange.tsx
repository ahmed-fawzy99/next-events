'use client';
import {Calendar} from "primereact/calendar";
import {useState} from "react";

interface FormInputTextProps {
    name: string;
    label: string;
    placeholder: string;
    defaultValue?: Date[];
    errors?: string[];
}
export default function FormInputDateRange({name, label, placeholder, defaultValue, errors}: FormInputTextProps) {
    const [dates, setDates] = useState<(Date | null)[] | null>(defaultValue ?? null);
    return (
    <div className="pv-form-input">
            <p className="label">{label}</p>
            <Calendar value={dates} onChange={(e) => setDates(e.value ?? null)} invalid={!!errors?.length}
                      id={name} name={name} aria-describedby={`${name}-help`} placeholder={placeholder}
                      selectionMode="range" readOnlyInput hideOnRangeSelection dateFormat="dd MM yy"/>
            {errors && <small className="text-red-500">{errors.join(', ')}</small>}
        </div>
    );
}