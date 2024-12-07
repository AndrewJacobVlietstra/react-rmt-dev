import { jobListItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
	jobItems: jobListItem[];
	isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
	return (
		<ul className="job-list">
			{isLoading ? <Spinner /> : null}

			{!isLoading &&
				jobItems.map((jobItem) => (
					<JobListItem key={jobItem.id} jobItem={jobItem} />
				))}
		</ul>
	);
}

export default JobList;
