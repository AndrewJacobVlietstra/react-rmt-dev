import { useState, useEffect, useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchJobItem, fetchJobItems, handleError } from "./utility";

export const useJobItem = (id: number | null) => {
	const { data, isInitialLoading } = useQuery(
		["job-item", id],
		() => (id ? fetchJobItem(id) : null),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: (error) => handleError(error),
		}
	);

	const jobItem = data?.jobItem;
	const isLoading = isInitialLoading;
	return [jobItem, isLoading] as const;
};

export const useJobItems = (searchText: string) => {
	const { data, isInitialLoading } = useQuery(
		["job-items", searchText],
		() => fetchJobItems(searchText),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(searchText),
			onError: (error) => handleError(error),
		}
	);

	return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
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

export const useBookmarksContext = () => {
	const context = useContext(BookmarksContext);

	if (!context) {
		throw new Error(
			"useContext must be used within Context Provider Component!"
		);
	}

	return context;
};
