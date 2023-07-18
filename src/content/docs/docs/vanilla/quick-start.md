---
title: Quick-Start Template
description: A simple HTML template for embedding TypeIt on a page.
---

If you're looking for a super simple template for how TypeIt would ideally be loaded on an HTML page, here you go:

```html
<html>
  <head></head>
  <body>
    <!-- A root element for TypeIt to target. -->
    <span id="myElement"></span>

    <!-- The script itself, loaded AFTER your root element. -->
    <script src="https://unpkg.com/typeit@@{TYPEIT_VERSION}/dist/index.umd.js"></script>
    <script>
      new TypeIt("#myElement", {
        strings: "This is what will be typed!",
      }).go();
    </script>
  </body>
</html>
```
