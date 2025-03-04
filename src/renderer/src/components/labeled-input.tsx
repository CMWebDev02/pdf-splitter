import type { ChangeEvent, Dispatch } from "react"

interface LabeledInputProps {
    setValue: Dispatch<string>;
    currentValue: string;
    labelText: string;
}

export default function LabeledInput({setValue, currentValue, labelText}: LabeledInputProps) {
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return (
        <div>
            <label htmlFor={`${labelText}-input`}>{labelText}</label>
            <input type="text" id={`${labelText}-input`} onChange={handleChange} value={currentValue} />
        </div>
    )
}