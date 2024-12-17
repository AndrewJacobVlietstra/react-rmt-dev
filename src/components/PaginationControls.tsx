import PaginationButton from "./PaginationButton";

type PaginationControlsProps = {
	totalPages: number;
	currentPage: number;
	onPageChange: (direction: "next" | "previous") => void;
};

export default function PaginationControls({
	totalPages,
	currentPage,
	onPageChange,
}: PaginationControlsProps) {
	return (
		<section className="pagination">
			<PaginationButton
				direction="previous"
				currentPage={currentPage}
				onPageChange={onPageChange}
			/>
			{currentPage < totalPages && (
				<PaginationButton
					direction="next"
					currentPage={currentPage}
					onPageChange={onPageChange}
				/>
			)}
		</section>
	);
}
