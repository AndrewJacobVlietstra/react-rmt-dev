import PaginationButton from "./PaginationButton";

type PaginationControlsProps = {
	currentPage: number;
	onPageChange: (direction: "next" | "previous") => void;
};

export default function PaginationControls({
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
			<PaginationButton
				direction="next"
				currentPage={currentPage}
				onPageChange={onPageChange}
			/>
		</section>
	);
}
