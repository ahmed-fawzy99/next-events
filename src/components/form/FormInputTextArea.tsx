import { InputTextarea } from 'primereact/inputtextarea';

interface FormInputTextProps {
    name: string;
    label: string;
    placeholder: string;
    rows?: number;
    cols?: number;
    defaultValue?: string;
    errors?: string[];
}
export default function FormInputTextArea({name, label, placeholder, rows, cols, defaultValue, errors}: FormInputTextProps) {
    return (
        <div className="pv-form-input">
            <label htmlFor={name}>{label}</label>
            <InputTextarea id={name} name={name} aria-describedby={`${name}-help`} placeholder={placeholder}
                            rows={rows ?? 3} cols={cols ?? 50} invalid={!!errors?.length} defaultValue={defaultValue}/>
            {errors && <small className="text-red-500">{errors.join(', ')}</small>}

        </div>
    );
}