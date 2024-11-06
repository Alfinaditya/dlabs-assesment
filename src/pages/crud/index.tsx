import { Button } from '@/components/ui/button';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUserStore from './store/user';
import { statuses } from './data/facet/user-facet';
import { DataTable } from './components/data-table';
import { User } from './types/User';
import { useState } from 'react';
import EditUserModal from './components/edit-user-modal';
import DeleteUserModal from './components/delete-user-modal';

const CrudPage = () => {
	const users = useUserStore((state) => state.users);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [mutableRow, setMutableRow] = useState<Row<User> | null>(null);

	const columns: ColumnDef<User>[] = [
		// {
		// 	accessorKey: 'id',
		// 	header: ({ column }) => {
		// 		return (
		// 			<Button
		// 				variant="ghost"
		// 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
		// 			>
		// 				No
		// 				{column.getIsSorted() === 'desc' ? (
		// 					<ArrowDown className="ml-2 h-4 w-4" />
		// 				) : column.getIsSorted() === 'asc' ? (
		// 					<ArrowUp className="ml-2 h-4 w-4" />
		// 				) : (
		// 					<ArrowUpDown className="ml-2 h-4 w-4" />
		// 				)}
		// 			</Button>
		// 		);
		// 	},
		// 	cell: ({ row }) => row.index + 1,
		// },
		{
			accessorKey: 'nama',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Nama
						{column.getIsSorted() === 'desc' ? (
							<ArrowDown className="ml-2 h-4 w-4" />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUp className="ml-2 h-4 w-4" />
						) : (
							<ArrowUpDown className="ml-2 h-4 w-4" />
						)}
					</Button>
				);
			},
		},
		{
			accessorKey: 'email',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Email
						{column.getIsSorted() === 'desc' ? (
							<ArrowDown className="ml-2 h-4 w-4" />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUp className="ml-2 h-4 w-4" />
						) : (
							<ArrowUpDown className="ml-2 h-4 w-4" />
						)}
					</Button>
				);
			},
		},
		{
			accessorKey: 'umur',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Umur
						{column.getIsSorted() === 'desc' ? (
							<ArrowDown className="ml-2 h-4 w-4" />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUp className="ml-2 h-4 w-4" />
						) : (
							<ArrowUpDown className="ml-2 h-4 w-4" />
						)}
					</Button>
				);
			},
		},
		{
			accessorKey: 'status',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Status
						{column.getIsSorted() === 'desc' ? (
							<ArrowDown className="ml-2 h-4 w-4" />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUp className="ml-2 h-4 w-4" />
						) : (
							<ArrowUpDown className="ml-2 h-4 w-4" />
						)}
					</Button>
				);
			},
			cell: ({ row }) => {
				const status = statuses.find(
					(status) => status.value === row.getValue('status')
				);

				if (!status) {
					return null;
				}

				return (
					<div className="flex w-[100px] items-center">
						{status.icon && (
							<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
						)}
						<span>{status.label}</span>
					</div>
				);
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id));
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
						>
							<Ellipsis className="h-4 w-4" />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-[160px]">
						<DropdownMenuItem
							onClick={() => {
								setOpenEditModal(true);
								setMutableRow(row);
							}}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								setOpenDeleteModal(true);
								setMutableRow(row);
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	return (
		<div className="space-y-4">
			<h1>Tugas CRUD Local Storage</h1>
			<DataTable columns={columns} data={users} />
			<EditUserModal
				open={openEditModal}
				setOpen={setOpenEditModal}
				mutableRow={mutableRow}
			/>
			<DeleteUserModal
				open={openDeleteModal}
				setOpen={setOpenDeleteModal}
				mutableRow={mutableRow}
			/>
		</div>
	);
};

export default CrudPage;
