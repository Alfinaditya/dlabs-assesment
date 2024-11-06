import * as React from 'react';
import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Check, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DataTableFacetedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
}

// Fungsi komponen untuk menampilkan filter dengan opsi faceted berdasarkan kolom dan data yang diberikan.
export function DataTableFacetedFilter<TData, TValue>({
	column,
	title,
	options,
}: DataTableFacetedFilterProps<TData, TValue>) {
	const facets = column?.getFacetedUniqueValues(); // Mengambil nilai unik untuk kolom yang difilter.
	const selectedValues = new Set(column?.getFilterValue() as string[]); // Menyimpan nilai filter yang dipilih.

	return (
		<Popover>
			{/* Membungkus seluruh elemen dalam Popover untuk menampilkan konten saat tombol diklik. */}
			<PopoverTrigger asChild>
				{/* Trigger Button untuk membuka Popover. */}
				<Button variant="outline" size="sm" className="h-8 border-dashed">
					<PlusCircle className="mr-2 h-4 w-4" />
					{/* Menampilkan judul filter */}
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{/* Menampilkan jumlah selected filter dipilih jika ada */}
								{selectedValues.size > 2 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.value))
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="rounded-sm px-1 font-normal"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			{/* Konten Popover */}
			<PopoverContent className="w-[200px] p-0" align="start">
				{/* Komponen Command untuk menangani interaksi pencarian dan filter */}
				<Command>
					{/* Input pencarian pilihan filter */}
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value); // Memeriksa apakah opsi terpilih.
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											// Ketika filter opsi dipilih, tambah atau hapus nilai filter.
											if (isSelected) {
												selectedValues.delete(option.value);
											} else {
												selectedValues.add(option.value);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(
												filterValues.length ? filterValues : undefined
											);
											// Memperbarui nilai filter pada kolom dengan nilai terpilih.
										}}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50 [&_svg]:invisible'
											)}
										>
											{/* Menampilkan ikon centang jika opsi dipilih */}
											<Check className={cn('h-4 w-4')} />
										</div>
										{/* Menampilkan ikon jika ada */}
										{option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)}
										<span>{option.label}</span>
										{facets?.get(option.value) && (
											<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
												{/* Menampilkan berapa banyak data pada table,jika filter dipilih */}
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								{/* Menambahkan pemisah sebelum tombol Clear filters */}
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
									{/* Tombol untuk menghapus filter */}
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
