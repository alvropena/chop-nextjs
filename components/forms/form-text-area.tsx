import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FormTextareaType } from "./form-text-area-type";

export const FormTextarea: React.FC<FormTextareaType> = ({
    id,
    label,
    placeholder,
    register,
    error,
}) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Textarea id={id} placeholder={placeholder} className="min-h-[100px] shadow-sm" {...register} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);
