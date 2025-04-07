import {InputText} from "primereact/inputtext";

interface FormInputTextProps {
    name: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
    errors?: string[];
}
export default function FormInputText({name, label, placeholder, defaultValue, errors}: FormInputTextProps) {
    return (
        <div className="pv-form-input">
            <label htmlFor={name}>{label}</label>
            <InputText id={name} name={name} aria-describedby={`${name}-help`} placeholder={placeholder}
                       invalid={!!errors?.length} defaultValue={defaultValue}/>
            {errors && <small className="text-red-500">{errors.join(', ')}</small>}

        </div>
    );
}