export type jobListItem = {
	badgeLetters: string;
	company: string;
	daysAgo: number;
	id: number;
	relevanceScore: number;
	title: string;
};

export type jobItem = jobListItem & {
	companyURL: string;
	coverImgURL: string;
	description: string;
	duration: string;
	location: string;
	qualifications: string[];
	reviews: string[];
	salary: string;
	title: string;
};

export type jobItemApiResponse = {
	public: boolean;
	jobItem: jobItem;
};

export type jobItemsApiResponse = {
	public: boolean;
	sorted: boolean;
	jobItems: jobListItem[];
};
