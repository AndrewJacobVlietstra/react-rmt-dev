import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { BASE_URL } from "../lib/constants";

export default function App() {
	const [searchText, setSearchText] = useState("");
	const [jobItems, setJobItems] = useState([]);

	useEffect(() => {
		if (!searchText) return;

		const fetchSearchResults = async () => {
			const response = await fetch(`${BASE_URL}?search=${searchText}`);
			const data = await response.json();
			setJobItems(data.jobItems);
		};

		fetchSearchResults();
	}, [searchText]);

	return (
		<>
			<Background />

			<Header searchText={searchText} setSearchText={setSearchText} />

			<Container jobItems={jobItems} />

			<Footer />
		</>
	);
}
