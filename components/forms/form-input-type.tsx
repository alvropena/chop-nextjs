import { UseFormRegisterReturn } from "react-hook-form";

export interface FormInputType {
    id: string;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
    type?: string;
}
