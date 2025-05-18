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
  },
];
