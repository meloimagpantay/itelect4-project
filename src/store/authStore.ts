// src/store/authStore.ts -- NEW FILE
import { create } from "zustand";
 
// The shape of the store: its data AND the functions that change it
interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}
 
const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userName: null,
  login: (name) => set({ token: `demo-token-${name}`, userName: name }),
  logout: () => set({ token: null, userName: null }),
}));
 
export default useAuthStore;
