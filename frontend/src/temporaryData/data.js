import burgerImg from '../images/burger.jpg'
import pizzaImg from '../images/pizza.jpg'
import wingsImg from '../images/wings.jpg'
import saladImg from '../images/salad.jpg'
import sandwichImg from '../images/sandwich.jpg'
import pastaImg from '../images/pasta.jpg'
import mangoJuiceImg from '../images/mangoJuice.jpg'
import orangeJuiceImg from '../images/orangeJuice.jpg'
import vegetableImg from '../images/vegetable.jpg'
import coffeeImg from '../images/coffee.jpg'

export const vendorMenu = [
    {
        id: 1,
        title: 'Burger',
        price: 120,
        rating: 4.5,
        reviewCount: 120,
        category: 'Snacks',
        image: burgerImg,
        isAvailable: true,
        description: 'Juicy grilled beef patty with cheese, lettuce, and signature sauce.',
        orderCount: 150
    },
    {
        id: 2,
        title: 'Pizza',
        price: 250,
        rating: 4.7,
        reviewCount: 98,
        category: 'Snacks',
        image: pizzaImg,
        isAvailable: true,
        description: 'Thin-crust pizza topped with mozzarella, tomato, and pepperoni.',
        orderCount: 120
    },
    {
        id: 3,
        title: 'Sandwich',
        price: 90,
        rating: 4.2,
        reviewCount: 75,
        category: 'Snacks',
        image: sandwichImg,
        isAvailable: false,
        description: 'Toasted sandwich with fresh vegetables and chicken spread.',
        orderCount: 90
    },
    {
        id: 4,
        title: 'Pasta',
        price: 180,
        rating: 4.6,
        reviewCount: 110,
        category: 'Snacks',
        image: pastaImg,
        isAvailable: true,
        description: 'Creamy white sauce pasta with mushrooms and grilled chicken.',
        orderCount: 140
    },
    {
        id: 5,
        title: 'Salad',
        price: 80,
        rating: 4.0,
        reviewCount: 60,
        category: 'Vegetarian',
        image: saladImg,
        isAvailable: false,
        description: 'Fresh green salad with cucumbers, tomatoes, and lemon dressing.',
        orderCount: 70
    },
    {
        id: 6,
        title: 'Chicken Wings',
        price: 150,
        rating: 4.4,
        reviewCount: 85,
        category: 'Snacks',
        image: wingsImg,
        isAvailable: true,
        description: 'Crispy fried chicken wings tossed in spicy buffalo sauce.',
        orderCount: 190
    },
    {
        id: 7,
        title: 'Mango Juice',
        price: 60,
        rating: 4.2,
        reviewCount: 55,
        category: 'Beverage',
        image: mangoJuiceImg,
        isAvailable: true,
        description: 'Freshly squeezed mango juice served chilled.',
        orderCount: 65
    },
    {
        id: 8,
        title: 'Orange Juice',
        price: 65,
        rating: 4.3,
        reviewCount: 60,
        category: 'Beverage',
        image: orangeJuiceImg,
        isAvailable: true,
        description: 'Refreshing orange juice with natural pulp.',
        orderCount: 175
    },
    {
        id: 9,
        title: 'Vegetable Curry',
        price: 100,
        rating: 4.1,
        reviewCount: 48,
        category: 'Vegetarian',
        image: vegetableImg,
        isAvailable: true,
        description: 'A spicy mix of seasonal vegetables cooked in traditional Bengali style.',
        orderCount: 60
    },
    {
        id: 10,
        title: 'Cold Coffee',
        price: 90,
        rating: 4.3,
        reviewCount: 50,
        category: 'Beverage',
        image: coffeeImg,
        isAvailable: true,
        description: 'Chilled creamy cold coffee with a hint of chocolate.',
        orderCount: 85
    }
];

