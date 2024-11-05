import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { users } from './data/user-data';

const ResponsiveDesignPage = () => {
	return (
		<div>
			<DataTable columns={columns} data={users} />
		</div>
	);
};

export default ResponsiveDesignPage;
