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

export interface IDetailBlogPost {
  id: number;
  title: string;
  excerpt?: string;
  heroGradient?: string;
  date: string;
  tags: string[];
  reactions: number;
  readTime: string;
  content: ILogContent[];
}

interface TimelineContent {
  type: "timeline";
  items: ILogItem[];
}

interface ListContent {
  type: "list";
  items: string[];
}

interface CodeContent {
  type: "code";
  content: string;
  language: string;
}

interface TextContent {
  type: "text";
  content: string;
}

interface CalloutContent {
  type: "callout";
  variant: "info" | "warning" | "danger" | "success";
  content: string;
}

interface DefaultContent {
  type: "hero" | "heading" | "subheading" | "interactive";
  content: string;
}

export type ILogContent =
  | TimelineContent
  | ListContent
  | CodeContent
  | TextContent
  | CalloutContent
  | DefaultContent;

export interface ILogItem {
  time: string;
  title: string;
  description: string;
}
