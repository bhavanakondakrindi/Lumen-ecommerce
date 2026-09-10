# Adding real product photos

The site now lists 23 real, currently-sold products. Until you drop real
photos into this folder, every product will show a clean
"Photo coming soon" placeholder instead of a broken image icon — so the
site always looks tidy, even before you've added anything.

## Fastest way: run the downloader script (recommended)

From the project root (one folder up from this one), run:

```
pip install icrawler
python3 download_images.py
```

This searches the web and saves one real photo per product straight into
this folder with the correct filename already matched to `js/products.js`.
It needs to run on **your own computer** (not a sandbox) so it has normal
internet access. Takes about a minute for all 23 products.

Automated image search occasionally grabs a slightly-off photo (wrong
color, an accessory instead of the device, etc.) — after it runs, skim
through `images/` and manually re-save any that look wrong, using the
table below.

## Manual way (if you'd rather pick photos yourself)

Save one photo per product into this folder using the **exact filename**
listed below. JPG or PNG both work — just keep it as `.jpg` to match what's
wired into the code, or edit the `image:` field in `js/products.js` if you'd
rather use `.png`.

## Exact filenames 

| Product | Filename |
|---|---|
| iPhone 16 Pro | `iphone-16-pro.jpg` (+ optional second angle `iphone-16-pro-2.jpg`) |
| Galaxy S25 Ultra | `galaxy-s25-ultra.jpg` |
| Pixel 9 Pro | `pixel-9-pro.jpg` |
| MacBook Pro 14" (M4) | `macbook-pro-14-m4.jpg` |
| Dell XPS 14 | `dell-xps-14.jpg` |
| Alienware Aurora R16 | `alienware-aurora-r16.jpg` |
| Galaxy Tab S10+ | `galaxy-tab-s10-plus.jpg` |
| Xbox Wireless Controller | `xbox-wireless-controller.jpg` |
| Razer BlackWidow V4 Pro | `razer-blackwidow-v4-pro.jpg` |
| Logitech G923 Racing Wheel | `logitech-g923.jpg` |
| Amazon Echo Dot (5th Gen) | `echo-dot-5th-gen.jpg` |
| Philips Hue White & Color Bulb | `philips-hue-bulb.jpg` |
| Ring Video Doorbell (2nd Gen) | `ring-video-doorbell.jpg` |
| Sony Alpha a7 IV | `sony-alpha-a7iv.jpg` |
| Canon RF 35mm f/1.8 Macro | `canon-rf-35mm.jpg` |
| Sony WH-1000XM5 | `sony-wh1000xm5.jpg` |
| Apple AirPods Pro 2 | `airpods-pro-2.jpg` |
| Sonos Era 100 | `sonos-era-100.jpg` |
| Apple Watch Series 10 | `apple-watch-series-10.jpg` |
| Oura Ring 4 | `oura-ring-4.jpg` |
| Logitech MX Master 3S | `logitech-mx-master-3s.jpg` |
| Anker 553 USB-C Hub | `anker-553-hub.jpg` |
| Logitech Desk Mat Studio Series | `logitech-desk-mat.jpg` |

## Tip: recommended photo shape
Product cards and the gallery are square (1:1). A photo that's roughly
square, with the product centred on a plain background, will look the
cleanest — most official press photos are shot this way already.
