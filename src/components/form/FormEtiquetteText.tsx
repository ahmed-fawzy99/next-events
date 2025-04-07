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

            <div className="hidden">
                <div className="bg-blue-500"/>
                <div className="bg-yellow-500"/>
                <div className="bg-green-500"/>
                <div className="bg-red-500"/>
                <div className="bg-purple-500"/>
                <div className="bg-orange-500"/>
                <div className="text-blue-500"/>
                <div className="text-yellow-500"/>
                <div className="text-green-500"/>
                <div className="text-red-500"/>
                <div className="text-purple-500"/>
                <div className="text-orange-500"/>
            </div>


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
