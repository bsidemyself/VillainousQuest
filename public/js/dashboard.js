const { Quest } = require("../../models");

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#quest-title').value.trim();
  const setting = document.querySelector('#quest-setting').value.trim();
  const challenge = document.querySelector('#quest-challenge').value.trim();
  const text = document.querySelector('#quest-text').value.trim();

  if (title && setting && challenge && text) {
    const response = await fetch(`/quests`, {
      method: 'POST',
      body: JSON.stringify({ title, setting, challenge, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/quests');
    } else {
      alert('Failed to create quest');
    }
  }
};

function renderQuest(Quest){
  let deleteQuest = document.createElement("button")
    deleteQuest.setAttribute('id', 'delete-btn')
    deleteQuest.innerText = "delete listing"
    deleteQuest.addEventListener("click", function(event) {
    
    console.log("test222 home id ", QuestDiv.id)
    
    if (event.target.id === 'delete-btn') {
    fetch(`http://localhost:3000/homes/${Quest.id}`, {
    method: "DELETE",
    headers: {
    "content-type": "application/json",
    accept: "application/json"
    }
    }).then(resp => resp.json())
    .then(() => {
    QuestDiv.innerHTML = "";
    const quest = QuestDiv.querySelector(`[data-id='${QuestDiv.id}']`);
    Quest.remove();
    })
    
    }
    })
  }
// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/quests/${id}`, {
//       method: 'DELETE',
//     });

    if (response.ok) {
      document.location.replace('/quests');
    } else {
      alert('Failed to delete quest');
    };

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