---
title: Frequently Asked Questions
description: Some common questions about PicPef.
---

**1. What happens if an error occurs during the optimization process? Will my images not load?**

If something goes wrong while optimizing an image or retrieving it from the cache, the last thing you want is nothing to appear. TypeIt prevents this by falling back to the actual image when anything goes awry. If any sort of exception occurs, the image will be fetched from the original source and returned in the response. The image won't be optimized, but at least you won't be left with a broken, barren page.

**2. What happens if I suspend my subscription while my site is still using TypeIt links?**

We'll just serve the original image. No optimizations will occur, no cache headers will be applied, and no network-level caching will be implemented. There will be no value added to anything, but you'll still get images rendered to your page while you migrate links. We'll keep those links active for at least 30 days. If you need an extension, just ask.

**3. What if I blow past my page view limit?**

We'll notice and talk about it. We won't pull the rug out from under you or anything drastic like that. If it's a fluke, that's fine. But if it's more sustained, we might consider modifying your subscription to support the activity.

**4. I changed the source image. Why is the new version not appearing on my site?**

TypeIt _aggressively_ caches images, which means any particular file name (including query parameters) is locked to a specific version of the image. Even if the image were purged from all remote caching layers, it's also configured to be cached on a user's personal device for up to a year. For this reason, if you'd like to change the image, change the name of the file. For example, instead of `https://TypeIt.dev/https://my-image.jpg`, use `https://TypeIt.dev/https://my-image-2.jpg`.

**5. Why am I not getting a `.webp` version of my image back?**

If the converted format is a larger size than the original format, TypeIt will always serve the smaller one. This shouldn't happen for _most_ images, but may be the case for some.

**6. Are animated GIFs supported?**

Yes. Animated GIFs will be converted to a `.webp` format, and still be animated when you load it onto a page. It'll just be much lighter. For more information on supported image formats, [see here.](https://www.TypeIt.dev/docs/formats)

**7. What's the maximum image size I can use?**

Anything over a couple megabytes may result in optimization errors, causing the original image to be returned. That said, you've got other problems if you're trying to display an image of that magnitude on a page.
