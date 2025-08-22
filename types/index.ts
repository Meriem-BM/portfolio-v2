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
  summary: string;
  author: {
    name: string;
    url: string;
  };
  cover: string;
  updated: string;
}

export interface IDetailBlogPost extends IBlogPost {
  content: ILogContent[];
  heroGradient?: string;
  author: {
    name: string;
    url: string;
  };
  slug: string;
}

// Enhanced content types for flexible blog content
interface TimelineContent {
  type: "timeline";
  items: ILogItem[];
}

interface ListContent {
  type: "list";
  items: string[];
  ordered?: boolean;
}

interface CodeContent {
  type: "code";
  content: string;
  language: string;
  fileName?: string;
  highlightLines?: number[];
}

interface TextContent {
  type: "text";
  content: string;
}

interface CalloutContent {
  type: "callout";
  variant: "info" | "warning" | "danger" | "success";
  content: string;
  title?: string;
}

interface DefaultContent {
  type: "hero" | "heading" | "subheading" | "interactive";
  content: string;
}

interface ImageContent {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface VideoContent {
  type: "video";
  src: string;
  poster?: string;
  caption?: string;
}

interface QuoteContent {
  type: "quote";
  content: string;
  author?: string;
  source?: string;
}

interface TableContent {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}

interface EmbedContent {
  type: "embed";
  url: string;
  title?: string;
  description?: string;
  provider?: string;
}

interface SeparatorContent {
  type: "separator";
  style?: "line" | "dots" | "gradient";
}

interface TwoColumnContent {
  type: "two-column";
  left: ILogContent[];
  right: ILogContent[];
}

interface TabsContent {
  type: "tabs";
  tabs: Array<{
    label: string;
    content: ILogContent[];
  }>;
}

interface AccordionContent {
  type: "accordion";
  items: Array<{
    title: string;
    content: ILogContent[];
  }>;
}

interface MetricsContent {
  type: "metrics";
  items: Array<{
    label: string;
    value: string | number;
    change?: string;
    trend?: "up" | "down" | "neutral";
  }>;
}

interface MarkdownContent {
  type: "markdown";
  content: string;
}

export type ILogContent =
  | TimelineContent
  | ListContent
  | CodeContent
  | TextContent
  | CalloutContent
  | DefaultContent
  | ImageContent
  | VideoContent
  | QuoteContent
  | TableContent
  | EmbedContent
  | SeparatorContent
  | TwoColumnContent
  | TabsContent
  | AccordionContent
  | MetricsContent
  | MarkdownContent;

export interface ILogItem {
  time: string;
  title: string;
  description: string;
}
