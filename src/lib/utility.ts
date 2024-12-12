import { BASE_URL } from "./constants";
import { jobItemApiResponse, jobItemsApiResponse } from "./types";

export const fetchJobItem = async (id: number): Promise<jobItemApiResponse> => {
	const response = await fetch(`${BASE_URL}/${id}`);

	// 4xx or 5xx error
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.description);
	}

	const data = await response.json();
	return data;
};

export const fetchJobItems = async (
	searchText: string
): Promise<jobItemsApiResponse> => {
	const response = await fetch(`${BASE_URL}?search=${searchText}`);

	// 4xx or 5xx error
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.description);
	}

	const data = await response.json();
	return data;
};
