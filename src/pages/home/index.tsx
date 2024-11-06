import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div>
			<h1>Assessment DLabs</h1>
			<Button variant="link" asChild>
				<Link to="/responsive-design">Go To Responsive Design</Link>
			</Button>
			<Button variant="link" asChild>
				<Link to="/crud">Go To CRUD + Local Storage</Link>
			</Button>
		</div>
	);
};

export default HomePage;
