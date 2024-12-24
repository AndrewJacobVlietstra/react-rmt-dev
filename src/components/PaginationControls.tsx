import { useJobItemsContext } from "../lib/hooks";
import PaginationButton from "./PaginationButton";

export default function PaginationControls() {
	const { currentPage, totalPages, handlePageChange } = useJobItemsContext();

	return (
		<section className="pagination">
			<PaginationButton
				direction="previous"
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
			{currentPage < totalPages && (
				<PaginationButton
					direction="next"
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			)}
		</section>
	);
}
