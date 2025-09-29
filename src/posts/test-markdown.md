---
title: "Test Markdown"
summary: "Test the rendering of markdown"
---

---

# Markdown Test Page for SvelteKit

This is a sample page to test Markdown rendering in a SvelteKit application. It contains a variety of elements to ensure everything displays correctly.

---

## Text Formatting

Here are some examples of basic text formatting:

*   This is **bold text**.
*   This is *italic text*.
*   This is ***bold and italic text***.
*   This is `inline code`.
*   This text is ~~strikethrough~~.

## Blockquote

> "The greatest glory in living lies not in never falling, but in rising every time we fall." - Nelson Mandela

## Lists

### Unordered List
*   Item 1
*   Item 2
    *   Nested Item 2.1
    *   Nested Item 2.2
*   Item 3

### Ordered List
1.  First item
2.  Second item
3.  Third item
    1.  Indented item 3.1
    2.  Indented item 3.2

### Task List
- [x] Complete project setup
- [x] Create Markdown renderer component
- [ ] Write tests for the renderer

## Code Block

Here's an example of a JavaScript code block with syntax highlighting:

```javascript
// lib/utils.js
export function greet(name) {
  return `Hello, ${name}! Welcome to our SvelteKit app.`;
}
```

## Table

| Framework | Language      | Website                  |
| :-------- | :------------ | :----------------------- |
| SvelteKit | JavaScript    | https://kit.svelte.dev   |
| Vue       | JavaScript    | https://vuejs.org        |
| React     | JavaScript    | https://react.dev        |
| Angular   | TypeScript    | https://angular.io       |

## Mathematical Equations

You can include mathematical notation using LaTeX.

### Inline Math
This is an example of inline math, which blends in with the text. For example, the Pythagorean theorem is written as \(a^2 + b^2 = c^2\). This is useful for short formulas like $E=mc^2$.

### Display Math (Math Mode)
For more complex equations, you can use display math, which puts the equation on its own line and centers it. A classic example is the quadratic formula:

$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $

Or the definition of Euler's number:

$e = \sum_{n=0}^{\infty} \frac{1}{n!} $

## Link and Image

You can visit the [SvelteKit documentation](https://kit.svelte.dev/docs) for more information.

![Svelte Logo](https://svelte.dev/svelte-logo-horizontal.svg)

## Headings

### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

And finally, some emoji! 🚀✨🎉

