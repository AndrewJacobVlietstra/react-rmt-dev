import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type BookmarkIconProps = {
	id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
	const { bookmarkedIDs, handleToggleBookmark } = useBookmarksContext();

	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				handleToggleBookmark(id);
			}}
			className="bookmark-btn"
		>
			<BookmarkFilledIcon
				className={`${bookmarkedIDs.includes(id) ? "filled" : ""}`}
			/>
		</button>
	);
}
