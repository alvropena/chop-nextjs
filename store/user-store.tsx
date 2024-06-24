import { createStore } from "zustand/vanilla";

// Definición del tipo User
export type UserState = {
  user: {
    id: string;
    name: string;
    username: string;
    birthday: Date | null;
    gender: string;
    bio: string;
    profile_picture: string;
    location: string;
    email: string;
    verified: boolean;
    social_media_handles: string[];
    phone_number: string;
    providers: string[];
    created_at: Date | null;
    updated_at: Date | null;
  };
};

export type UserActions = {
  setUser: (userInfo: Partial<UserState>) => void;
  clearUser: () => void;
};

export type UserStore = UserState & UserActions;
// Estado inicial por defecto para User
export const defaultInitState: UserState = {
  user: {
    id: "",
    name: "",
    username: "",
    birthday: null,
    gender: "",
    bio: "",
    profile_picture: "",
    location: "",
    email: "",
    verified: false,
    social_media_handles: [],
    phone_number: "",
    providers: [],
    created_at: null,
    updated_at: null,
  },
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (userInfo) =>
      set((state) => ({ user: { ...state.user, ...userInfo } })),
    clearUser: () => set((state) => ({ user: defaultInitState.user })),
  }));
};
