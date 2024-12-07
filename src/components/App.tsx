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
import { useGetActiveID, useGetJobItem, useJobItems } from "../lib/hooks";

export default function App() {
	const [searchText, setSearchText] = useState("");
	const [jobItems, isLoading] = useJobItems(searchText);
	const activeID = useGetActiveID();
	const jobItemData = useGetJobItem(activeID);

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
						<ResultsCount />
						<SortingControls />
					</SidebarTop>

					<JobList jobItems={jobItems} isLoading={isLoading} />
					<PaginationControls />
				</Sidebar>

				<JobItemContent />
			</Container>
			<Footer />
		</>
	);
}
