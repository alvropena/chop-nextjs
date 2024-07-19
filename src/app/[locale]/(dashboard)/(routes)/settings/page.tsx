"use client";
import { useSchemaStore } from "@/providers/schema-store-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LanguageDropdown from "../../../../../components/language-dropdown";
import { Switch } from "@/components/ui/switch";


export default function InputForm() {
  const { user_input_generation } = useSchemaStore((state) => state);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Settings</h1>
      <Label>Prompt</Label>
      <Input value={user_input_generation} disabled />
      <p className="text-xs">
        Above is the prompt we use to generate new questions for you. It is not
        editable.
      </p>
      <Label>Language</Label>
      <LanguageDropdown />
    </div>
  );
}
