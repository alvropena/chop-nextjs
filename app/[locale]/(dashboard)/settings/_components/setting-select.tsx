// components/setting-select.tsx
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../../../components/ui/select";

interface SettingSelectProps {
    label: string;
    placeholder: string;
    selectOptions: { value: string; label: string }[];
}

export default function SettingSelect({ label, placeholder, selectOptions }: SettingSelectProps) {
    return (
        <div className="flex items-center justify-between w-full p-2">
            <Select>
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {selectOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
