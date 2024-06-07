// store/useUserStore.ts
import create from 'zustand'

type User = {
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

interface UserStore {
    user: User;
    setUser: (userInfo: Partial<User>) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: {
        id: '',
        name: '',
        username: '',
        birthday: null,
        gender: '',
        bio: '',
        profile_picture: '',
        location: '',
        email: '',
        verified: false,
        social_media_handles: [],
        phone_number: '',
        providers: [],
        created_at: null,
        updated_at: null,
    },
    setUser: (userInfo) => set(state => ({ user: { ...state.user, ...userInfo } })),
    clearUser: () => set({
        user: {
            id: '',
            name: '',
            username: '',
            birthday: null,
            gender: '',
            bio: '',
            profile_picture: '',
            location: '',
            email: '',
            verified: false,
            social_media_handles: [],
            phone_number: '',
            providers: [],
            created_at: null,
            updated_at: null,
        }
    })
}));

export default useUserStore;
