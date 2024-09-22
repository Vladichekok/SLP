"use strict";
var _a, _b;
// Example: Modal window opening/closing
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
};
const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
};
(_a = document.getElementById('openModalButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => openModal('myModal'));
(_b = document.getElementById('closeModalButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => closeModal('myModal'));
// Example: Fetch data and display it
const fetchData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData();
