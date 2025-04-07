'use client';
import { useState } from 'react';

export default function FormEtiquetteText({defaultValue, errors}: {defaultValue?: string, errors?: string[]}) {
    const colors = ['blue', 'yellow', 'green', 'red', 'purple', 'orange'];
    const [selectedColor, setSelectedColor] = useState(defaultValue || 'blue');

    return (
        <div className="pv-form-input gap-1">
            <label htmlFor="colorInput">Etiquette</label>
            <input
                id="colorInput"
                name="color"
                type="text"
                hidden
                value={selectedColor}
                readOnly
            />

            <div className="flex gap-2">
                {colors.map((color) => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`
                            h-6 w-6 rounded-full bg-${color}-500 cursor-pointer
                            ${selectedColor === color ? 'border-2 border-black/50' : 'border border-transparent'}
                        `}
                        aria-label={`Select ${color}`}
                    />
                ))}
            </div>
            {errors && <small className="text-red-500">{errors.join(', ')}</small>}

        </div>
    );
}
