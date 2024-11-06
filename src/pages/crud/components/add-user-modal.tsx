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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { User } from '../types/User';
import useUserStore from '../store/user';

const addUserSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	age: z.coerce
		.number({
			message: 'Age is required',
		})
		.int()
		.positive()
		.min(1, { message: 'Age should be at least 1' }),
});

const AddUserModal = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const users = useUserStore((state) => state.users);
	const setUser = useUserStore((state) => state.setUser);

	const form = useForm<z.infer<typeof addUserSchema>>({
		resolver: zodResolver(addUserSchema),
		defaultValues: {
			name: '',
			email: '',
			age: 0,
		},
	});

	async function onSubmit(values: z.infer<typeof addUserSchema>) {
		setIsLoading(true);
		const params: User = {
			id: crypto.randomUUID(),
			nama: values.name,
			email: values.email,
			umur: values.age,
			status: 'active',
		};
		setUser([params, ...users]);
		setIsLoading(false);
		setOpen(false);
		form.reset();
	}

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add User</DialogTitle>
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
												placeholder="Enter your name"
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

export default AddUserModal;
