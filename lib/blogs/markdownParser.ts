import { ILogContent } from "@/types";

/**
 * Markdown to Content Parser
 * Converts markdown text to structured content blocks
 */
export class MarkdownParser {
  private static CALLOUT_REGEX = /^>\s*\[!(INFO|WARNING|SUCCESS|DANGER)\]\s*(.*?)$/gm;
  private static CODE_BLOCK_REGEX = /```(\w+)?\s*(?:\[(.*?)\])?\s*\n([\s\S]*?)```/g;
  private static HEADING_REGEX = /^(#{1,6})\s+(.+)$/gm;
  private static IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)(?:\s*"([^"]*)")?/g;
  private static TABLE_REGEX = /^\|(.+)\|\s*\n\|[-\s|:]+\|\s*\n((?:\|.+\|\s*\n?)+)/gm;
  private static TIMELINE_REGEX = /^>\s*\[!TIMELINE\]\s*\n((?:.*\n)*?)(?=\n\n|\n$|$)/gm;
  private static METRICS_REGEX = /^>\s*\[!METRICS\]\s*\n((?:.*\n)*?)(?=\n\n|\n$|$)/gm;

  static parse(markdown: string): ILogContent[] {
    const content: ILogContent[] = [];
    let processedMarkdown = markdown;

    // Extract and process special blocks first
    processedMarkdown = this.extractCallouts(processedMarkdown, content);
    processedMarkdown = this.extractCodeBlocks(processedMarkdown, content);
    processedMarkdown = this.extractTimelines(processedMarkdown, content);
    processedMarkdown = this.extractMetrics(processedMarkdown, content);
    processedMarkdown = this.extractTables(processedMarkdown, content);
    processedMarkdown = this.extractImages(processedMarkdown, content);

    // Process remaining text content
    this.processRemainingContent(processedMarkdown, content);

    return content.filter(item => {
      // Filter out empty text blocks
      if (item.type === 'text' && (!item.content || item.content.trim() === '')) {
        return false;
      }
      return true;
    });
  }

  private static extractCallouts(markdown: string, content: ILogContent[]): string {
    return markdown.replace(this.CALLOUT_REGEX, (match, type, text) => {
      const variant = type.toLowerCase() as "info" | "warning" | "success" | "danger";
      content.push({
        type: "callout",
        variant,
        content: text.trim(),
      });
      return ''; // Remove from markdown
    });
  }

  private static extractCodeBlocks(markdown: string, content: ILogContent[]): string {
    return markdown.replace(this.CODE_BLOCK_REGEX, (match, language = 'text', options = '', code) => {
      const optionsParsed = this.parseCodeOptions(options);
      content.push({
        type: "code",
        content: code.trim(),
        language,
        fileName: optionsParsed.fileName,
        highlightLines: optionsParsed.highlightLines,
      });
      return ''; // Remove from markdown
    });
  }

  private static extractTimelines(markdown: string, content: ILogContent[]): string {
    return markdown.replace(this.TIMELINE_REGEX, (match, timelineContent) => {
      const items = this.parseTimelineContent(timelineContent);
      if (items.length > 0) {
        content.push({
          type: "timeline",
          items,
        });
      }
      return '';
    });
  }

  private static extractMetrics(markdown: string, content: ILogContent[]): string {
    return markdown.replace(this.METRICS_REGEX, (match, metricsContent) => {
      const items = this.parseMetricsContent(metricsContent);
      if (items.length > 0) {
        content.push({
          type: "metrics",
          items,
        });
      }
      return '';
    });
  }

  private static extractTables(markdown: string, content: ILogContent[]): string {
    return markdown.replace(this.TABLE_REGEX, (match, headerRow, bodyRows) => {
      const headers = headerRow.split('|').map((h: string) => h.trim()).filter((h: string) => h);
      const rows = bodyRows.trim().split('\n').map((row: string) => 
        row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
      );

      content.push({
        type: "table",
        headers,
        rows,
      });
      return '';
    });
  }

  private static extractImages(markdown: string, content: ILogContent[]): string {
    return markdown.replace(this.IMAGE_REGEX, (match, alt, src, caption) => {
      content.push({
        type: "image",
        src,
        alt,
        caption,
      });
      return '';
    });
  }

  private static processRemainingContent(markdown: string, content: ILogContent[]): void {
    const lines = markdown.split('\n');
    let currentBlock = '';
    let blockType: 'text' | 'heading' | 'list' = 'text';
    let listItems: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines
      if (!line) {
        if (currentBlock.trim()) {
          this.addTextBlock(content, currentBlock.trim(), blockType);
          currentBlock = '';
          blockType = 'text';
        }
        if (listItems.length > 0) {
          content.push({ type: "list", items: [...listItems] });
          listItems = [];
        }
        continue;
      }

      // Check for headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        // Flush current block
        if (currentBlock.trim()) {
          this.addTextBlock(content, currentBlock.trim(), blockType);
          currentBlock = '';
        }
        if (listItems.length > 0) {
          content.push({ type: "list", items: [...listItems] });
          listItems = [];
        }

        const level = headingMatch[1].length;
        const text = headingMatch[2];
        
        if (level === 1) {
          content.push({ type: "hero", content: text });
        } else if (level === 2) {
          content.push({ type: "heading", content: text });
        } else {
          content.push({ type: "subheading", content: text });
        }
        continue;
      }

      // Check for list items
      const listMatch = line.match(/^[-*+]\s+(.+)$/) || line.match(/^\d+\.\s+(.+)$/);
      if (listMatch) {
        if (currentBlock.trim()) {
          this.addTextBlock(content, currentBlock.trim(), blockType);
          currentBlock = '';
          blockType = 'text';
        }
        listItems.push(listMatch[1]);
        continue;
      }

      // Regular text
      if (listItems.length > 0) {
        content.push({ type: "list", items: [...listItems] });
        listItems = [];
      }

      currentBlock += (currentBlock ? ' ' : '') + line;
    }

    // Flush remaining content
    if (currentBlock.trim()) {
      this.addTextBlock(content, currentBlock.trim(), blockType);
    }
    if (listItems.length > 0) {
      content.push({ type: "list", items: listItems });
    }
  }

  private static addTextBlock(content: ILogContent[], text: string, type: 'text' | 'heading' | 'subheading' | 'hero'): void {
    if (text.trim()) {
      content.push({ type, content: text });
    }
  }

  private static parseCodeOptions(options: string): { fileName?: string; highlightLines?: number[] } {
    const result: { fileName?: string; highlightLines?: number[] } = {};
    
    if (!options) return result;

    // Parse fileName (file:example.ts)
    const fileMatch = options.match(/file:([^\s,]+)/);
    if (fileMatch) {
      result.fileName = fileMatch[1];
    }

    // Parse highlight lines (highlight:1,3-5,7)
    const highlightMatch = options.match(/highlight:([0-9,-]+)/);
    if (highlightMatch) {
      const lines: number[] = [];
      const parts = highlightMatch[1].split(',');
      
      parts.forEach(part => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            lines.push(i);
          }
        } else {
          lines.push(Number(part));
        }
      });
      
      result.highlightLines = lines;
    }

    return result;
  }

  private static parseTimelineContent(content: string): Array<{ time: string; title: string; description: string }> {
    const items: Array<{ time: string; title: string; description: string }> = [];
    const lines = content.trim().split('\n');
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      // Expected format: "2024-01-01 | Setup | Initial project setup"
      const match = line.match(/^(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)$/);
      if (match) {
        items.push({
          time: match[1].trim(),
          title: match[2].trim(),
          description: match[3].trim(),
        });
      }
    }
    
    return items;
  }

  private static parseMetricsContent(content: string): Array<{ label: string; value: string | number; change?: string; trend?: "up" | "down" | "neutral" }> {
    const items: Array<{ label: string; value: string | number; change?: string; trend?: "up" | "down" | "neutral" }> = [];
    const lines = content.trim().split('\n');
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      // Expected format: "Users | 1,234 | +12% | up"
      const match = line.match(/^(.+?)\s*\|\s*(.+?)(?:\s*\|\s*(.+?))?(?:\s*\|\s*(up|down|neutral))?$/);
      if (match) {
        items.push({
          label: match[1].trim(),
          value: match[2].trim(),
          change: match[3]?.trim(),
          trend: match[4]?.trim() as "up" | "down" | "neutral" | undefined,
        });
      }
    }
    
    return items;
  }
}

