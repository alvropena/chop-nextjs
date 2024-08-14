import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";

interface GenderRadioGroupProps {
  name: string;
}

export function GenderRadioGroup({ name }: GenderRadioGroupProps) {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });
  const t = useTranslations("");
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="male" id="r1" />
        <Label htmlFor="r1">{t("Male")}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="female" id="r2" />
        <Label htmlFor="r2">{t("Female")}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="other" id="r3" />
        <Label htmlFor="r3">{t("Other")}</Label>
      </div>
    </RadioGroup>
  );
}
