"use client";
import { useSchemaStore } from "@/providers/schema-store-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LanguageDropdown from "@/components/language-dropdown";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

export default function InputForm() {
  const { user_input_generation } = useSchemaStore((state) => state);

  const t = useTranslations("")

  const system_message_hint = `You are an assistant that gives clear and precise hints.
  Your task is to create a brief and direct hint that helps guess the question.
  The hint should be closely related to the question, but without repeating it.
  
  Types of hints:
  1. **Definition**: Describe the key concept.
  2. **Association**: Relate the concept to something similar or connected.
  3. **Synonym**: Provide a synonym or related term.
  4. **Contextual**: Give a hint about the context in which it's used.
  5. **Functional**: Describe its purpose or how it's used.
  6. **Contrast**: Mention something opposite or different.
  7. **Example**: Give an example that fits the concept.
  
  Format:
  Hint: [Your brief and direct hint]
  
  Rules:
  1. Use a maximum of 10 words.
  2. Be specific and direct.
  3. Focus on the concept or keyword of the question.
  4. Don't give the answer, only a hint that clearly guides towards it.`;

  const system_prompt_answer_feedback = `Evaluate if the provided answer is correct for the given question.
    If the answer is correct, use one of the following formats randomly:
    1. "Correct! [Brief explanation of why the answer is correct]"
    2. "That's right! [Brief explanation of why the answer is correct]"
    3. "Yup! [Brief explanation of why the answer is correct]"

    If the answer is incorrect, use one of the following formats randomly:
    1. "Incorrect! [Brief explanation of why the answer is incorrect and what the correct answer is]"
    2. "Nope! [Brief explanation of why the answer is incorrect and what the correct answer is]"
    3. "That's incorrect! [Brief explanation of why the answer is incorrect and what the correct answer is]"

    Rules:
    1. The explanation should be concise and clear, no more than two sentences.
    2. If the answer is incorrect, always provide the correct answer in your explanation.
    3. Maintain a friendly and educational tone in all responses.
    4. Ensure that the explanation is informative and adds value beyond the simple statement of correct or incorrect.`;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">{t("Settings")}</h1>
      <div>
        <Label>Prompt</Label>
        <Input value={user_input_generation} disabled />
        <p className="text-xs">
          {t(
            "Above_is_the_prompt_we_use_to_generate_new_questions_for_you_It_is_not_editable"
          )}
        </p>
      </div>

      <div>
        <Label>{t("Hint")}</Label>
        <Textarea value={system_message_hint} disabled />
        <p className="text-xs">
          {t(
            "Above_is_the_prompt_we_use_to_generate_hints_for_you_It_is_not_editable"
          )}
        </p>
      </div>

      <div>
        <Label>{t("Feedback_Answer")}</Label>
        <Textarea value={system_prompt_answer_feedback} disabled />
        <p className="text-xs">
          {t(
            "Above_is_the_prompt_we_use_to_generate_answer_feedback_for_you_It_is_not_editable"
          )}
        </p>
      </div>

      <Label>{t("Language")}</Label>
      <LanguageDropdown />
    </div>
  );
}
