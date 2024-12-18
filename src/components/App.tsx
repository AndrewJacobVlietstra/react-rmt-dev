import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Sidebar, { SidebarTop } from "./Sidebar";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";

export default function App() {
	// State
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");

	// Derived / Computed state
	const totalJobItems = jobItems?.length || 0;
	const totalPages = totalJobItems / RESULTS_PER_PAGE;
	const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
		if (sortBy === "relevant") {
			return b.relevanceScore - a.relevanceScore;
		} else if (sortBy === "recent") {
			return a.daysAgo - b.daysAgo;
		} else {
			return 0;
		}
	});
	const jobItemsSortedAndSliced = jobItemsSorted.slice(
		currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
		currentPage * RESULTS_PER_PAGE
	);

	// Event Handlers / Actions
	const handlePageChange = (direction: PageDirection) => {
		if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
		} else if (direction === "previous") {
			setCurrentPage((prev) => {
				const newValue = prev - 1;
				if (newValue < 1) return 1;
				return newValue;
			});
		}
	};

	const handleSortByChange = (newSortBy: SortBy) => {
		if (sortBy === newSortBy) return;
		setCurrentPage(1);
		setSortBy(newSortBy);
	};

	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>

				<SearchForm searchText={searchText} setSearchText={setSearchText} />
			</Header>
			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount totalJobItems={totalJobItems} />
						<SortingControls
							handleSortByChange={handleSortByChange}
							sortBy={sortBy}
						/>
					</SidebarTop>

					<JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
					<PaginationControls
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</Sidebar>

				<JobItemContent />
			</Container>
			<Footer />

			<Toaster position="top-right" />
		</>
	);
}
