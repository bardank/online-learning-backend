export interface SearchQuery {
  page: number;
  limit: number;
}

export interface CollegeSearchQuery extends SearchQuery {
  slug: string;
}
