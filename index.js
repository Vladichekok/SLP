/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function subtract(a, b) {
  return a - b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiply(a, b) {
  return a * b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number | string}
 */
function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero!";
  }
  return a / b;
}

/** @type {number[]} */
let numberArray = [1, 2, 3, 4, 5];

/** @type {string[]} */
let stringArray = ["apple", "banana", "cherry"];

/** @type {boolean[]} */
let booleanArray = [true, false, true, false];

/**
 * @param {Array<number|string|boolean>} arr
 */
function printArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {number} age
 * @property {boolean} isEmployed
 */

/** @type {Person} */
let person = {
  name: "John",
  age: 30,
  isEmployed: true
};

/**
 * @param {Person} person
 * @returns {string}
 */
function greet(person) {
  return `Hello, ${person.name}!`;
}

/**
 * @param {Person} person
 */
function increaseAge(person) {
  person.age += 1;
}

/**
 * @param {Person} person
 * @returns {boolean}
 */
function isAdult(person) {
  return person.age >= 18;
}

let sum = 0;
for (let i = 0; i < numberArray.length; i++) {
  sum += numberArray[i];
}

console.log("Sum of numbers:", sum);

for (let i = 0; i < stringArray.length; i++) {
  console.log("Fruit:", stringArray[i]);
}

let isAllTrue = true;
for (let i = 0; i < booleanArray.length; i++) {
  if (!booleanArray[i]) {
    isAllTrue = false;
    break;
  }
}

console.log("Are all values true?", isAllTrue);

/**
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));

/**
 * @typedef {Object} Student
 * @property {string} name
 * @property {number} score
 */

/** @type {Student[]} */
let students = [
  { name: "Alice", score: 90 },
  { name: "Bob", score: 85 },
  { name: "Charlie", score: 92 }
];

/**
 * @param {Student[]} students
 * @returns {number}
 */
function averageScore(students) {
  let totalScore = 0;
  for (let i = 0; i < students.length; i++) {
    totalScore += students[i].score;
  }
  return totalScore / students.length;
}

console.log("Average score:", averageScore(students));

/**
 * @param {Student[]} students
 * @returns {Student}
 */
function findHighestScore(students) {
  let highest = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].score > highest.score) {
      highest = students[i];
    }
  }
  return highest;
}

let topStudent = findHighestScore(students);
console.log("Top student:", topStudent.name, "with score", topStudent.score);

/**
 * @param {number} n
 */
function countdown(n) {
  for (let i = n; i >= 0; i--) {
    console.log(i);
  }
}

countdown(10);

let start = 1;
let end = 100;
let evenSum = 0;
let oddSum = 0;

for (let i = start; i <= end; i++) {
  if (i % 2 === 0) {
    evenSum += i;
  } else {
    oddSum += i;
  }
}

console.log("Sum of even numbers:", evenSum);
console.log("Sum of odd numbers:", oddSum);

/**
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log("Reversed string:", reverseString("hello"));

/**
 * @param {number} n
 * @returns {number}
 */
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci of 10:", fibonacci(10));

/**
 * @typedef {Object} CartItem
 * @property {string} product
 * @property {number} price
 */

/** @type {CartItem[]} */
let cart = [
  { product: "Laptop", price: 1000 },
  { product: "Phone", price: 500 },
  { product: "Tablet", price: 300 }
];

/**
 * @param {CartItem[]} cart
 * @returns {number}
 */
function totalPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
}

console.log("Total cart price:", totalPrice(cart));

/**
 * @param {number} price
 * @param {number} discountPercentage
 * @returns {number}
 */
function applyDiscount(price, discountPercentage) {
  return price - (price * (discountPercentage / 100));
}

console.log("Price after discount:", applyDiscount(100, 20));

/**
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
  let reversed = reverseString(str);
  return str === reversed;
}

console.log("Is 'racecar' a palindrome?", isPalindrome("racecar"));
console.log("Is 'hello' a palindrome?", isPalindrome("hello"));

/** @type {number} */
let x = 10;

/** @type {number} */
let y = 5;

console.log("Addition:", add(x, y));
console.log("Subtraction:", subtract(x, y));
console.log("Multiplication:", multiply(x, y));
console.log("Division:", divide(x, y));

/** @type {boolean} */
let userLoggedIn = false;

function loginUser() {
  if (!userLoggedIn) {
    console.log("User logged in");
    userLoggedIn = true;
  } else {
    console.log("User is already logged in");
  }
}

loginUser();
loginUser();
