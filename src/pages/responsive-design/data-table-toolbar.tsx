// import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from '@/components/ui/button';
// import { Input } from "@/components/ui/input"
import { Table } from '@tanstack/react-table';
import { ArrowDown, Circle, X, FileQuestion } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

// import { Button } from "@/registry/new-york/ui/button"
// import { Input } from "@/registry/new-york/ui/input"
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

// import { priorities, statuses } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}
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
];

const priorities = [
	{
		label: 'Low',
		value: 'low',
		icon: ArrowDown,
	},
];
export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	console.log('is Filtered ', isFiltered);
	console.log('Statuses ', table.getColumn('status'));
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				{/* {table.getColumn('email') && (
					<DataTableFacetedFilter
						column={table.getColumn('email')}
						title="Email"
						options={statuses}
					/>
				)} */}
				{table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn('status')}
						title="Status"
						options={statuses}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			{/* <DataTableViewOptions table={table} /> */}
		</div>
	);
}
