# 📸 Responsive Image Gallery with Slider

A modern, feature-rich image gallery built with **Next.js** and **React**. This project demonstrates best practices in responsive design, state management, and JavaScript array methods.

## Features

### Gallery Component
- **Responsive Grid Layout**: Automatically adjusts to different screen sizes using CSS Grid
- **Lazy Loading**: Images load on-demand for better performance
- **Infinite Scroll**: Load more images with the "Load More" button
- **Keyboard Navigation**: Tab through images
- **Author Information**: Displays photographer's name on hover

### Modal Slider
- **Fullscreen Viewing**: Beautiful modal for immersive image viewing
- **Touch Gestures**: Swipe left/right to navigate on mobile devices
- **Keyboard Shortcuts**:
  - `ArrowRight` / `ArrowLeft`: Navigate between images
  - `Escape`: Close the modal
- **Thumbnail Strip**: Quick navigation via thumbnail preview
- **Image Counter**: Current position in the gallery
- **Image Preloading**: Smooth transitions between images
- **Responsive Design**: Works on all device sizes
- **Error Handling**: Graceful fallback with retry functionality



### Accessibility Features
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Focus-visible indicators
- Screen reader friendly
- Touch-friendly buttons (50px minimum size)

### Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Flexible Typography**: Uses `clamp()` for fluid scaling
- **Touch Support**: Optimized for touch interactions
- **Adaptive Grid**: Auto-fill/auto-fit grid columns
- **Viewport Meta Tag**: Proper scaling on mobile devices

## Getting Started

### Prerequisites
- Node.js 12.0 or higher
- npm or yarn package manager

### Installation



1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
nextjs-image-gallery/
├── pages/
│   ├── _app.js                 # Next.js app wrapper with global styles
│   └── index.js               # Home page (Gallery entry point)
├── src/
│   └── components/
│       ├── Gallery.js         # Main gallery component
│       ├── ModalSlider.js     # Full-screen modal slider
│       └── LoopExamples.js    # JavaScript looping techniques demo
├── styles/
│   └── globals.css            # Global styles and utilities
├── public/                    # Static assets
├── package.json              # Project dependencies
└── next.config.js            # Next.js configuration
```

## 🔌 API Integration

This project uses the **Picsum Photos API** for fetching images:

- **Endpoint**: `https://picsum.photos/v2/list`
- **Features**:
  - No authentication required
  - High-quality images
  - Author information included
  - Fast response times
  - Good rate limits

### Alternative API: JSONPlaceholder

You can switch to JSONPlaceholder Photos API by modifying the fetch URL in `Gallery.js`:
```javascript
const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=30");
```

## Component Documentation

### Gallery.js
Main gallery component that fetches and displays images in a responsive grid.

**Props**: None (uses internal state)

**State**:
- `photos`: Array of photo objects from API
- `loading`: Loading state
- `error`: Error message if fetch fails
- `selectedIndex`: Currently selected image index
- `displayCount`: Number of images to display (for pagination)

**Key Features**:
- Fetches images on component mount
- Lazy loading for images
- Pagination with "Load More" button
- Click to open fullscreen modal
- Keyboard accessibility

### ModalSlider.js
Full-screen modal component for viewing images.

**Props**:
- `photos`: Array of photo objects
- `index`: Currently displayed image index
- `onClose`: Callback to close the modal

**Key Features**:
- Keyboard navigation (arrows, escape)
- Touch/swipe gestures on mobile
- Image preloading for smooth transitions
- Thumbnail strip for quick navigation
- Error handling with retry
- Responsive sizing with CSS clamp()



**Key Features**:
- Expandable/collapsible examples
- Live demonstrations of each technique
- Code snippets
- Result outputs
- Detailed descriptions

## 🎨 Styling & CSS

### Global Styles (`styles/globals.css`)
- Reset and normalization
- CSS animations (@keyframes fadeIn, spin, slideIn)
- Responsive typography using `clamp()`
- Accessibility utilities
- Dark mode support (prefers-color-scheme)
- Print styles
- Utility classes

### Inline Styles
Components use inline styles for dynamic styling. This approach:
- Keeps styles close to components
- Allows dynamic styling based on state
- Works well with Next.js SSR

## Responsive Breakpoints

The gallery adapts to all screen sizes:
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Small Desktop**: 768px - 1024px
- **Desktop**: > 1024px

##  Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Right` | Next image in modal |
| `Arrow Left` | Previous image in modal |
| `Escape` | Close modal |
| `Tab` | Navigate through gallery items |
| `Enter` / `Space` | Open image in modal |

##  API Response Example

```json
[
  {
    "id": "1",
    "author": "Paul Jarvis",
    "width": 2500,
    "height": 1656,
    "url": "https://picsum.photos/id/1/2500/1656",
    "download_url": "https://picsum.photos/id/1/2500/1656?force=true"
  },
]
**Built with  using Next.js and React**
