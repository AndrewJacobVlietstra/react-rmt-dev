import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
	currentPage: number;
	onPageChange: (direction: "next" | "previous") => void;
};

export default function PaginationControls({
	currentPage,
	onPageChange,
}: PaginationControlsProps) {
	const previousPage = currentPage - 1;
	const nextPage = currentPage + 1;

	return (
		<section className="pagination">
			<button
				onClick={() => onPageChange("previous")}
				className={`pagination__button ${
					previousPage === 0 ? "pagination__button--hidden" : ""
				}`}
			>
				<ArrowLeftIcon />
				Page {previousPage}
			</button>

			<button
				onClick={() => onPageChange("next")}
				className="pagination__button"
			>
				Page {nextPage}
				<ArrowRightIcon />
			</button>
		</section>
	);
}
