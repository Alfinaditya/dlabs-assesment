import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { User } from '../types/User';
import useUserStore from '../store/user';
import { Row } from '@tanstack/react-table';
// Mendefinisi schema validasi menggunakan zod
const editUserSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	age: z.coerce
		.number({
			message: 'Age is required',
		})
		.int()
		.positive()
		.min(1, { message: 'Age should be at least 1' }),
	status: z.enum(['active', 'not-active'], { message: 'Status is invalid' }),
});

const EditUserModal = ({
	open,
	setOpen,
	mutableRow,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mutableRow: Row<User> | null;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const users = useUserStore((state) => state.users); // Mengambil data users dari store zustand
	const setUser = useUserStore((state) => state.setUser); // Fungsi untuk memperbarui data users di store / setState untuk users

	// Menggunakan react-hook-form dengan schema validasi dari zod
	const form = useForm<z.infer<typeof editUserSchema>>({
		resolver: zodResolver(editUserSchema), // Menggunakan zodResolver untuk validasi value input
		defaultValues: {
			name: '',
			email: '',
			age: 0,
			status: 'active',
		},
	});

	useEffect(() => {
		// isi form dengan data pengguna yang ingin diedit.
		if (mutableRow) {
			form.setValue('name', mutableRow.original.nama);
			form.setValue('email', mutableRow.original.email);
			form.setValue('age', mutableRow.original.umur);
			form.setValue('status', mutableRow.original.status);
		}
	}, [mutableRow]);

	async function onSubmit(values: z.infer<typeof editUserSchema>) {
		if (!mutableRow) {
			return;
		}

		setIsLoading(true);

		// Fungsi mencari dan mengedit data user
		const updatedUser = users.map((user) => {
			if (user.id === mutableRow.original.id) {
				return {
					...user,
					nama: values.name,
					email: values.email,
					umur: values.age,
					status: values.status,
				};
			}
			return user;
		});

		// Memperbarui data user dengan data yang telah diedit
		setUser(updatedUser);
		setIsLoading(false);
		setOpen(false);
		form.reset(); // Mereset form.
	}

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit User</DialogTitle>
						<DialogDescription>
							Complete the form below to add a new user to the system.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama</FormLabel>
										<FormControl>
											<Input
												maxLength={255}
												type="text"
												placeholder="Enter Product Name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												maxLength={255}
												type="email"
												placeholder="Enter your email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Umur</FormLabel>
										<FormControl>
											<Input
												maxLength={255}
												type="number"
												placeholder="Enter your Age"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a status to display" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="not-active">Not Active</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								variant="secondary"
								className="w-full"
								type="submit"
								loading={isLoading}
								disabled={isLoading}
							>
								Submit
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default EditUserModal;
