import { UseFormRegisterReturn } from "react-hook-form";

export interface FormTextareaType {
    id: string;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
}