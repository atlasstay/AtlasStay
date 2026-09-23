export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  neighborhood: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  amenities: string[];
  images: string[];
  description: string;
  pricing: {
    nights: number;
    base: number;
    fee: number;
  };
}

export const filterChips = [
  "All",
  "Lagos",
  "Accra",
  "London",
  "Dubai",
  "New York"
];

export const properties: Property[] = [
  // --- LAGOS MAINLAND: IKEJA & SURULERE ---
  {
    id: "lag-ikeja-marriott",
    name: "Executive Suite at Ikeja GRA",
    location: "Ikeja GRA, Lagos",
    city: "Lagos",
    neighborhood: "Ikeja GRA",
    price: 285,
    rating: 4.95,
    reviewsCount: 38,
    badge: "Verified 24/7 Power",
    amenities: ["24/7 Dual Power", "Fiber WiFi (150 Mbps)", "Airport Shuttle", "Swimming Pool", "Executive Desk"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Premier executive living located in central Ikeja GRA, minutes from Murtala Muhammed International Airport. Features uninterrupted dual-grid power, soundproof glass, and an executive workspace.",
    pricing: { nights: 1, base: 285, fee: 30 }
  },
  {
    id: "lag-ikeja-skyview",
    name: "Capital Aviation Penthouse",
    location: "Ikeja, Lagos",
    city: "Lagos",
    neighborhood: "Ikeja",
    price: 210,
    rating: 4.88,
    reviewsCount: 22,
    badge: "Verified 24/7 Power",
    amenities: ["Inverter & Generator Backup", "Fast WiFi", "Dedicated Desk", "Gym", "Concierge"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Modern, secure serviced apartment ideal for flight crews, corporate executives, and business consultants needing seamless mainland transit.",
    pricing: { nights: 1, base: 210, fee: 25 }
  },
  {
    id: "lag-surulere-residence",
    name: "Adeniran Ogunsanya Urban Loft",
    location: "Surulere, Lagos",
    city: "Lagos",
    neighborhood: "Surulere",
    price: 135,
    rating: 4.82,
    reviewsCount: 19,
    badge: "Verified 24/7 Power",
    amenities: ["Solar + Gen Power", "High-Speed WiFi", "Gated Security", "Smart TV", "Modern Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Stylish, quiet haven situated off vibrant Adeniran Ogunsanya. Perfect for creatives and travelers who want quick access to Yaba tech hubs and central Lagos.",
    pricing: { nights: 1, base: 135, fee: 15 }
  },
  {
    id: "lag-surulere-artisan",
    name: "Masha Heritage Studio",
    location: "Surulere, Lagos",
    city: "Lagos",
    neighborhood: "Surulere",
    price: 110,
    rating: 4.79,
    reviewsCount: 14,
    badge: "Verified 24/7 Power",
    amenities: ["Constant Power", "Workspace", "Air Conditioning", "Private Balcony"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Curated boutique stay offering full privacy, dependable utilities, and easy connectivity across both the Mainland and Island corridors.",
    pricing: { nights: 1, base: 110, fee: 12 }
  },

  // --- LAGOS ISLAND ---
  {
    id: "lag-ikoyi-terrace",
    name: "Bourbillion Waterfront Residence",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    neighborhood: "Ikoyi",
    price: 340,
    rating: 4.96,
    reviewsCount: 42,
    badge: "Verified 24/7 Power",
    amenities: ["24/7 Industrial Power", "Fiber Internet", "Private Terrace", "Pool & Gym", "Chef on Request"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Luxury waterfront apartment overlooking the Five Cowries Creek in Old Ikoyi. Complete with dedicated security and round-the-clock power.",
    pricing: { nights: 1, base: 340, fee: 35 }
  },
  {
    id: "lag-vi-ocean",
    name: "Eko Atlantic Panoramic Suite",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    neighborhood: "Victoria Island",
    price: 310,
    rating: 4.91,
    reviewsCount: 29,
    badge: "Verified 24/7 Power",
    amenities: ["Independent City Grid Power", "Ultra Fiber WiFi", "Ocean Views", "Underground Parking"],
    images: [
      "https://images.unsplash.com/photo-1502005229762-ee1b2da97327?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Floor-to-ceiling glass panoramic stay inside Eko Atlantic City. Ultra-quiet environment tailored for remote executives and delegations.",
    pricing: { nights: 1, base: 310, fee: 30 }
  },

  // --- UNITED STATES ---
  {
    id: "us-nyc-hudson",
    name: "Hudson Yards Skyline Loft",
    location: "Manhattan, New York",
    city: "New York",
    neighborhood: "Hudson Yards",
    price: 495,
    rating: 4.98,
    reviewsCount: 51,
    badge: "Executive Workspace",
    amenities: ["Gigabit Fiber WiFi", "Ergonomic Herman Miller Desk", "Skyline View", "Doorman 24/7"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Architect-designed duplex loft overlooking Midtown Manhattan. High ceilings, custom soundproofing, and immediate access to High Line and corporate headquarters.",
    pricing: { nights: 1, base: 495, fee: 45 }
  },
  {
    id: "us-nyc-dumbo",
    name: "DUMBO Waterfront Brownstone Loft",
    location: "Brooklyn, New York",
    city: "New York",
    neighborhood: "DUMBO",
    price: 380,
    rating: 4.92,
    reviewsCount: 34,
    badge: "Executive Workspace",
    amenities: ["Ultra-Fast WiFi", "Private Roof Deck", "Keyless Entry", "Smart Media Suite"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Historic converted loft featuring exposed brick, original timbers, and direct views of the Manhattan Bridge and East River promenade.",
    pricing: { nights: 1, base: 380, fee: 35 }
  },

  // --- ACCRA, GHANA ---
  {
    id: "gh-accra-cantonments",
    name: "The Embassy Villa Suite",
    location: "Cantonments, Accra",
    city: "Accra",
    neighborhood: "Cantonments",
    price: 240,
    rating: 4.89,
    reviewsCount: 27,
    badge: "Verified 24/7 Power",
    amenities: ["Generator Backup", "Fiber Internet", "Private Lap Pool", "Gated Compound"],
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Quiet, leafy executive stay in Cantonments embassy district. Fully secure perimeter with rapid transit to Kotoka International Airport.",
    pricing: { nights: 1, base: 240, fee: 25 }
  },

  // --- LONDON, UK ---
  {
    id: "uk-london-mayfair",
    name: "Mayfair Executive Residence",
    location: "Mayfair, London",
    city: "London",
    neighborhood: "Mayfair",
    price: 520,
    rating: 4.97,
    reviewsCount: 63,
    badge: "Prime Location",
    amenities: ["Superfast Broadband", "Air Conditioning", "24hr Porter", "Dedicated Study"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Stately apartment steps from Grosvenor Square and Hyde Park. Impeccable finishes, bespoke millwork, and private lift access.",
    pricing: { nights: 1, base: 520, fee: 50 }
  },

  // --- DUBAI, UAE ---
  {
    id: "uae-dubai-marina",
    name: "Dubai Marina Horizon Loft",
    location: "Dubai Marina, Dubai",
    city: "Dubai",
    neighborhood: "Dubai Marina",
    price: 360,
    rating: 4.94,
    reviewsCount: 47,
    badge: "Marina View",
    amenities: ["High-Speed WiFi", "Infinity Pool", "Direct Mall Access", "Valet Parking"],
    images: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "High-floor waterfront apartment with floor-to-ceiling vistas across the yacht marina and Arabian Gulf.",
    pricing: { nights: 1, base: 360, fee: 35 }
  }
];

export const upcomingTrip = {
  property: properties[0],
  checkIn: "Thu, Oct 15",
  checkOut: "Mon, Oct 19",
  confirmation: "ATLAS-88219"
};

export const wallet = {
  balance: 450,
  currency: "USD",
  tier: "Atlas Black",
  perks: ["Late Checkout (2 PM)", "Complimentary Airport Escort", "24/7 WhatsApp Concierge"]
};