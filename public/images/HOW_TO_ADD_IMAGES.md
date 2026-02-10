# Adding Images to Your Next.js Site

This guide explains how to add images to your church website.

## Where to Place Images

All images should be placed in the `public/images/` folder.

## Required Images

### Hero Images (1920x1080 recommended)
These appear at the top of each page:

- `hero-home.jpg` - Church exterior or welcoming interior
- `hero-about.jpg` - Church building or community gathering
- `hero-ministries.jpg` - People in ministry/fellowship
- `hero-sermons.jpg` - Worship service or pastor preaching
- `hero-events.jpg` - Church event or gathering
- `hero-live.jpg` - Worship service in progress
- `hero-give.jpg` - Hands giving or serving

### Sermon Thumbnails (800x450 recommended)
For the sermon cards on the home page and sermons page:

- `sermon-1.jpg`
- `sermon-2.jpg`
- `sermon-3.jpg`
- `sermon-4.jpg`
- `sermon-5.jpg`
- `sermon-6.jpg`

## How to Add Images

1. Prepare your images (JPEG or PNG format)
2. Rename them according to the list above
3. Copy them to `public/images/` folder
4. Restart your development server if it's running
5. Images will automatically appear on the website

## Tips for Good Images

- **Size**: Keep file sizes under 500KB for faster loading
- **Dimensions**: Maintain 16:9 aspect ratio for hero images
- **Quality**: Use high-quality photos that represent your church well
- **Format**: JPEG for photos, PNG for graphics with transparency

## Optimizing Images

For production, consider:
- Using Next.js Image component (already implemented in code)
- Compressing images with tools like TinyPNG or Squoosh
- Using WebP format for better compression
