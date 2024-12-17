import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";

type PaginationButtonProps = {
	direction: PageDirection;
	currentPage: number;
	onPageChange: (direction: PageDirection) => void;
};

export default function PaginationButton({
	direction,
	currentPage,
	onPageChange,
}: PaginationButtonProps) {
	const previousPage = currentPage - 1;
	const nextPage = currentPage + 1;

	return (
		<button
			onClick={() => onPageChange(direction)}
			className={`pagination__button ${
				previousPage === 0 &&
				direction === "previous" &&
				"pagination__button--hidden"
			}`}
		>
			{direction === "previous" && (
				<>
					<ArrowLeftIcon />
					Page {previousPage}
				</>
			)}

			{direction === "next" && (
				<>
					Page {nextPage}
					<ArrowRightIcon />
				</>
			)}
		</button>
	);
}
