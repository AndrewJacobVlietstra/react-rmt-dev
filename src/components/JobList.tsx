import { useGetActiveID } from "../lib/hooks";
import { jobListItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
	jobItems: jobListItem[];
	isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
	const activeID = useGetActiveID();

	return (
		<ul className="job-list">
			{isLoading ? <Spinner /> : null}

			{!isLoading &&
				jobItems.map((jobItem) => (
					<JobListItem
						key={jobItem.id}
						jobItem={jobItem}
						isActive={jobItem.id === activeID}
					/>
				))}
		</ul>
	);
}

export default JobList;
