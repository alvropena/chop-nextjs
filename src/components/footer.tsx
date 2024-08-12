import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="flex flex-row justify-between items-center">
            <Badge>Beta</Badge>
            <p className="text-xs text-gray-500">Chop can make mistakes. Check important info.</p>
            {/* <Button
                onClick={() =>
                    window.open("https://github.com/alvropena/chop-nextjs.git", "_blank")
                }
                variant="link"
                className="text-xs"
            >
                Source
            </Button> */}
        </footer>
    );
}
