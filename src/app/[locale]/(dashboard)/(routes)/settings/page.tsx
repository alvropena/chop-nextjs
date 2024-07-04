import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LangSwitcher from "@/app/[locale]/components/LangSwitcher";
export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <LangSwitcher />
    </div>
  );
}
