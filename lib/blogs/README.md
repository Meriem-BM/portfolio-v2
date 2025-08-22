# Blog Content Management System

A comprehensive, type-safe system for creating and managing blog content with support for multiple content types, markdown parsing, and easy content creation.

## 🚀 Quick Start

### 1. Create Content with Builder API

```typescript
import { createContent, createBlogPost } from '@/lib/blogs/contentBuilder';

// Build content using the fluent API
const content = createContent()
  .hero("Introduction to your blog post")
  .heading("Main Section")
  .text("Regular paragraph content")
  .code(`console.log('Hello World');`, "javascript")
  .info("This is an info callout")
  .list(["Item 1", "Item 2", "Item 3"])
  .build();

// Create a complete blog post
const post = createBlogPost()
  .id(1)
  .title("My Blog Post")
  .date("2024-01-15")
  .tags(["tutorial", "javascript"])
  .content(content)
  .build();
```

### 2. Create Content from Markdown

```typescript
import { addBlogPostFromMarkdown } from '@/lib/blogs/contentManager';

const markdownContent = `
# My Blog Post

This is a hero section introducing the post.

## Getting Started

Here's some regular content.

\`\`\`typescript[file:example.ts,highlight:1,3-5]
const example = "code with syntax highlighting";
function myFunction() {
  return "highlighted lines";
}
\`\`\`

> [!INFO] Important Note
> This creates an info callout with custom syntax.

- List item 1
- List item 2
- List item 3
`;

addBlogPostFromMarkdown("my-post", {
  id: 1,
  title: "My Blog Post",
  excerpt: "A short description",
  date: "2024-01-15",
  tags: ["tutorial", "typescript"]
}, markdownContent);
```

## 📝 Supported Content Types

### Text Content
- **Hero**: Large intro text with gradient background
- **Heading**: Main section headings with accent line
- **Subheading**: Subsection headings
- **Text**: Regular paragraph content
- **Markdown**: Raw HTML/Markdown content

### Code & Technical
- **Code**: Syntax-highlighted code blocks with copy button
- **Interactive**: Hover-effect content blocks

### Lists & Structure
- **List**: Bulleted or numbered lists
- **Timeline**: Event timeline with dates
- **Table**: Data tables with headers
- **Accordion**: Collapsible content sections
- **Tabs**: Tabbed content organization

### Visual Content
- **Image**: Images with captions and sizing
- **Video**: Video content with posters
- **Separator**: Visual dividers (line, dots, gradient)

### Callouts & Highlights
- **Callout**: Info, warning, success, danger callouts
- **Quote**: Blockquotes with attribution
- **Metrics**: Key performance indicators with trends

### Layout Components
- **Two-Column**: Side-by-side content layout
- **Embed**: External content embeds

## 🎨 Builder API Reference

### Content Builder Methods

```typescript
const content = createContent()
  // Text content
  .hero("Hero text")
  .heading("Section heading")
  .subheading("Subsection heading")
  .text("Paragraph content")
  .markdown("<p>Raw HTML</p>")
  
  // Code blocks
  .code("const x = 1;", "typescript", { 
    fileName: "example.ts", 
    highlightLines: [1, 3] 
  })
  
  // Lists
  .list(["Item 1", "Item 2"], false) // ordered: false
  
  // Callouts
  .info("Info message", "Optional Title")
  .warning("Warning message")
  .success("Success message")
  .danger("Danger message")
  
  // Media
  .image("/path/to/image.jpg", "Alt text", { 
    caption: "Image caption",
    width: 800,
    height: 600 
  })
  .video("/path/to/video.mp4", { 
    poster: "/poster.jpg",
    caption: "Video caption" 
  })
  
  // Structure
  .timeline([
    { time: "2024-01", title: "Event", description: "Description" }
  ])
  .table(["Header 1", "Header 2"], [["Row 1", "Data"], ["Row 2", "Data"]])
  .metrics([
    { label: "Users", value: "1,234", change: "+12%", trend: "up" }
  ])
  
  // Layout
  .separator("gradient") // "line" | "dots" | "gradient"
  .twoColumn(leftContent, rightContent)
  .tabs([
    { label: "Tab 1", content: [/* content array */] }
  ])
  .accordion([
    { title: "Section", content: [/* content array */] }
  ])
  
  .build();
