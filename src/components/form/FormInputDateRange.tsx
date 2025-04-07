'use client';
import {Calendar} from "primereact/calendar";

interface FormInputTextProps {
    name: string;
    label: string;
    placeholder: string;
    defaultValue?: (Date | null)[] | null;
    errors?: string[];
    setDates: (dates: (Date | null)[] | null) => void;
}
export default function FormInputDateRange({name, label, placeholder, defaultValue, errors, setDates}: FormInputTextProps) {
    return (
    <div className="pv-form-input">
            <p className="label">{label}</p>
            <Calendar value={defaultValue} onChange={(e) => {
                setDates(e.value ?? null);
            }} invalid={!!errors?.length}
                      id={name} name={name} aria-describedby={`${name}-help`} placeholder={placeholder}
                      selectionMode="range" readOnlyInput hideOnRangeSelection dateFormat="dd MM yy"/>
            {errors && <small className="text-red-500">{errors.join(', ')}</small>}
        </div>
    );
}