export const publicFoods = [
    {
        id: 1,
        title: 'Burger',
        price: 120,
        vendor: 'Foodies Hub',
        vendorId: 101,
        vendorLocation: 'GEC Circle',
        rating: 4.5,
        reviewCount: 120,
        category: 'Snacks',
        image: burgerImg,
        isAvailable: true,
        description: 'Juicy grilled beef patty with cheese, lettuce, and signature sauce.'
    },
    {
        id: 2,
        title: 'Pizza',
        price: 250,
        vendor: 'Pizza World',
        vendorId: 102,
        vendorLocation: 'Agrabad',
        rating: 4.7,
        reviewCount: 98,
        category: 'Snacks',
        image: pizzaImg,
        isAvailable: true,
        description: 'Thin-crust pizza topped with mozzarella, tomato, and pepperoni.'
    },
    {
        id: 3,
        title: 'Sandwich',
        price: 90,
        vendor: 'Snack Corner',
        vendorId: 103,
        vendorLocation: 'Nasirabad',
        rating: 4.2,
        reviewCount: 75,
        category: 'Snacks',
        image: sandwichImg,
        isAvailable: false,
        description: 'Toasted sandwich with fresh vegetables and chicken spread.'
    },
    {
        id: 4,
        title: 'Pasta',
        price: 180,
        vendor: 'Italiano Express',
        vendorId: 104,
        vendorLocation: 'Khulshi',
        rating: 4.6,
        reviewCount: 110,
        category: 'Snacks',
        image: pastaImg,
        isAvailable: true,
        description: 'Creamy white sauce pasta with mushrooms and grilled chicken.'
    },
    {
        id: 5,
        title: 'Salad',
        price: 80,
        vendor: 'Green Bites',
        vendorId: 105,
        vendorLocation: 'Panchlaish',
        rating: 4.0,
        reviewCount: 60,
        category: 'Vegetarian',
        image: saladImg,
        isAvailable: false,
        description: 'Fresh green salad with cucumbers, tomatoes, and lemon dressing.'
    },
    {
        id: 6,
        title: 'Chicken Wings',
        price: 150,
        vendor: 'Foodies Hub',
        vendorId: 101,
        vendorLocation: 'GEC Circle',
        rating: 4.4,
        reviewCount: 85,
        category: 'Snacks',
        image: wingsImg,
        isAvailable: true,
        description: 'Crispy fried chicken wings tossed in spicy buffalo sauce.'
    },
    {
        id: 7,
        title: 'Mango Juice',
        price: 60,
        vendor: 'Juice Junction',
        vendorId: 107,
        vendorLocation: 'Chawkbazar',
        rating: 4.2,
        reviewCount: 55,
        category: 'Beverage',
        image: mangoJuiceImg,
        isAvailable: true,
        description: 'Freshly squeezed mango juice served chilled.'
    },
    {
        id: 8,
        title: 'Orange Juice',
        price: 65,
        vendor: 'Citrus Bar',
        vendorId: 108,
        vendorLocation: 'Lalkhan Bazar',
        rating: 4.3,
        reviewCount: 60,
        category: 'Beverage',
        image: orangeJuiceImg,
        isAvailable: true,
        description: 'Refreshing orange juice with natural pulp.'
    },
    {
        id: 9,
        title: 'Vegetable Curry',
        price: 100,
        vendor: 'Deshi Tarka',
        vendorId: 109,
        vendorLocation: 'ANDERKILLA',
        rating: 4.1,
        reviewCount: 48,
        category: 'Vegetarian',
        image: vegetableImg,
        isAvailable: true,
        description: 'A spicy mix of seasonal vegetables cooked in traditional Bengali style.'
    },
    {
        id: 10,
        title: 'Cold Coffee',
        price: 90,
        vendor: 'Foodies Hub',
        vendorId: 101,
        vendorLocation: 'GEC Circle',
        rating: 4.3,
        reviewCount: 50,
        category: 'Beverage',
        image: coffeeImg,
        isAvailable: true,
        description: 'Chilled creamy cold coffee with a hint of chocolate.'
    }
];

export const orders = [
  {
    orderId: 101,
    student: {
      id: 1,
      name: 'Tanvir Ahmed',
      phone: '01711112222'
    },
    vendor: {
      id: 5,
      name: 'Milon Vai',
      phone: '01888883333',
      stallName: "Milon's Tandoori",
      stallLocation: 'Shahid Minar Zone',
    },
    totalAmount: 280.00,
    status: 'delivered',
    paymentStatus: 'paid',
    deliveryAddress: 'Main Gate, CUET',
    orderTime: '2025-06-08 08:45:00',
    items: [
      {
        foodItemId: 201,
        name: 'Chicken Wings',
        price: 150.00,
        quantity: 1,
        imageUrl: wingsImg
      },
      {
        foodItemId: 204,
        name: 'Pasta',
        price: 65.00,
        quantity: 2,
        imageUrl: pastaImg
      }
    ]
  },
  {
    orderId: 102,
    student: {
      id: 2,
      name: 'Fatema Jahan',
      phone: '01722223333'
    },
    vendor: {
      id: 7,
      name: 'Shuvo Vai',
      phone: '01999994444',
      stallName: 'Shuvo Snacks',
      stallLocation: 'Central Cafeteria',
    },
    totalAmount: 85.00,
    status: 'pending',
    paymentStatus: 'pending',
    deliveryAddress: 'Main Gate, CUET',
    orderTime: '2025-06-07 14:30:00',
    items: [
      {
        foodItemId: 301,
        name: 'Veg Curry',
        price: 40.00,
        quantity: 2,
        imageUrl: vegetableImg
      },
      {
        foodItemId: 305,
        name: 'Orange Juice',
        price: 45.00,
        quantity: 1,
        imageUrl: orangeJuiceImg
      }
    ]
  },
  {
    orderId: 103,
    student: {
      id: 3,
      name: 'Samiul Haque',
      phone: '01666667777'
    },
    vendor: {
      id: 8,
      name: 'Rafi Vai',
      phone: '01755556666',
      stallName: "Rafi's Burger",
      stallLocation: 'East Cafeteria',
    },
    totalAmount: 120.00,
    status: 'preparing',
    paymentStatus: 'paid',
    deliveryAddress: 'Main Gate, CUET',
    orderTime: '2025-06-09 12:15:00',
    items: [
      {
        foodItemId: 401,
        name: 'Burger',
        price: 120.00,
        quantity: 1,
        imageUrl: burgerImg
      }
    ]
  },
  {
    orderId: 104,
    student: {
      id: 4,
      name: 'Mahira Tasnim',
      phone: '01877778888'
    },
    vendor: {
      id: 6,
      name: 'Hasib Vai',
      phone: '01344445555',
      stallName: "Hasib's Rolls",
      stallLocation: 'New Academic Area',
    },
    totalAmount: 190.00,
    status: 'cancelled',
    paymentStatus: 'paid',
    deliveryAddress: 'Gate 2, CUET',
    orderTime: '2025-06-10 13:00:00',
    items: [
      {
        foodItemId: 601,
        name: 'Pizza',
        price: 95.00,
        quantity: 2,
        imageUrl: pizzaImg
      }
    ]
  }
];




