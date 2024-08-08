import React from 'react'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export default function HomeHeader() {
    return (
        <header className="sticky top-0 p-2 flex flex-row justify-end">
            <Button
                onClick={() => {
                    resetStore();
                    setstateThread("CREATE");
                    setShowNewQuestionButton(false);
                }}
            >
                <Plus className="h-4 w-4 mr-2" />
                New Thread
            </Button>
        </header>
    )
}
