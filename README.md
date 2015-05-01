Amazon Mechanical Turkでcaptchaのタスクを投げる時のデータ生成

# Requirements(for OSX)

- node.js (v0.12.2)
- xquartz, cairo (for canvas package)

# How to use

## Install dependencies

You may have to set `PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig`.

```sh
$ npm install
```

## generate images and csv

If you want to generate 4 images, then below.

```sh
$ node --harmony index.js 4
```
