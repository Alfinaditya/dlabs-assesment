import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useUserStore from '../store/user';
import { Row } from '@tanstack/react-table';
import { User } from '../types/User';

const DeleteUserModal = ({
	open,
	setOpen,
	mutableRow,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mutableRow: Row<User> | null;
}) => {
	const [actionLoading, setActionLoading] = useState(false);
	const users = useUserStore((state) => state.users);
	const setUser = useUserStore((state) => state.setUser);

	function handleDeleteProduct() {
		if (!mutableRow) {
			return;
		}
		setActionLoading(true);
		setUser(users.filter((user) => user.id !== mutableRow.original.id));
		setActionLoading(false);
		setOpen(false);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						product and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button
						disabled={actionLoading}
						loading={actionLoading}
						onClick={handleDeleteProduct}
						className="bg-red-600"
					>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteUserModal;
