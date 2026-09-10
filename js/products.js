/* ============================================================
   LUMEN — Curated Technology
   Product data. Single source of truth for the whole site.

   All products below are real, currently-sold devices.
   Images are loaded from the local /images folder — see
   /images/README.md for exactly which photo to save where.
   Prices are indicative Indian retail prices (rounded) and
   will drift from live pricing over time.
   ============================================================ */

const CATEGORIES = [
  "Smartphones",
  "Laptops & Computers",
  "Gaming Accessories",
  "Smart Home",
  "Cameras",
  "Audio",
  "Wearables",
  "Computer Accessories"
];

const PLACEHOLDER_IMG = "images/placeholder.svg";

const PRODUCTS = [
  {
    id: "p01", name: "iPhone 16 Pro", brand: "Apple", category: "Smartphones",
    price: 99900, oldPrice: 109900, rating: 4.7, reviews: 2941, stock: 18,
    tags: ["featured", "bestseller"], dateAdded: "2026-05-02",
    image: "images/iphone-16-pro.jpg",
    gallery: ["images/iphone-16-pro.jpg"],
    spec: "128GB / A18 Pro",
    description: "Apple's titanium-bodied flagship, built around the A18 Pro chip and a new Camera Control button. The thinnest bezels of any iPhone yet, with a 5x periscope zoom that was previously exclusive to the Pro Max.",
    features: ["6.3\" Super Retina XDR OLED, 120Hz ProMotion", "A18 Pro chip with Apple Intelligence", "48MP triple camera with 5x telephoto", "Titanium frame, IP68 rated", "USB-C, up to 27 hours video playback"],
    specs: { "Display": "6.3\" OLED, 120Hz", "Chipset": "Apple A18 Pro", "Storage": "128GB", "Rear camera": "48MP + 48MP + 12MP", "Weight": "199g" }
  },
  {
    id: "p02", name: "Galaxy S25 Ultra", brand: "Samsung", category: "Smartphones",
    price: 124999, oldPrice: 134999, rating: 4.6, reviews: 1876, stock: 22,
    tags: ["trending"], dateAdded: "2026-02-10",
    image: "images/galaxy-s25-ultra.jpg",
    gallery: ["images/galaxy-s25-ultra.jpg"],
    spec: "256GB / Snapdragon 8 Elite",
    description: "Samsung's titanium-framed flagship with a built-in S Pen and a 200MP main sensor. Galaxy AI handles live translation and note summarising directly on-device.",
    features: ["6.9\" Dynamic AMOLED 2X, 120Hz", "Snapdragon 8 Elite for Galaxy", "200MP main + 50MP periscope telephoto", "Built-in S Pen", "5000mAh battery, IP68"],
    specs: { "Display": "6.9\" AMOLED, 120Hz", "Chipset": "Snapdragon 8 Elite", "Storage": "256GB", "Rear camera": "200MP + 50MP + 10MP + 12MP", "Weight": "218g" }
  },
  {
    id: "p03", name: "Pixel 9 Pro", brand: "Google", category: "Smartphones",
    price: 99999, oldPrice: 109999, rating: 4.5, reviews: 964, stock: 14,
    tags: ["new"], dateAdded: "2026-06-18",
    image: "images/pixel-9-pro.jpg",
    gallery: ["images/pixel-9-pro.jpg"],
    spec: "128GB / Tensor G4",
    description: "Google's own Tensor silicon paired with the cleanest build of Android available, plus Gemini running natively for call screening, photo editing, and on-device summaries.",
    features: ["6.3\" Super Actua OLED, 120Hz", "Google Tensor G4", "Triple 50MP camera system", "Gemini Nano on-device AI", "7 years of OS updates"],
    specs: { "Display": "6.3\" OLED, 120Hz", "Chipset": "Google Tensor G4", "Storage": "128GB", "Rear camera": "50MP + 48MP + 48MP", "Weight": "199g" }
  },
  {
    id: "p04", name: "MacBook Pro 14\" (M4)", brand: "Apple", category: "Laptops & Computers",
    price: 169900, oldPrice: 179900, rating: 4.8, reviews: 1203, stock: 12,
    tags: ["featured", "bestseller"], dateAdded: "2026-03-05",
    image: "images/macbook-pro-14-m4.jpg",
    gallery: ["images/macbook-pro-14-m4.jpg"],
    spec: "16GB / 512GB SSD",
    description: "Apple's M4 chip in the 14-inch chassis runs professional render and compile workloads fanless for long stretches, with a nano-texture display option that kills glare in bright rooms.",
    features: ["14.2\" Liquid Retina XDR display", "Apple M4 chip, 10-core CPU", "16GB unified memory", "512GB SSD", "Up to 18 hours battery life"],
    specs: { "Display": "14.2\" Liquid Retina XDR", "Chip": "Apple M4", "RAM": "16GB", "Storage": "512GB SSD", "Weight": "1.55kg" }
  },
  {
    id: "p05", name: "XPS 14", brand: "Dell", category: "Laptops & Computers",
    price: 154990, oldPrice: 169990, rating: 4.4, reviews: 356, stock: 15,
    tags: ["new"], dateAdded: "2026-06-30",
    image: "images/dell-xps-14.jpg",
    gallery: ["images/dell-xps-14.jpg"],
    spec: "16GB / 1TB SSD",
    description: "Dell's edge-to-edge InfinityEdge display and a capacitive, zero-lattice keyboard deck in a CNC-milled aluminium shell built for creative work on the move.",
    features: ["14.5\" 3.2K OLED touch display", "Intel Core Ultra processor", "16GB RAM", "1TB SSD", "Zero-lattice haptic touchpad"],
    specs: { "Display": "14.5\" 3.2K OLED", "CPU": "Intel Core Ultra", "RAM": "16GB", "Storage": "1TB SSD", "Weight": "1.55kg" }
  },
  {
    id: "p06", name: "Aurora R16", brand: "Alienware", category: "Laptops & Computers",
    price: 229990, oldPrice: 249990, rating: 4.6, reviews: 187, stock: 6,
    tags: ["trending"], dateAdded: "2026-01-22",
    image: "images/alienware-aurora-r16.jpg",
    gallery: ["images/alienware-aurora-r16.jpg"],
    spec: "32GB / RTX 4070",
    description: "A compact-for-its-class gaming tower with Alienware's signature Legend 3.0 design and a thermal shelf layout that keeps a high-wattage GPU quiet under sustained load.",
    features: ["NVIDIA GeForce RTX 4070", "32GB DDR5 RAM", "1TB NVMe SSD", "Liquid-cooled CPU", "Tool-less side panel"],
    specs: { "GPU": "RTX 4070", "RAM": "32GB DDR5", "Storage": "1TB NVMe", "PSU": "850W", "Cooling": "Liquid AIO" }
  },
  {
    id: "p07", name: "Galaxy Tab S10+", brand: "Samsung", category: "Laptops & Computers",
    price: 89999, oldPrice: 99999, rating: 4.4, reviews: 298, stock: 20,
    tags: [], dateAdded: "2026-04-14",
    image: "images/galaxy-tab-s10-plus.jpg",
    gallery: ["images/galaxy-tab-s10-plus.jpg"],
    spec: "12.4\" / 256GB",
    description: "A large AMOLED canvas with the S Pen included in the box, tuned for note-taking, storyboards, and DeX desktop mode when docked to a monitor.",
    features: ["12.4\" Dynamic AMOLED 2X", "S Pen included", "256GB storage, expandable", "IP68 water resistance", "Samsung DeX support"],
    specs: { "Display": "12.4\" AMOLED", "Storage": "256GB", "Battery": "10,090mAh", "Weight": "571g" }
  },
  {
    id: "p08", name: "Xbox Wireless Controller", brand: "Xbox", category: "Gaming Accessories",
    price: 5299, oldPrice: 6299, rating: 4.6, reviews: 3120, stock: 60,
    tags: ["bestseller"], dateAdded: "2026-01-10",
    image: "images/xbox-wireless-controller.jpg",
    gallery: ["images/xbox-wireless-controller.jpg"],
    spec: "Bluetooth + USB-C",
    description: "The standard by which every other pad gets measured — a textured grip, hybrid D-pad, and a 40-hour battery life that works over Bluetooth with a PC or an Xbox console alike.",
    features: ["Hybrid D-pad", "Bluetooth + USB-C wired mode", "40-hour battery on 2x AA", "Textured grip surface"],
    specs: { "Connectivity": "Bluetooth / USB-C", "Battery": "AA x2 (or play-and-charge)", "Weight": "287g" }
  },
  {
    id: "p09", name: "BlackWidow V4 Pro", brand: "Razer", category: "Gaming Accessories",
    price: 19999, oldPrice: 22999, rating: 4.5, reviews: 421, stock: 25,
    tags: ["trending", "new"], dateAdded: "2026-06-08",
    image: "images/razer-blackwidow-v4-pro.jpg",
    gallery: ["images/razer-blackwidow-v4-pro.jpg"],
    spec: "Hot-swap / Full-size",
    description: "A full-size mechanical board with Razer's hot-swappable green switches, a dedicated command dial, and a magnetic wrist rest that stays put during long sessions.",
    features: ["Hot-swappable mechanical switches", "Command dial + media controls", "Per-key Chroma RGB", "Magnetic plush wrist rest"],
    specs: { "Switches": "Hot-swap mechanical", "Backlight": "Per-key RGB", "Connectivity": "USB-C", "Layout": "Full-size" }
  },
  {
    id: "p10", name: "G923 Racing Wheel", brand: "Logitech", category: "Gaming Accessories",
    price: 34995, oldPrice: 39995, rating: 4.6, reviews: 156, stock: 10,
    tags: [], dateAdded: "2026-02-20",
    image: "images/logitech-g923.jpg",
    gallery: ["images/logitech-g923.jpg"],
    spec: "TrueForce feedback",
    description: "Logitech's TrueForce technology synchronises force feedback with a game's own audio engine, so kerbs and surface changes come through as distinct textures, not generic rumble.",
    features: ["TrueForce force feedback", "Responsive pedal set with adjustable brake", "Compatible with PC, PlayStation, Xbox", "Leather-wrapped wheel rim"],
    specs: { "Rotation": "900°", "Feedback": "TrueForce", "Connectivity": "USB", "Pedals": "3-pedal set" }
  },
  {
    id: "p11", name: "Echo Dot (5th Gen)", brand: "Amazon", category: "Smart Home",
    price: 4999, oldPrice: 5999, rating: 4.4, reviews: 5230, stock: 80,
    tags: ["bestseller"], dateAdded: "2026-01-05",
    image: "images/echo-dot-5th-gen.jpg",
    gallery: ["images/echo-dot-5th-gen.jpg"],
    spec: "Alexa built-in",
    description: "A fabric-wrapped smart speaker with a temperature sensor built in, so it can trigger routines based on room temperature as well as voice.",
    features: ["Alexa voice assistant", "Built-in temperature sensor", "Improved audio for clearer vocals", "Works as a smart home hub"],
    specs: { "Assistant": "Alexa", "Connectivity": "Wi-Fi, Bluetooth", "Power": "15W adapter" }
  },
  {
    id: "p12", name: "Hue White & Color Ambiance Bulb", brand: "Philips", category: "Smart Home",
    price: 1699, oldPrice: 2199, rating: 4.5, reviews: 2410, stock: 120,
    tags: [], dateAdded: "2026-03-12",
    image: "images/philips-hue-bulb.jpg",
    gallery: ["images/philips-hue-bulb.jpg"],
    spec: "16M colours",
    description: "The bulb that started the smart lighting category — full-spectrum colour, tunable white, and Matter support so it plays with any major smart home ecosystem.",
    features: ["16 million colours", "Matter compatible", "Works with Alexa, Google Home, Apple Home", "Dimmable via app or voice"],
    specs: { "Lumens": "800lm", "Base": "E27 / B22", "Lifespan": "25,000 hrs" }
  },
  {
    id: "p13", name: "Ring Video Doorbell (2nd Gen)", brand: "Ring", category: "Smart Home",
    price: 9999, oldPrice: 11999, rating: 4.2, reviews: 1876, stock: 35,
    tags: ["new"], dateAdded: "2026-05-25",
    image: "images/ring-video-doorbell.jpg",
    gallery: ["images/ring-video-doorbell.jpg"],
    spec: "1080p HD",
    description: "Battery or wired install, 1080p HD video with motion alerts sent straight to a phone, and two-way audio so packages or visitors get a quick word even when nobody's home.",
    features: ["1080p HD video", "Advanced motion detection", "Two-way talk", "Battery or hardwired install"],
    specs: { "Resolution": "1080p HD", "Field of view": "155°", "Power": "Battery / wired" }
  },
  {
    id: "p14", name: "Alpha a7 IV", brand: "Sony", category: "Cameras",
    price: 239990, oldPrice: 259990, rating: 4.9, reviews: 412, stock: 5,
    tags: ["featured", "trending"], dateAdded: "2026-04-02",
    image: "images/sony-alpha-a7iv.jpg",
    gallery: ["images/sony-alpha-a7iv.jpg"],
    spec: "Full-frame / 33MP",
    description: "A hybrid full-frame body built equally for stills and video, with real-time eye autofocus that tracks a subject through a crowd better than most cameras twice its price.",
    features: ["33MP full-frame Exmor R sensor", "5-axis in-body stabilisation", "4K 60p video (Super35 crop)", "Real-time Eye AF for humans and animals"],
    specs: { "Sensor": "Full-frame 33MP", "ISO range": "100–51200", "Video": "4K/60p", "Weight": "659g (body)" }
  },
  {
    id: "p15", name: "RF 35mm f/1.8 Macro IS STM", brand: "Canon", category: "Cameras",
    price: 52995, oldPrice: 57995, rating: 4.7, reviews: 233, stock: 18,
    tags: [], dateAdded: "2026-02-14",
    image: "images/canon-rf-35mm.jpg",
    gallery: ["images/canon-rf-35mm.jpg"],
    spec: "f/1.8, 1:2 macro",
    description: "A compact, image-stabilised prime that doubles as a half-life-size macro lens — genuinely two lenses' worth of use for a fraction of the weight.",
    features: ["f/1.8 maximum aperture", "0.5x macro magnification", "Optical image stabilisation", "Compact, lightweight design"],
    specs: { "Aperture": "f/1.8", "Focal length": "35mm", "Macro ratio": "1:2", "Weight": "305g" }
  },
  {
    id: "p16", name: "WH-1000XM5", brand: "Sony", category: "Audio",
    price: 29990, oldPrice: 34990, rating: 4.7, reviews: 3410, stock: 40,
    tags: ["bestseller", "featured"], dateAdded: "2026-03-20",
    image: "images/sony-wh1000xm5.jpg",
    gallery: ["images/sony-wh1000xm5.jpg"],
    spec: "ANC / 30hr",
    description: "Two processors and eight microphones work together to cancel a wider band of noise than the previous generation, in a redesigned hingeless build that's noticeably lighter.",
    features: ["Industry-leading active noise cancelling", "30-hour battery life", "Multipoint Bluetooth connection", "Speak-to-chat auto-pause"],
    specs: { "Battery": "30 hrs (ANC on)", "Driver": "30mm", "Weight": "250g", "Connectivity": "Bluetooth 5.2" }
  },
  {
    id: "p17", name: "AirPods Pro 2", brand: "Apple", category: "Audio",
    price: 24900, oldPrice: 26900, rating: 4.6, reviews: 4120, stock: 65,
    tags: ["trending"], dateAdded: "2026-06-01",
    image: "images/airpods-pro-2.jpg",
    gallery: ["images/airpods-pro-2.jpg"],
    spec: "ANC / H2 chip",
    description: "Apple's H2 chip doubles the noise cancellation of the previous generation and adds a hearing-aid-adjacent Hearing Health feature, all from the same familiar stem shape.",
    features: ["Active noise cancellation", "Adaptive Audio & Transparency mode", "Personalised spatial audio", "MagSafe charging case with speaker"],
    specs: { "Battery": "6hr + 24hr case", "Chip": "Apple H2", "Water resistance": "IP54" }
  },
  {
    id: "p18", name: "Era 100", brand: "Sonos", category: "Audio",
    price: 22999, oldPrice: 24999, rating: 4.5, reviews: 512, stock: 28,
    tags: ["new"], dateAdded: "2026-07-05",
    image: "images/sonos-era-100.jpg",
    gallery: ["images/sonos-era-100.jpg"],
    spec: "Trueplay tuning",
    description: "A compact stereo speaker that auto-tunes its EQ to the shape of the room it's placed in, and joins the rest of a Sonos system over Wi-Fi without a hub.",
    features: ["Automatic Trueplay room tuning", "Stereo pair support", "Wi-Fi and Bluetooth", "Works with Alexa built-in"],
    specs: { "Connectivity": "Wi-Fi, Bluetooth", "Inputs": "Line-in (with adapter)", "Weight": "1.02kg" }
  },
  {
    id: "p19", name: "Apple Watch Series 10", brand: "Apple", category: "Wearables",
    price: 42900, oldPrice: 46900, rating: 4.6, reviews: 1420, stock: 32,
    tags: ["featured", "bestseller"], dateAdded: "2026-04-28",
    image: "images/apple-watch-series-10.jpg",
    gallery: ["images/apple-watch-series-10.jpg"],
    spec: "AMOLED / 18hr",
    description: "The thinnest Apple Watch yet, with a wide-angle OLED panel that stays readable at a steep angle, and sleep apnea notifications built into watchOS.",
    features: ["Always-on wide-angle OLED", "Blood oxygen & ECG sensors", "Sleep apnea notifications", "Water resistant to 50m"],
    specs: { "Display": "AMOLED, always-on", "Battery": "18 hrs", "Water resistance": "50m", "Weight": "30g (42mm)" }
  },
  {
    id: "p20", name: "Oura Ring 4", brand: "Oura", category: "Wearables",
    price: 27999, oldPrice: 29999, rating: 4.3, reviews: 640, stock: 24,
    tags: ["new", "trending"], dateAdded: "2026-07-12",
    image: "images/oura-ring-4.jpg",
    gallery: ["images/oura-ring-4.jpg"],
    spec: "Titanium / 7-day",
    description: "Sleep staging, readiness, and cycle tracking from a titanium band with a smoother, sensor-under-the-surface design that reads accurately across more skin tones.",
    features: ["Titanium body, no exposed sensors", "7-day battery life", "Sleep staging & readiness score", "Water resistant to 100m"],
    specs: { "Material": "Titanium", "Battery": "7 days", "Water resistance": "100m", "Sizes": "US 4–15" }
  },
  {
    id: "p21", name: "MX Master 3S", brand: "Logitech", category: "Computer Accessories",
    price: 9995, oldPrice: 11495, rating: 4.7, reviews: 2130, stock: 55,
    tags: ["bestseller"], dateAdded: "2026-01-30",
    image: "images/logitech-mx-master-3s.jpg",
    gallery: ["images/logitech-mx-master-3s.jpg"],
    spec: "8000 DPI / Quiet clicks",
    description: "A sculpted, right-hand mouse with an electromagnetic MagSpeed scroll wheel that free-spins at speed and clicks precisely when scrolling slowly.",
    features: ["8000 DPI sensor", "MagSpeed electromagnetic scrolling", "Quiet clicks", "Pairs with up to 3 devices"],
    specs: { "DPI": "up to 8000", "Connectivity": "Bluetooth / USB receiver", "Battery": "70 days per charge" }
  },
  {
    id: "p22", name: "553 USB-C Hub (8-in-1)", brand: "Anker", category: "Computer Accessories",
    price: 6999, oldPrice: 8499, rating: 4.4, reviews: 890, stock: 70,
    tags: ["new"], dateAdded: "2026-06-22",
    image: "images/anker-553-hub.jpg",
    gallery: ["images/anker-553-hub.jpg"],
    spec: "8-in-1",
    description: "One cable turns a laptop into a full desk setup — 4K HDMI, gigabit ethernet, SD card slots, and 100W pass-through power in a low-profile aluminium block.",
    features: ["4K HDMI output", "100W USB-C power delivery", "Gigabit ethernet", "SD/microSD card reader"],
    specs: { "Ports": "8-in-1", "Power delivery": "100W", "Video out": "4K@60Hz" }
  },
  {
    id: "p23", name: "Desk Mat Studio Series", brand: "Logitech", category: "Computer Accessories",
    price: 3495, oldPrice: 3995, rating: 4.3, reviews: 310, stock: 90,
    tags: [], dateAdded: "2026-02-05",
    image: "images/logitech-desk-mat.jpg",
    gallery: ["images/logitech-desk-mat.jpg"],
    spec: "700x300mm",
    description: "A woven fabric desk mat with a non-slip rubber base, sized to hold a keyboard and mouse without either sliding during a long session.",
    features: ["Woven fabric surface", "Non-slip rubber base", "Water-resistant coating", "700x300mm"],
    specs: { "Size": "700x300mm", "Thickness": "3mm", "Base": "Rubber" }
  }
];

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function formatPrice(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function discountPercent(p) {
  if (!p.oldPrice || p.oldPrice <= p.price) return 0;
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}
