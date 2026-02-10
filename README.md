# Westside Presbyterian Church - Next.js Site

This is a Next.js-based website for Westside Presbyterian Church, migrated from vanilla HTML/CSS/JS.

## Getting Started

### Development Server

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Features

- **Bilingual Support**: English and Korean language toggle
- **Responsive Design**: Fully responsive across all devices
- **Multiple Pages**: Home, About, Ministries, Sermons, Events, Live Worship, Give
- **Modern Stack**: Built with Next.js 15, React 19, and TypeScript

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── ministries/     # Ministries page
│   ├── sermons/        # Sermons page
│   ├── events/         # Events page
│   ├── live/           # Live worship page
│   ├── give/           # Give page
│   ├── components/     # Shared components (Header, Footer)
│   ├── data/           # Content data files
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── public/
│   └── images/         # Static images
└── README.md
```

## Content Management

### Updating Content

All content is currently embedded in the page components. To update:

1. Navigate to the respective page file in `app/[page]/page.tsx`
2. Modify the content directly in the component
3. The changes will hot-reload automatically in development

### Future Improvements

For easier content management, consider:
- Moving content to JSON files in `app/data/`
- Using a headless CMS like Contentful or Sanity
- Implementing a simple admin panel

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will auto-detect Next.js and configure build settings
4. Deploy!

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy!

## Technologies

- **Framework**: Next.js 15.5.12
- **Language**: TypeScript 5
- **Styling**: CSS Modules & Global CSS
- **Fonts**: Google Fonts (Inter, Outfit)
