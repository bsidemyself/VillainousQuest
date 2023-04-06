console.log("before handler")
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#quest-title').value.trim();
  const setting = document.querySelector('#quest-setting').value.trim();
  const challenge = document.querySelector('#quest-challenge').value.trim();
  const text = document.querySelector('#quest-text').value.trim();
  console.log("before post");
  if (title && setting && challenge && text) {
    console.log("before fetch");
    const response = await fetch(`/api/quests`, {
      method: 'POST',
      body: JSON.stringify({ title, setting, challenge, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      // document.location.replace('/quests');
    } else {
      alert('Failed to create quest');
    }
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/quests/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/quests');
//     } else {
//       alert('Failed to delete quest');
//     }
//   }
// };

document
  .querySelector('.new-quest-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.quest-list')
//   .addEventListener('click', delButtonHandler);

// Card flipping tech

const questCards = document.querySelectorAll('.quest-card');

questCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flip');
  });
  console.log('click');
});