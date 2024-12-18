import { SortBy } from "../lib/types";
import SortingButton from "./SortingButton";

type SortingControlsProps = {
	handleSortByChange: (newSortBy: SortBy) => void;
	sortBy: SortBy;
};

export default function SortingControls({
	handleSortByChange,
	sortBy,
}: SortingControlsProps) {
	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>

			<SortingButton
				onClick={() => handleSortByChange("relevant")}
				isActive={sortBy === "relevant"}
			>
				Relevant
			</SortingButton>

			<SortingButton
				onClick={() => handleSortByChange("recent")}
				isActive={sortBy === "recent"}
			>
				Recent
			</SortingButton>
		</section>
	);
}
