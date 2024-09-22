// Типи для модальних елементів
const modal = document.getElementById('myModal') as HTMLElement;
const openModalBtn = document.getElementById('openModal') as HTMLElement;
const closeModalBtn = document.getElementById('closeModal') as HTMLElement;

// Відкриття модального вікна
openModalBtn.onclick = () => {
    modal.style.display = 'block';
};

// Закриття модального вікна
closeModalBtn.onclick = () => {
    modal.style.display = 'none';
};

// Закриття модального вікна при кліку за межами
window.onclick = (event: MouseEvent) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Event listener для скролу
window.addEventListener('scroll', () => {
    console.log('Сторінка прокручується');
});

// Анімація при кліку
const animatedBtn = document.getElementById('animateBtn') as HTMLElement;
animatedBtn.onclick = () => {
    animatedBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        animatedBtn.style.transform = 'scale(1)';
    }, 300);
};

// Fetch даних з JSONPlaceholder
const postsContainer = document.getElementById('posts') as HTMLElement;

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then((data: any[]) => {
        data.slice(0, 5).forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Помилка при завантаженні даних:', error));
