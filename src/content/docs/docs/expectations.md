---
title: What to Expect
description: What TypeIt does for your images.
---

When you first request your image, you'll immediately get your original, unoptimized image back. In the background, however, here's what's happening.

1. Basic lossless optimizations are performed on the image. As a part of that, all unecessary metadata is removed, leaving just the data required to render the image.
2. A copy of the optimized image is stored in a globally-distributed cloud storage provider, for later retrieval if all other caches have expired.
3. The image is placed in a CDN network cache fast, global access.
4. The browser is giving the optimized image a `Cache-Control` header set to `public, max-age=31560000, immutable`. This is an intentionally aggressive value that will all the image to be cached for up to a year on a user's device, without any revalidation requests. What all this means: for the average user, revisiting a page with the same image will be super fast, at least in terms of image assets.

The reason you won't get the optimized image back on the initial request is to prevent any noticeable delay any time a URL is used, new or not. The alternative is to force the browser to wait for the full optimization to take place before seeing anything, which can be a problem for the first viewer of a brand new blog post or web page with images on it.

For each _subsequent_ request, the user will always get back the lighter, faster, cached version of the image.

## Keep in Mind

- These optimizations will _not_ impact the filename -- only the mime type of the image itself. So, while you see `.jpeg` at the end of your image, a different format is being served.
- The browser will **not** recieve a different image format if the original is the most optimal. Sometimes, converting an image to `.webp` actually _increases_ the file size. TypeIt only returns the lightest version, no matter what the format. It _usually_ means `.webp` is returned, but not always.
- Due to the aggressive caching strategy, if you need to update an image on a page, it's best to use a different file name.

## Verify Results

If you'd like to verify that your image is being optimized, you can check for the following things while inspecting the image request in your browser's dev tools:

- Verify that the `Cache-Control` response header is set to `public, max-age=31560000, immutable`.
- See if the `Content-Type` response header is a different format from your original image. As mentioned, if the original version was the smallest, this might be unchanged.
- Verify that you're getting an `X-TypeIt-Ratio` header. This number indicates the size of the optimized image in comparison to the original. For example, seeing this would mean that the new image is approximately 80% smaller than the original: `X-TypeIt-Ratio: 0.19168165188813791`
