import { useState, useEffect } from "react";
import { BASE_URL } from "./constants";
import { jobItem } from "./types";

export const useJobItems = (searchText: string) => {
	const [jobItems, setJobItems] = useState<jobItem[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);

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

	return {
		jobItems,
		isLoading,
	};
};
