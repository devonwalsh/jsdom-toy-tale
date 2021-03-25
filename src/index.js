let addToy = false;

// Events run on DOM load
document.addEventListener("DOMContentLoaded", () => {
  addToyDropdown();
  addToyCards();
});

// Handles "add toy" dropdown window
function addToyDropdown() {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

// Adds toy cards to page
function addToyCards() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      data.forEach( toy => populateToyCards(toy))
    });
}

// Populates cards with toy data
function populateToyCards(newToy) {
  const toyCollection = document.getElementById("toy-collection");
  const card = document.createElement("div");
  const toyName = document.createElement("h2");
  const toyImage = document.createElement("img");
  const toyLikes = document.createElement("p");
  const likeButton = document.createElement("button");
  
  card.id = newToy.id;
  toyName.innerHTML = newToy.name;
  toyImage.src = newToy.image;
  toyImage.classList.add("toy-avatar");
  toyLikes.innerHTML = newToy.likes;
  toyLikes.classList.add("like-count");
  likeButton.classList.add("like-btn");
  likeButton.innerHTML = "Like <3";
  
  card.appendChild(toyName);
  card.appendChild(toyImage);
  card.appendChild(toyLikes);
  card.appendChild(likeButton);
  
  card.classList.add("card");
  toyCollection.appendChild(card);

  likeButton.addEventListener("click", likeIncrementer);
}

// "Add toy" form submit behavior
document.querySelector(".add-toy-form").addEventListener("submit", submitToyForm);

function submitToyForm() {
  event.preventDefault();
  let newToy = {};
  let formData = document.querySelectorAll(".input-text");
  formData.forEach( element => {
    newToy[element.name] = element.value;
  });
  newToy.likes = 0;
  
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }; 
  
  fetch("http://localhost:3000/toys", configObj)
  .then(response => response.json())
  .then(object => populateToyCards(object));
  
}

// Increments like counts
function likeIncrementer(e) {
  let likeCount = e.target.parentNode.querySelector(".like-count").innerHTML;
  let id = e.target.parentNode.id;
  likeCount++;
  e.target.parentNode.querySelector(".like-count").innerHTML = likeCount;
  
  patchLikes(id, likeCount);
}

// Sends updated like counts to db.json
function patchLikes(id, likeCount) {
  const configObj = {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount
    })
  };
  
  fetch(`http://localhost:3000/toys/${id}`, configObj)
  .then(response => response.json())
  .then(object => console.log(object)); 
  
}

// Attaches "like incrementer" functionality to like buttons
function addLikeCountEventListener() {
  const likes = document.querySelectorAll(".like-btn");
  likes.forEach( (e) => {
    e.addEventListener("click", likeIncrementer);
  });
}