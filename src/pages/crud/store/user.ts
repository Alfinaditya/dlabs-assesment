import { create } from 'zustand';
import { User } from '../types/User';
import { persist, createJSONStorage } from 'zustand/middleware';

// Interface untuk state user dalam store
interface UserState {
	users: User[];
	setUser: (props: User[]) => void;
}

// Interface untuk state awal
interface InitialState {
	users: User[];
}

// Nilai awal untuk state
const initialState: InitialState = {
	users: [],
};

// Membuat store dengan zustand dan middleware persist untuk menyimpan state di localStorage
const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			users: initialState.users,
			setUser: (
				by // Fungsi untuk memperbarui state users
			) =>
				set(() => ({
					users: by,
				})),
		}),
		{
			name: 'dt-users', // Nama key untuk menyimpan value di localStorage
			storage: createJSONStorage(() => localStorage), // Menggunakan localStorage untuk penyimpanan
		}
	)
);

export default useUserStore;
