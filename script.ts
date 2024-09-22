// Example: Modal window opening/closing
const openModal = (modalId: string): void => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
  }
};

const closeModal = (modalId: string): void => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
};

document.getElementById('openModalButton')?.addEventListener('click', () => openModal('myModal'));
document.getElementById('closeModalButton')?.addEventListener('click', () => closeModal('myModal'));

// Example: Fetch data and display it
const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
