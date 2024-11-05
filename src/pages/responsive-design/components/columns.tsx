import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { statuses } from '../data/facet/user-facet';
import { User } from '../types/User';

export const columns: ColumnDef<User>[] = [
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
];
