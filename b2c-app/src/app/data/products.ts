export interface Product {
  id: number;
  name: string;
  categories: string[];
  images: string[];
  description: string;
  price: number;
  color: string;
  switchType: string;
  availability: boolean;
  rating: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Gaming Keyboard Pro",
    categories: ["Gaming", "100%"],
    images: [],
    description: "High-performance gaming keyboard with RGB lighting.",
    price: 129.99,
    color: "Black",
    switchType: "Cherry MX Red",
    availability: true,
    rating: 300,
  },
  {
    id: 2,
    name: "Compact Wireless Keyboard",
    categories: ["Wireless", "Compact", "TKL", "80%"],
    images: [],
    description: "Space-saving keyboard with Bluetooth connectivity.",
    price: 79.99,
    color: "White",
    switchType: "Gateron Blue",
    availability: true,
    rating: 100,
  },
  {
    id: 3,
    name: "Ergonomic Mechanical Keyboard",
    categories: ["Ergonomic", "Mechanical"],
    images: [],
    description: "Ergonomically designed keyboard for comfortable typing.",
    price: 329.99,
    color: "Gray",
    switchType: "Kailh Brown",
    availability: false,
    rating: 224,
  },
  {
    id: 4,
    name: "Compact Wireless Mechanical Keyboard",
    categories: ["Compact", "Wireless", "Mechanical"],
    images: [],
    description:
      "A compact 65% wireless keyboard with hot-swappable switches and RGB lighting.",
    price: 119.99,
    color: "Black",
    switchType: "KTT Kang White V3",
    availability: true,
    rating: 65,
  },
  {
    id: 5,
    name: "RGB Gaming Keyboard",
    categories: ["Gaming", "RGB", "Mechanical"],
    images: [],
    description:
      "High-performance full-size keyboard with customizable RGB lighting and macro support.",
    price: 159.99,
    color: "Black",
    switchType: "Cherry MX Blue",
    availability: true,
    rating: 179,
  },
  {
    id: 6,
    name: "Silent Office Mechanical Keyboard",
    categories: ["Office", "Mechanical"],
    images: [],
    description:
      "Designed for quiet office environments with dampened tactile switches and low-profile keycaps.",
    price: 89.99,
    color: "White",
    switchType: "Cherry MX Silent Red",
    availability: true,
    rating: 30,
  },
  {
    id: 7,
    name: "Split Ergonomic Keyboard",
    categories: ["Ergonomic", "Split", "Wired"],
    images: [],
    description:
      "Split design for natural hand positioning, great for long hours of work.",
    price: 199.99,
    color: "Black",
    switchType: "Kailh Box White",
    availability: false,
    rating: 0,
  },
  {
    id: 8,
    name: "Low Profile Bluetooth Keyboard",
    categories: ["Wireless", "Low Profile", "Mechanical"],
    images: [],
    description:
      "Slim low-profile keyboard with Bluetooth 5.0 and multi-device pairing support.",
    price: 139.99,
    color: "Silver",
    switchType: "Low-profile Red",
    availability: true,
    rating: 531,
  },
];
