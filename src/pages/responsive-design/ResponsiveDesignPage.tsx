import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { DataTable } from './data-table';
import { columns, Payment } from './columns';

const ResponsiveDesignPage = () => {
	const payments: Payment[] = [
		{
			id: '1',
			amount: 150.75,
			status: 'success',
			email: 'john.doe@example.com',
		},
		{
			id: '2',
			amount: 99.99,
			status: 'pending',
			email: 'jane.smith@example.com',
		},
		{
			id: '3',
			amount: 200.0,
			status: 'failed',
			email: 'alice.jones@example.com',
		},
		{
			id: '4',
			amount: 50.0,
			status: 'processing',
			email: 'michael.brown@example.com',
		},
		{
			id: '5',
			amount: 120.5,
			status: 'success',
			email: 'emily.davis@example.com',
		},
		{
			id: '6',
			amount: 75.25,
			status: 'pending',
			email: 'daniel.evans@example.com',
		},
		{
			id: '7',
			amount: 300.0,
			status: 'success',
			email: 'lisa.wilson@example.com',
		},
		{
			id: '8',
			amount: 180.99,
			status: 'failed',
			email: 'tom.harris@example.com',
		},
		{
			id: '9',
			amount: 250.75,
			status: 'processing',
			email: 'nancy.clark@example.com',
		},
		{
			id: '10',
			amount: 49.99,
			status: 'pending',
			email: 'george.lee@example.com',
		},
	];

	return (
		<div>
			<DataTable columns={columns} data={payments} />
		</div>
	);
};

export default ResponsiveDesignPage;
