---
layout: ../ContentLayout.astro
title: Why Your Website Should Use Modern Image Formats
description: With respect to performance, the format you choose for your site's images can have a huge impact on your site's performance and overall user experience.
---

For years now, Google and other search engines have made it quite clear that [page performance matters](https://developers.google.com/search/blog/2020/11/timing-for-page-experience) in how websites rank in search results. As a part of that effort to improve digital experiences, Google introduced its [Core Web Vitals](https://web.dev/vitals/) -- a set of specific, real-world metrics site owners can use to monitor and improve the performance of their pages over time.

## How Images Impact Core Web Vitals

Often being the largest asset on a page, how you format your images are critical to the health of these metrics. Three of them are particularly sensitive to your site's images:

**[Largest Contentful Paint (LCP)](https://web.dev/lcp/)** measures how long it takes for the biggest chunk of content to be visible to the user's viewport. Using heavy, antiquated images forces the user to wait longer for that content to become rendered, compromising page experience.

**[Cumulative Layout Shift (CLS)](https://web.dev/cls/)** is concerned with how much "jank", or unexpected layout shift occurs when a page is visited. Especially if you're not [setting dimension attributes on your images](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/), poorly-optimized images can lengthen the amount of time it takes for a page to become "settled," worsening metrics like CLS.

**[Interaction to Next Paint (INP)](https://web.dev/inp/)** all about how long it takes for your page to respond to any user action (a click, scroll, form submission -- anything). Responding to these actions firmly depends on the browser's main thread having the bandwidth to do the work and communicate over the network if needed. All of that's made more difficult when large images being downloaded over long periods of time, hogging CPU resources and network capacity.

## What Formatting Matters

There are some obvious things you can do to improve image performance -- like keep them at appropriate sizes and exporting them at an appropriate quality. But more specifically, choosing the right _format_ can have a larger impact than you might think. Thankfully, modern browsers have been rolling out support for modern formats that significantly reduce image size, while supporting features like transparent backgrounds and GIF-like animations. Three of them are the most notable.

## What is WebP?

WebP was first introduced by Google [back in 2010](https://encyclopedia.pub/entry/31288#:~:text=1.-,History,files%20for%20comparable%20image%20quality.), and it's since seen [extremely good support across all major browsers](https://caniuse.com/webp). It's so good, in fact, that many websites now use it as the default target format for their images.

The benefits to treating WebP are many. The format was specifically engineered for the web, offering lossless and lossy compression, and offer notable savings in file size compared to more traditional formats. It will greatly depend on the image, the original format, but your average lossless conversion [saves around ~30% in file size](https://developers.google.com/speed/webp) on average. And if you go with a lossy transformation that's usually indistinquishable, those savings can get as high as 70%.

## What is AVIF?

The AVIF format is newer to the scene, but offers some exciting results in image optimization. It's based on the AV1 video codec and was introduced in 2019. Depending on the image, it can offer even greater savings than the WebP version of an image, and [also supports animated images](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#avif).

The downside to the AVIF format, however, is its browser support. It's _good_, [but not _great_](https://caniuse.com/avif), which may bring hesitancy in some website owners looking to use it on their sites. Even so, using tools like the HTML <picture> element, which allow you to set a fallback strategy for image formats, or just by analyzing your traffic patterns, it may be worth considering.

## What is JPEG XL?

By far, JPEG XL offers the least [limited browser support](https://caniuse.com/jpegxl) (it's basically nothing), but is still causing quite the excitement among industry professionals. The format was officially standardized [back in 2021](https://en.wikipedia.org/wiki/JPEG_XL), and aims to become the [universal replacement for raster graphics](https://jpegxl.io/articles/faq/#whatisajpegxlfile?) in the coming years. Unlike WebP and AVIF, it was designed from the ground-up with "image architecture" in mind. It's not a spin-off for any sort of video format.

JPEG XL is a format championing efficiency and backward-compability. It touts progressive decoding options (allowing you to do things like begin to render a partially downloaded image), and it can still be easily converted into its JPEG counterpart. While it's not ready for the mainstream web yet, JPEG XL could have a large influence in the overall efficiency of downloading, decoding, and rendering high-quality images on the web.

## Where Do I Start?

It's not possible to snap your fingers and reformat every image on your website. But there some specific steps you can take to improve your image performance more generally.

### 1. Measure your overall page performance.

Use tools like [PageSpeed Insights](https://pagespeed.web.dev/) or WebPageTest.org(https://www.webpagetest.org/) to begin collecting data on how your site's performing, including how serious image performance is for your site. Having data in hand is critical to prioritizing strategies and making a plan.

### 2. Lazy load where you can.

[Lazy loading is natively supported](https://web.dev/browser-level-image-lazy-loading/) in all major browers, and can be activated simply by adding a "loading='lazy'" attribute to your images. Doing this will defer image downloads until they're absolutely necessary, reducing network contention and the amount of raw data a user is required to download to experience your website. Just make sure you do it only for images not seen on a page when it's first loaded.

### 3. See how much a modern image format could save you.

If image size or format is called out on the performance reports you run, see what kind of savings you could get by reformatting your images with [TypeIt's analysis tool](https://www.TypeIt.dev/analyze). It'll crawl your site and generate a report on how much overall page weight you could cut simply by optimizing your images, as well as a detailed breakdown of how each image could benefit. If it makes sense, formatting those images could be as simple as signing up for TypeIt and prefixing the URLs of the images you'd like to instantly optimize.

## Don't Sleep on Image Peformance

Especially in the chaos of day-to-day life, it's easy to sleep on this stuff and let is slip down the list of your digital marketing priorities. But there's a great deal of risk in doing so. Things may not be "broken" now, but you don't want to wake up one day and realize that Google and other search engines have been penalizing your site due to its poor performance experience. And because of their inherently large size and role in effective experiences, images are a great place to start.