```

### Blog Post Builder

```typescript
const post = createBlogPost()
  .id(1)
  .title("Blog Post Title")
  .excerpt("Short description for previews")
  .date("2024-01-15")
  .tags(["tag1", "tag2"])
  .readTime("5 min") // Auto-calculated if not provided
  .heroGradient("from-blue-500 to-purple-500")
  .reactions(0)
  .content(contentArray)
  .build();
```

## 📐 Enhanced Markdown Syntax

Our markdown parser supports extended syntax for rich content:

### Code Blocks with Options
```
\`\`\`typescript[file:example.ts,highlight:1,3-5]
const example = "code";
function highlighted() {
  return "lines 1, 3-5 are highlighted";
}
\`\`\`
```

### Callouts
```
> [!INFO] Optional Title
> This creates an info callout

> [!WARNING] 
> Warning message

> [!SUCCESS]
> Success message

> [!DANGER]
> Danger message
```

### Timeline
```
> [!TIMELINE]
> 2024-01-01 | Planning | Initial project planning
> 2024-01-07 | Development | Core feature development
> 2024-01-14 | Launch | Project launch
```

### Metrics
```
> [!METRICS]
> Users | 1,234 | +12% | up
> Revenue | $5,678 | +23% | up
> Bounce Rate | 2.1% | -0.5% | down
```

## 🔧 Content Management

### Adding Posts
```typescript
import { ContentManager } from '@/lib/blogs/contentManager';

// Add a post directly
ContentManager.addPost("slug", blogPostObject);

// Add from markdown
ContentManager.addPostFromMarkdown("slug", metadata, markdownString);
```

### Retrieving Content
```typescript
// Get single post
const post = getBlogPost("slug");

// Get all posts
const posts = getAllBlogPosts();

// Get posts by tag
const posts = ContentManager.getPostsByTag("javascript");

// Search posts
const results = ContentManager.searchPosts("typescript");
```

### Validation
```typescript
const validation = ContentManager.validatePost(post);
if (!validation.isValid) {
  console.error("Validation errors:", validation.errors);
}
```

## 📊 Content Statistics

```typescript
import { getContentStats } from '@/lib/blogs/contentBuilder';

const stats = getContentStats(content);
// Returns: {
//   totalBlocks: number,
//   wordCount: number,
//   codeBlocks: number,
//   images: number,
//   videos: number,
//   tables: number,
//   estimatedReadTime: string
// }
```

## 🎯 Pre-built Templates

```typescript
import { templates } from '@/lib/blogs/contentBuilder';

// Technical tutorial template
const tutorialContent = templates.tutorial(
  "Tutorial Title",
  "Tutorial description"
);

// Project showcase template  
const showcaseContent = templates.showcase(
  "Project Name",
  "Project description",
  "https://demo-url.com"
);

// Learning log template
const learningContent = templates.learningLog(
  "Learning Title", 
  "What I learned description"
);
```

## 🚀 Examples

Check out `/lib/blogs/examples.ts` for complete examples showing:

1. **Technical Tutorial**: Advanced patterns with code, callouts, tabs, and metrics
2. **Markdown Content**: Using enhanced markdown syntax
3. **Project Showcase**: Media-rich content with two-column layouts

## 🔍 Type Safety

The entire system is fully typed with TypeScript:

- Content types are strictly defined
- Builder methods provide IntelliSense
- Validation catches errors early
- Renderer handles all content types safely

## 🎨 Styling

All content is rendered with:
- Dark theme optimized colors
- Smooth animations and transitions
- Responsive design
- Accessibility considerations
- Copy-to-clipboard for code blocks
- Syntax highlighting
- Interactive hover effects

## 📚 Best Practices

1. **Use the Builder API** for complex content with mixed types
2. **Use Markdown** for text-heavy content with simple formatting
3. **Validate content** before publishing
4. **Use templates** as starting points for common post types
5. **Include alt text** for images
6. **Provide captions** for media content
7. **Use semantic content types** rather than generic text blocks

## 🔧 Extending the System

To add new content types:

1. Add the interface to `/types/index.ts`
2. Update the `ILogContent` union type
3. Add rendering logic to `ContentRenderer.tsx`
4. Add builder methods to `contentBuilder.ts`
5. Update markdown parser if needed

This system is designed to be extensible and maintainable while providing an excellent developer experience for content creation.
