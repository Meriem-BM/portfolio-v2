export interface IProject {
  id: number;
  name: string;
  description: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  visibility: string;
  fork: boolean;
  archived: boolean;
  language: string;
  created_at: string;
  updated_at: string;
  homepage: string;
}

export interface IBlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  reactions: number;
  readTime: string;
  slug: string;
}