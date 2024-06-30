import { ReactNode } from "react";
import { UserStoreProvider } from "./user-store-provider";
import { QuestionStoreProvider } from "./question-store-provider";
import { ResponsesStoreProvider } from "./responses-store-provider";
import { PromptStoreProvider } from "./prompt-store-provider";
import { NotificationsStoreProvider } from "./notifications-store-provider";
import { SchemaStoreProvider } from "./schema-store-provider";
import { ThreadStoreProvider } from "./thread-store-provider";
type ZustandProviderProps = {
  children: ReactNode;
};
export const ZustandProvider = ({ children }: ZustandProviderProps) => {
  return (
    <ThreadStoreProvider>
      <SchemaStoreProvider>
        <NotificationsStoreProvider>
          <PromptStoreProvider>
            <ResponsesStoreProvider>
              <QuestionStoreProvider>
                <UserStoreProvider>{children}</UserStoreProvider>
              </QuestionStoreProvider>
            </ResponsesStoreProvider>
          </PromptStoreProvider>
        </NotificationsStoreProvider>
      </SchemaStoreProvider>
    </ThreadStoreProvider>
  );
};
