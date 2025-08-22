import { createContent, createBlogPost, templates } from "./contentBuilder";
import { addBlogPostFromMarkdown } from "./contentManager";

/**
 * Example blog posts demonstrating various content types
 */

// Example 1: Technical Tutorial with Builder API
export const createTechnicalTutorial = () => {
  const content = createContent()
    .hero("In this tutorial, we'll build a modern React component library from scratch using TypeScript, Storybook, and automated testing.")
    .heading("Prerequisites")
    .list([
      "Node.js 18+ installed",
      "Basic understanding of React and TypeScript",
      "Familiarity with npm/yarn package management"
    ])
    .separator()
    .heading("Project Setup")
    .text("Let's start by creating our project structure and installing the necessary dependencies.")
    .code(`
mkdir my-component-library
cd my-component-library
npm init -y
npm install react react-dom typescript
npm install -D @types/react @types/react-dom
    `, "bash", { fileName: "setup.sh" })
    .info("We're using TypeScript for better developer experience and type safety.", "TypeScript Benefits")
    .heading("Creating Your First Component")
    .text("We'll start with a simple Button component that demonstrates various patterns.")
    .code(`
import React from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
    `, "typescript", { fileName: "Button.tsx", highlightLines: [4, 5, 6, 25, 26, 27] })
    .success("This pattern gives us type-safe variants with excellent IntelliSense support!")
    .heading("Testing Strategy")
    .text("A good testing strategy ensures your components work as expected across different scenarios.")
    .tabs([
      {
        label: "Unit Tests",
        content: [
          {
            type: "text",
            content: "Unit tests focus on individual component behavior and props."
          },
          {
            type: "code",
            language: "typescript",
            content: `
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  it('applies correct size classes', () => {
    render(<Button size="lg">Large button</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });
});
            `,
            fileName: "Button.test.tsx"
          }
        ]
      },
      {
        label: "Visual Testing",
        content: [
          {
            type: "text",
            content: "Storybook stories serve as both documentation and visual regression tests."
          },
          {
            type: "code",
            language: "typescript",
            content: `
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
            `,
            fileName: "Button.stories.tsx"
          }
        ]
      }
    ])
    .metrics([
      { label: "Bundle Size", value: "2.3 KB", trend: "down" as const, change: "-15%" },
      { label: "Test Coverage", value: "98%", trend: "up" as const, change: "+12%" },
      { label: "TypeScript Errors", value: "0", trend: "neutral" as const }
    ])
    .separator("gradient")
    .quote(
      "The best components are those that feel natural to use and require minimal documentation to understand.",
      "Dan Abramov",
      "React Team"
    )
    .heading("Publishing Your Library")
    .text("Once your components are ready, you'll want to publish them for others to use.")
    .accordion([
      {
        title: "NPM Configuration",
        content: [
          {
            type: "text",
            content: "Configure your package.json for optimal distribution."
          },
          {
            type: "code",
            language: "json",
            content: `
{
  "name": "@your-org/ui-components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
            `,
            fileName: "package.json"
          }
        ]
      },
      {
        title: "Build Process",
        content: [
          {
            type: "text",
            content: "Use Rollup or similar bundler for optimized builds."
          },
          {
            type: "list",
            items: [
              "ESM and CommonJS outputs",
              "TypeScript declaration files",
              "Tree-shaking support",
              "CSS extraction"
            ]
          }
        ]
      }
    ])
    .build();

  return createBlogPost()
    .id(101)
    .title("Building a React Component Library: The Complete Guide")
    .excerpt("Learn how to create, test, and publish a professional React component library with TypeScript, Storybook, and modern tooling.")
    .date(new Date().toISOString().split('T')[0])
    .tags(["react", "typescript", "components", "tutorial"])
    .heroGradient("from-blue-600 via-purple-600 to-indigo-600")
    .readTime("12 min")
    .reactions(0)
    .content(content)
    .build();
};

