let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
});

document.querySelector(".add-toy-form").addEventListener("submit", () => {
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
  
  fetch("http://localhost:3000/toys", configObj);
  
  addCards(newToy);

});

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach( toy => addCards(toy));
  });

function addCards(newToy) {
  const toyCollection = document.getElementById("toy-collection");
  const card = document.createElement("div");
  const toyName = document.createElement("h2");
  const toyImage = document.createElement("img");
  const toyLikes = document.createElement("p");
  const likeButton = document.createElement("button");
  
  toyName.innerHTML = newToy.name;
  toyImage.src = newToy.image;
  toyImage.classList.add("toy-avatar");
  toyLikes.innerHTML = newToy.likes;
  likeButton.classList.add("like-btn");
  likeButton.innerHTML = "Like <3";
  
  card.appendChild(toyName);
  card.appendChild(toyImage);
  card.appendChild(toyLikes);
  card.appendChild(likeButton);
  
  card.classList.add("card");
  toyCollection.appendChild(card);
}