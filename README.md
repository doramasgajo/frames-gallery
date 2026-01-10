# The Frames Gallery
**The Frames Gallery** is a media gallery for displaying videogames screen shots and video captures.

![Node.js](https://img.shields.io/badge/Node.js-800080?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-800080?logo=react&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-800080?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-800080?logo=javascript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-800080?logo=css&logoColor=white)

[The Frames Gallery **website**](https://framesgallery.doramasgajo.com/)  
[The Frames Gallery **latest release**](https://github.com/doramasgajo/frames-gallery/releases/latest)  
[The Frames Gallery **repository**](https://github.com/doramasgajo/frames-gallery)  
![Thumbnail](https://res.cloudinary.com/doramasgajo/image/upload/v1768007286/frames-gallery-thumbnail_timyok.png)

## :sparkles: Features
- Beautiful responsive gallery
- Tag friends in screenshots
- Detailed view with metadata
- Zoom screenshots

## :rocket: Getting started
Before starting, make sure you have `Node.js` installed in your system.

Clone the repository:
```bash
git clone https://github.com/doramasgajo/frames-gallery.git
```

Navigate into the project folder:
```bash
cd frames-gallery
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

Create an optimized production build:
```bash
npm run build
```

## :framed_picture: Adding images to the gallery
To add new images, you need to edit the `images.js` file inside the `data` folder.

Add a new object following this structure:

```javascript
export const images = [
    {
        id: 7,
        url: "image-url-here",
        title: "Epic Boss Fight",
        game: "Elden Ring",
        date: "2024-03-15",
        description: "Final battle against the final boss",
        tagged: [],
    }
];
```

### Field descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Unique identifier for each screenshot. Use the next available number. |
| `url` | string | Yes | Direct URL to the screenshot image. Must be a valid image URL. |
| `title` | string | Yes | Title or name for the screenshot. |
| `game` | string | Yes | Name of the video game the screenshot is from. |
| `date` | string | Yes | Date the screenshot was taken, in `YYYY-MM-DD` format. |
| `description` | string | Yes | Brief description of what's happening in the screenshot. |
| `tagged` | array | No | Array of tagged users. See tagging options below. |

### Tagging people

The `tagged` field supports multiple formats:

```javascript
// Simple format
tagged: ["@martin_tg", "@player123"]

// Extended format (with urls)
tagged: [
    { name: "@john_doe", url: "https://example.com/john" },
    { name: "@jane_gamer", url: "https://example.com/jane" }
]

// Mixed format 
tagged: [
    { name: "@john_doe", url: "https://example.com/john" },
    "@martin_tg",
    "@player123"
]
```

### Complete example

```javascript
export const images = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc",
        title: "Stunning Sunset Vista",
        game: "The Legend of Zelda: Breath of the Wild",
        date: "2024-01-15",
        description: "Caught this amazing sunset while exploring Hyrule",
        tagged: ["@user"]
    }
];
```
