import { useState, useEffect, useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { useQueries, useQuery } from "@tanstack/react-query";
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

export const useJobItems = (ids: number[]) => {
	const results = useQueries({
		queries: ids.map((id) => ({
			queryKey: ["job-item", id],
			queryFn: () => fetchJobItem(id),
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: handleError,
		})),
	});

	const jobItems = results
		.map((item) => item?.data?.jobItem)
		.filter((item) => item !== undefined);
	const isLoading = results.some((item) => item.isLoading);
	return [jobItems, isLoading] as const;
};

export const useSearchQuery = (searchText: string) => {
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

export const useLocalStorage = <T>(
	key: string,
	initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState(() =>
		JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
	);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
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
