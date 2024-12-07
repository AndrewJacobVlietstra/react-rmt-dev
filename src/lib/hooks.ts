import { useState, useEffect } from "react";
import { BASE_URL } from "./constants";
import { jobItem } from "./types";

export const useJobItems = (searchText: string) => {
	const [jobItems, setJobItems] = useState<jobItem[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);

	const jobItemsSliced = jobItems.slice(0, 7);

	useEffect(() => {
		if (!searchText) return;

		const fetchSearchResults = async () => {
			setIsLoading(true);

			const response = await fetch(`${BASE_URL}?search=${searchText}`);
			const data = await response.json();
			setJobItems(data.jobItems);

			setIsLoading(false);
		};

		fetchSearchResults();
	}, [searchText]);

	return [jobItemsSliced, isLoading] as const;
};

export const useGetActiveID = () => {
	const [activeID, setActiveID] = useState<number | null>(null);

	useEffect(() => {
		const handleHashChange = () => {
			const jobID = +window.location.hash.slice(1);
			if (!jobID) return;
			setActiveID(jobID);
		};
		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	return activeID;
};

export const useGetJobItem = (activeID: number | null) => {
	const [jobItemData, setJobItemData] = useState<jobItem | null>(null);

	useEffect(() => {
		if (!activeID) return;

		const fetchJobItemData = async () => {
			const response = await fetch(`${BASE_URL}/${activeID}`);
			const data = await response.json();
			setJobItemData(data);
			console.log(data);
		};
		fetchJobItemData();
	}, [activeID]);

	return jobItemData;
};
