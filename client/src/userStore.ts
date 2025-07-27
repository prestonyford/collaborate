import { create } from "zustand";
import type UserDTO from "./model/dto/UserDTO";

interface UserState {
	me?: UserDTO
	setMe: (me: UserDTO) => void
	authChecked: boolean
	setAuthChecked: (val: boolean) => void
}

const defaultState = {
	me: undefined,
	authChecked: false
}

const useUserStore = create<UserState>()((set, get) => {
	return {
		...defaultState,

		setMe: function (me: UserDTO) {
			set({ me });
		},
		setAuthChecked: function (authChecked: boolean) {
			set({ authChecked });
		}
	}
});

export { useUserStore };
