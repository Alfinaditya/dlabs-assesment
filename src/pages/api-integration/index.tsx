import axios from 'axios';
import { User } from './types/user';
import { useQuery } from 'react-query';
import { cn } from '@/lib/utils';
import { AlertCircle, Loader2 } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ApiIntegrationPage = () => {
	const {
		isLoading,
		isError,
		isSuccess,
		refetch,
		data: users,
	} = useQuery<User[], Error>({
		queryKey: [`users`],
		retry: 1,
		refetchOnWindowFocus: false,
		queryFn: () =>
			axios.get('https://api.github.com/users').then((res) => res.data),
	});

	return (
		<div>
			<div className="space-y-4">
				<h1>Tugas Api Integration</h1>

				{isLoading ? (
					<div
						className={cn('m-auto', 'text-center flex justify-center flex-col')}
					>
						<div
							className={cn(
								'w-min flex justify-center flex-col items-center m-auto'
							)}
						>
							<Loader2 size={35} className="animate-spin" />
							<p className="mt-2 text-sm">Loading...</p>
						</div>
					</div>
				) : (
					<>
						{isError && (
							<>
								<div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 space-y-4">
									<Alert
										variant="destructive"
										className="max-w-md w-full text-left"
									>
										<AlertCircle className="h-4 w-4" />
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>
											Failed to fetch table data. Please try again.
										</AlertDescription>
									</Alert>
									<Button onClick={() => refetch()} variant="outline">
										Retry
									</Button>
								</div>
							</>
						)}
						{isSuccess && (
							<Table>
								<TableCaption>A list of your user.</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Avatar</TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users &&
										users.length > 0 &&
										users.map((user) => (
											<TableRow key={user.id}>
												<TableCell align="left">{user.login}</TableCell>
												<TableCell>
													<Avatar>
														<AvatarImage src={user.avatar_url} />
														<AvatarFallback>{user.login} Image</AvatarFallback>
													</Avatar>
												</TableCell>
												<TableCell align="right">
													<Button variant="link" asChild>
														<a
															href={user.html_url}
															target="_blank"
															rel="noopener noreferrer"
														>
															View Profile
														</a>
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default ApiIntegrationPage;
