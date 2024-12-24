import { useJobItemsContext } from "../lib/hooks";
import SortingButton from "./SortingButton";

export default function SortingControls() {
	const { sortBy, handleSortByChange } = useJobItemsContext();

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
