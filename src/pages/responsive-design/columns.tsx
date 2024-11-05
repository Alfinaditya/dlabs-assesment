import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Circle,
	Cross,
	FileQuestion,
} from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};
const statuses = [
	{
		value: 'pending',
		label: 'Pending',
		icon: FileQuestion,
	},
	{
		value: 'processing',
		label: 'Processing',
		icon: FileQuestion,
	},
	{
		value: 'success',
		label: 'Success',
		icon: Circle,
	},
	{
		value: 'failed',
		label: 'Failed',
		icon: Circle,
	},
];
export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
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
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Amount
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
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
];
