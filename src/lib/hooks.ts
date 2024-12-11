import { useState, useEffect } from "react";
import { BASE_URL } from "./constants";
import { jobItem, jobListItem } from "./types";
import { useQuery } from "@tanstack/react-query";

export const useJobItem = (id: number | null) => {
	const { data, isLoading } = useQuery(
		["job-item", id],
		async () => {
			const response = await fetch(`${BASE_URL}/${id}`);
			const data = await response.json();
			return data;
		},
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: () => {},
		}
	);

	const jobItem: jobItem = data?.jobItem;
	return [jobItem, isLoading] as const;
};

export const useJobItems = (searchText: string) => {
	const [jobItems, setJobItems] = useState<jobListItem[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);

	const totalJobItems = jobItems.length;
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

	return { jobItemsSliced, isLoading, totalJobItems };
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

export const useDebounce = <T>(value: T, delay = 550): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};
