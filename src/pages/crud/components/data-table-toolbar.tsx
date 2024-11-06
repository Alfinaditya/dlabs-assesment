import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { statuses } from '../data/facet/user-facet';
import { useState } from 'react';
import AddUserModal from './add-user-modal';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0; // Mengecek apakah ada filter yang diterapkan pada kolom tabel.
	const [openAddUser, setOpenAddUser] = useState(false);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				{/* Menampilkan filter faceted jika kolom 'status' tersedia. */}
				{table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn('status')}
						title="Status"
						options={statuses}
					/>
				)}
				{/* Jika ada filter yang diterapkan, tampilkan tombol untuk mereset filter. */}
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
			<Button
				onClick={() => setOpenAddUser(true)}
				size="sm"
				variant="outline"
				className="h-8"
			>
				Add User
			</Button>
			<AddUserModal open={openAddUser} setOpen={setOpenAddUser} />
		</div>
	);
}
