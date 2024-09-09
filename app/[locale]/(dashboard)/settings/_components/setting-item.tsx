// components/setting-item.tsx
import React from "react";
import { Label } from "../../../../../components/ui/label";
import { Button, ButtonProps } from "../../../../../components/ui/button";
import { Switch } from "../../../../../components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../../components/ui/select";

interface SettingItemProps {
    label?: string;
    type?: 'button' | 'select' | 'switch' | 'label-button';
    buttonText?: string;
    switchId?: string;
    selectOptions?: { value: string; label: string }[];
    placeholder?: string;
    onClick?: () => void;
    buttonVariant?: ButtonProps['variant']; // Add buttonVariant prop
    children?: React.ReactNode;
}

export default function SettingItem({
    label,
    type,
    buttonText,
    switchId,
    selectOptions,
    placeholder,
    onClick,
    buttonVariant = 'default',  // Set default variant to 'default'
    children,
}: SettingItemProps) {
    return (
        <div className="flex items-center justify-between w-full p-2">
            {label && <Label className="text-sm font-medium">{label}</Label>}
            {type === 'button' && (
                <Button variant={buttonVariant} className="w-fit" onClick={onClick}>
                    {buttonText}
                </Button>
            )}
            {type === 'switch' && switchId && (
                <Switch id={switchId} />
            )}
            {type === 'select' && selectOptions && (
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
            )}
            {type === 'label-button' && (
                <Button variant={buttonVariant} onClick={onClick}>
                    {buttonText}
                </Button>
            )}
            {children && children}
        </div>
    );
}
