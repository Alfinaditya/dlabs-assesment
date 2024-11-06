import { create } from 'zustand';
import { User } from '../types/User';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
	users: User[];
	setUser: (props: User[]) => void;
}

interface InitialState {
	users: User[];
}

const initialState: InitialState = {
	users: [],
};

const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			users: initialState.users,
			setUser: (by) =>
				set(() => ({
					users: by,
				})),
		}),
		{
			name: 'dt-users', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

export default useUserStore;
