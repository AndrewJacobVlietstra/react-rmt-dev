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

export default function App() {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);

	const totalJobItems = jobItems?.length || 0;
	const jobItemsSliced = jobItems?.slice(0, 7) || [];

	const handlePageChange = (direction: "next" | "previous") => {
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
						<SortingControls />
					</SidebarTop>

					<JobList jobItems={jobItemsSliced} isLoading={isLoading} />
					<PaginationControls
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
