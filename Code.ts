type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description?: string;
};
type Electronics = BaseProduct & {
  category: 'electronics';
  brand: string;
  model: string;
  warranty: number;
};
type Clothing = BaseProduct & {
  category: 'clothing';
  size: string;
  material: string;
  gender: 'male' | 'female' | 'unisex';
};
type Book = BaseProduct & {
  category: 'book';
  author: string;
  genre: string;
  pages: number;
};
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  return products.find((product) => product.id === id);
};
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  return products.filter((product) => product.price <= maxPrice);
};
type CartItem<T> = {
  product: T;
  quantity: number;
};
const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);
  
  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  return cart;
};
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
const electronics: Electronics[] = [
  {
    id: 1,
    name: "Computer",
    price: 10000,
    category: 'electronics',
    brand: "qwe",
    model: "ssS21",
    warranty: 24,
  },
  {
    id: 2,
    name: "Notebook",
    price: 30000,
    category: 'electronics',
    brand: "zxc",
    model: "www15",
    warranty: 12,
  }
];
const clothing: Clothing[] = [
  {
    id: 3,
    name: "T-shirt",
    price: 500,
    category: 'clothing',
    size: "M",
    material: "Cotton",
    gender: 'unisex',
  },
  {
    id: 4,
    name: "Jeans",
    price: 1500,
    category: 'clothing',
    size: "L",
    material: "Denim",
    gender: 'male',
  }
];
const books: Book[] = [
  {
    id: 5,
    name: "Game of Thrones",
    price: 300,
    category: 'book',
    author: "Gorge Martin",
    genre: "Fantasy",
    pages: 2000,
  },
  {
    id: 6,
    name: "Breaking Bad",
    price: 200,
    category: 'book',
    author: "Vins Gilligan",
    genre: "Criminal",
    pages: 1500,
  }
];
// Пошук товару
const phone = findProduct(electronics, 1);
console.log("Знайдений товар:", phone);
// Фільтрація товарів за ціною
const affordableClothing = filterByPrice(clothing, 1000);
console.log("Доступний одяг:", affordableClothing);
// Створення кошика
let cart: CartItem<BaseProduct>[] = [];
// Додавання товарів у кошик
if (phone) {
  cart = addToCart(cart, phone, 1);
}

const jeans = findProduct(clothing, 4);
if (jeans) {
  cart = addToCart(cart, jeans, 2);
}

console.log("Кошик:", cart);
// Підрахунок загальної вартості
const total = calculateTotal(cart);
console.log("Загальна вартість:", total);
