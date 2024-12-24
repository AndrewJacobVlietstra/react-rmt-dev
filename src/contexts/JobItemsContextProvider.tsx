import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection, jobListItem } from "../lib/types";

type JobItemsContextProviderProps = {
	children: React.ReactNode;
};

type JobItemsContext = {
	jobItems: jobListItem[] | undefined;
	jobItemsSorted: jobListItem[];
	jobItemsSortedAndSliced: jobListItem[];
	totalJobItems: number;
	isLoading: boolean;
	currentPage: number;
	totalPages: number;
	sortBy: SortBy;
	handlePageChange: (direction: PageDirection) => void;
	handleSortByChange: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
	children,
}: JobItemsContextProviderProps) {
	const { debouncedSearchText } = useSearchTextContext();

	// State
	const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");

	// Derived / Computed state
	const totalJobItems = jobItems?.length || 0;
	const totalPages = totalJobItems / RESULTS_PER_PAGE;
	const jobItemsSorted = useMemo(
		() =>
			[...(jobItems || [])].sort((a, b) => {
				if (sortBy === "relevant") {
					return b.relevanceScore - a.relevanceScore; // descending order
				} else if (sortBy === "recent") {
					return a.daysAgo - b.daysAgo; // ascending order
				} else {
					return 0;
				}
			}),
		[jobItems, sortBy]
	);
	const jobItemsSortedAndSliced = jobItemsSorted.slice(
		currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
		currentPage * RESULTS_PER_PAGE
	);

	// Event Handlers / Actions
	const handlePageChange = useCallback((direction: PageDirection) => {
		if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
		} else if (direction === "previous") {
			setCurrentPage((prev) => {
				const newValue = prev - 1;
				if (newValue < 1) return 1;
				return newValue;
			});
		}
	}, []);
	const handleSortByChange = useCallback(
		(newSortBy: SortBy) => {
			if (sortBy === newSortBy) return;
			setCurrentPage(1);
			setSortBy(newSortBy);
		},
		[sortBy]
	);

	const contextValue = useMemo(
		() => ({
			jobItems,
			jobItemsSorted,
			jobItemsSortedAndSliced,
			totalJobItems,
			isLoading,
			currentPage,
			totalPages,
			sortBy,
			handlePageChange,
			handleSortByChange,
		}),
		[
			jobItems,
			jobItemsSorted,
			jobItemsSortedAndSliced,
			totalJobItems,
			isLoading,
			currentPage,
			totalPages,
			sortBy,
			handlePageChange,
			handleSortByChange,
		]
	);

	return (
		<JobItemsContext.Provider value={contextValue}>
			{children}
		</JobItemsContext.Provider>
	);
}
