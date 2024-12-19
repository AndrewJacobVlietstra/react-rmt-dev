import { createContext } from "react";
import { bookmarkedIDs, jobItem } from "../lib/types";
import { useJobItems, useLocalStorage } from "../lib/hooks";

type BookmarksContextProviderProps = {
	children: React.ReactNode;
};

type BookmarksContext = {
	isLoading: boolean;
	bookmarkedIDs: bookmarkedIDs;
	bookmarkedJobItems: jobItem[];
	handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
	children,
}: BookmarksContextProviderProps) {
	const [bookmarkedIDs, setBookmarkedIDs] = useLocalStorage<bookmarkedIDs>(
		"bookmarkedIDs",
		[]
	);
	const [bookmarkedJobItems, isLoading] = useJobItems(bookmarkedIDs);

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
				isLoading,
				bookmarkedIDs,
				bookmarkedJobItems,
				handleToggleBookmark,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	);
}
