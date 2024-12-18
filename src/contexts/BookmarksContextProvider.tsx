import { createContext, useState } from "react";
import { bookmarkedIDs } from "../lib/types";

type BookmarksContextProviderProps = {
	children: React.ReactNode;
};

type BookmarksContext = {
	bookmarkedIDs: bookmarkedIDs;
	handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
	children,
}: BookmarksContextProviderProps) {
	const [bookmarkedIDs, setBookmarkedIDs] = useState<bookmarkedIDs>([]);

	const handleToggleBookmark = (id: number) => {
		if (bookmarkedIDs.includes(id)) {
			setBookmarkedIDs((prev) =>
				prev.filter((bookmarkID) => bookmarkID !== id)
			);
		} else {
			setBookmarkedIDs((prev) => [...prev, id]);
		}
	};

	return (
		<BookmarksContext.Provider
			value={{
				bookmarkedIDs,
				handleToggleBookmark,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	);
}
