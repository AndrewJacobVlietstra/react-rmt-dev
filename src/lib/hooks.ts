import { useState, useEffect, useContext } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchJobItem, fetchJobItems, handleError } from "./utility";
import { CONTEXT_WARNING } from "./constants";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIDContext } from "../contexts/ActiveIDContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";
import { ThemeContext } from "../contexts/ThemeContextProvider";

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

export const useOnClickOutside = (
	refs: React.RefObject<HTMLElement>[],
	handler: () => void
) => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
				handler();
			}
		};

		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [refs, handler]);
};

export const useBookmarksContext = () => {
	const context = useContext(BookmarksContext);

	if (!context) {
		throw new Error(CONTEXT_WARNING);
	}

	return context;
};

export const useActiveIDContext = () => {
	const context = useContext(ActiveIDContext);

	if (!context) {
		throw new Error(CONTEXT_WARNING);
	}

	return context;
};

export const useSearchTextContext = () => {
	const context = useContext(SearchTextContext);

	if (!context) {
		throw new Error(CONTEXT_WARNING);
	}

	return context;
};

export const useJobItemsContext = () => {
	const context = useContext(JobItemsContext);

	if (!context) {
		throw new Error(CONTEXT_WARNING);
	}

	return context;
};

export const useThemeContext = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error(CONTEXT_WARNING);
	}

	return context;
};
