import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function GenderRadioGroup() {
    return (
        <RadioGroup defaultValue="male" className="space-y-2">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="r1" />
                <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="r2" />
                <Label htmlFor="r2">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="r3" />
                <Label htmlFor="r3">Other</Label>
            </div>
        </RadioGroup>
    );
}
