// components/setting-section.tsx
import React from "react";

interface SettingSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function SettingSection({ title, children }: SettingSectionProps) {
    return (
        <div>
            <h2 className="text-xl font-medium mb-2">{title}</h2>
            {children}
        </div>
    );
}