// Helper function for easy parsing
export const parseMarkdown = (markdown: string): ILogContent[] => {
  return MarkdownParser.parse(markdown);
};

// Enhanced markdown with custom syntax examples
export const MARKDOWN_EXAMPLES = {
  basic: `# My First Blog Post

This is a hero section that introduces the post.

## Getting Started

Here's some regular text content explaining the concepts.

### Code Example

\`\`\`typescript[file:example.ts,highlight:1,3-5]
import { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

### Important Note

> [!INFO] This is an info callout
> You can use these to highlight important information.

> [!WARNING] Warning Title
> This is a warning message with a custom title.

## Features

- Easy to use
- TypeScript support
- Great performance
- Modern design

## Project Timeline

> [!TIMELINE]
> 2024-01-01 | Planning | Initial project planning and research
> 2024-01-07 | Development | Core feature development
> 2024-01-14 | Testing | Quality assurance and bug fixes
> 2024-01-21 | Launch | Project launch and deployment

## Metrics

> [!METRICS]
> Users | 1,234 | +12% | up
> Revenue | $5,678 | +23% | up
> Conversion | 3.4% | -0.2% | down

![Project Screenshot](/images/screenshot.png "Main dashboard view")

| Feature | Status | Priority |
|---------|--------|----------|
| Authentication | Complete | High |
| Dashboard | In Progress | Hashnode |
| Analytics | Planned | Low |`,

  tutorial: `# Building a React Component Library

Learn how to create reusable components for your team.

## What You'll Build

A complete component library with:
- TypeScript support
- Storybook documentation  
- Automated testing
- NPM publishing

## Prerequisites

- Node.js 18+
- Basic React knowledge
- Understanding of TypeScript

\`\`\`bash[file:setup.sh]
npm create vite@latest my-components --template react-ts
cd my-components
npm install
\`\`\`

> [!INFO] Pro Tip
> Use Vite for faster development builds and better DX.

## Component Structure

\`\`\`typescript[file:Button.tsx,highlight:1-3,8-10]
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        outline: 'border border-input',
      }
    }
  }
);

export interface ButtonProps {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}
\`\`\`

> [!SUCCESS] Checkpoint
> You now have a basic button component with variants!`,
};
