import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { users } from './data/user-data';

const ResponsiveDesignPage = () => {
	return (
		<div>
			<div className="space-y-4">
				<h1>Tugas Responsive Design</h1>
				<DataTable columns={columns} data={users} />
			</div>
		</div>
	);
};

export default ResponsiveDesignPage;