// Example 2: Using Markdown for easier content creation
export const addMarkdownExample = () => {
  const markdownContent = `# Advanced TypeScript Patterns for React Developers

TypeScript has evolved significantly, and with it, our ability to write more expressive and safe React components. Let's explore some advanced patterns that can improve your development experience.

## Generic Components

One of the most powerful features of TypeScript is generics. Here's how we can use them in React:

\`\`\`typescript[file:GenericList.tsx,highlight:1-3,12-14]
interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyState?: React.ReactNode;
}

function GenericList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyState = <p>No items found</p>
}: GenericListProps<T>) {
  if (items.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage
const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

<GenericList
  items={users}
  renderItem={user => <span>{user.name}</span>}
  keyExtractor={user => user.id}
/>
\`\`\`

> [!INFO] Type Safety
> This pattern gives us full type safety while maintaining reusability across different data types.

## Conditional Rendering Patterns

\`\`\`typescript[file:ConditionalButton.tsx]
type ConditionalButtonProps = 
  | { variant: 'link'; href: string; onClick?: never }
  | { variant: 'button'; onClick: () => void; href?: never }
  | { variant: 'submit'; onClick?: never; href?: never };

function ConditionalButton(props: ConditionalButtonProps) {
  if (props.variant === 'link') {
    return <a href={props.href}>Link Button</a>;
  }
  
  if (props.variant === 'button') {
    return <button onClick={props.onClick}>Button</button>;
  }
  
  return <button type="submit">Submit Button</button>;
}
\`\`\`

> [!SUCCESS] Union Types
> Union types help us create components that behave differently based on their props, with full type checking.

## Performance Optimization

> [!METRICS]
> Bundle Size | 245 KB | -23% | down
> First Paint | 1.2s | -0.3s | up
> TTI | 2.1s | -0.5s | up

## Key Takeaways

- Use generics for reusable components
- Leverage union types for conditional behavior
- Always measure performance impact
- Document complex patterns for your team

> [!WARNING] Remember
> Advanced patterns should solve real problems, not create complexity for its own sake.`;

  return addBlogPostFromMarkdown("advanced-typescript-patterns", {
    id: 102,
    title: "Advanced TypeScript Patterns for React Developers",
    excerpt: "Explore powerful TypeScript patterns that can improve your React development experience with better type safety and reusability.",
    date: new Date().toISOString().split('T')[0],
    tags: ["typescript", "react", "patterns", "advanced"],
    heroGradient: "from-blue-500 via-cyan-500 to-teal-500",
  }, markdownContent);
};

// Example 3: Using pre-built templates
export const createShowcasePost = () => {
  const content = templates.showcase("My Latest Project", "A comprehensive overview of my recent work building a full-stack application.")
    .image("/images/project-hero.jpg", "Project screenshot", { caption: "Main dashboard interface" })
    .heading("Technical Architecture")
    .twoColumn(
      [
        { type: "heading", content: "Frontend" },
        { type: "list", items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { type: "text", content: "The frontend leverages modern React patterns with server-side rendering for optimal performance." }
      ],
      [
        { type: "heading", content: "Backend" },
        { type: "list", items: ["Node.js", "PostgreSQL", "Redis", "Docker"] },
        { type: "text", content: "A robust API built with scalability and maintainability in mind." }
      ]
    )
    .video("/videos/demo.mp4", { caption: "Feature demonstration" })
    .build();

  return createBlogPost()
    .id(103)
    .title("Project Showcase: Full-Stack Application")
    .excerpt("Deep dive into the architecture and implementation of my latest full-stack project.")
    .date(new Date().toISOString().split('T')[0])
    .tags(["project", "fullstack", "showcase"])
    .content(content)
    .build();
};

// Export examples for easy access
export const CONTENT_EXAMPLES = {
  technical: createTechnicalTutorial,
  markdown: addMarkdownExample,
  showcase: createShowcasePost,
};

// Helper to quickly add example content to the system
export const loadExampleContent = () => {
  try {
    // Add the markdown example
    addMarkdownExample();
    console.log("✅ Loaded advanced TypeScript patterns post");
    
    // You can add more examples here
    return true;
  } catch (error) {
    console.error("❌ Failed to load example content:", error);
    return false;
  }
};
