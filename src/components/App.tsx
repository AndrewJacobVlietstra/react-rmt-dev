import { Toaster } from "react-hot-toast";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Sidebar, { SidebarTop } from "./Sidebar";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobListSearch from "./JobListSearch";
import ThemeButton from "./ThemeButton";

export default function App() {
	return (
		<>
			<Background />

			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
					<ThemeButton />
				</HeaderTop>

				<SearchForm />
			</Header>

			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount />
						<SortingControls />
					</SidebarTop>

					<JobListSearch />
					<PaginationControls />
				</Sidebar>

				<JobItemContent />
			</Container>

			<Footer />

			<Toaster position="top-right" />
		</>
	);
}
