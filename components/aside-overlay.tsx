"use client";

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import SearchOverlay from "./search-overlay";
import NotificationsOverlay from "./notifications-overlay";

export default function OverlayAside({ activeTab, onClose, onOpen }: { activeTab: string | null, onClose: () => void, onOpen: () => void }) {
    const asideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        if (activeTab) {
            onOpen();
        }
    }, [activeTab, onOpen]);

    if (!activeTab) return null;

    return (
        <aside ref={asideRef} className="fixed top-0 bottom-0 left-20 w-1/5 border-l shadow-lg z-40">
            <div className="flex justify-between p-4 border-b">
                <h2>{activeTab === 'search' ? 'Search' : 'Notifications'}</h2>
            </div>

            {activeTab === 'search' && <SearchOverlay />}
            {activeTab === 'notifications' && <NotificationsOverlay />}
        </aside>
    );
}
