import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	// State untuk sorting
	const [sorting, setSorting] = useState<SortingState>([]);

	// Inisialisasi tabel menggunakan tanstack-table
	const table = useReactTable({
		data, //data yang akan ditampilkan dalam tabel
		columns, //kolom yang akan ditampilkan dalam tabel
		state: {
			sorting, // state yang mengelola urutan kolom berdasarkan pengguna
		},
		getCoreRowModel: getCoreRowModel(), // Mendapatkan model baris dasar (core row model), yang diperlukan untuk rendering tabel.
		onSortingChange: setSorting, // Fungsi untuk mengubah state sorting setiap kali terjadi perubahan pada sorting
		getFilteredRowModel: getFilteredRowModel(), // Mendapatkan model baris yang difilter sesuai dengan filter yang diterapkan
		getSortedRowModel: getSortedRowModel(), // Mendapatkan model baris yang sudah diurutkan sesuai dengan state sorting
		getFacetedRowModel: getFacetedRowModel(), //Mendapatkan model baris untuk faceting, yang digunakan untuk fitur faceted filtering.
		getFacetedUniqueValues: getFacetedUniqueValues(), // Mendapatkan unique value untuk faceted filtering.
	});

	return (
		<div className="space-y-4">
			{/* Toolbar untuk tabel */}
			<DataTableToolbar table={table} />
			<div className="rounded-md border">
				<Table>
					{/* Header tabel */}
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					{/* Body tabel */}
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							// Jika tidak ada hasil
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
