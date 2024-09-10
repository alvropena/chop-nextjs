import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormInputType } from "../../types/form-input-type";

export const FormInput: React.FC<FormInputType> = ({
    id,
    label,
    placeholder,
    register,
    error,
    type = "text",
}) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} placeholder={placeholder} {...register} className="shadow-sm" />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);
