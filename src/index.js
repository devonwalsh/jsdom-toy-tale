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

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach( toy => {
      console.log(toy);

      const toyCollection = document.getElementById("toy-collection");
      const card = document.createElement("div");
      const toyName = document.createElement("h2");
      const toyImage = document.createElement("img");
      const toyLikes = document.createElement("p");
      const likeButton = document.createElement("button");

      toyName.innerHTML = toy.name;
      toyImage.src = toy.image;
      toyImage.classList.add("toy-avatar");
      toyLikes.innerHTML = toy.likes;
      likeButton.classList.add("like-btn");
      likeButton.innerHTML = "Like <3";

      card.appendChild(toyName);
      card.appendChild(toyImage);
      card.appendChild(toyLikes);
      card.appendChild(likeButton);

      card.classList.add("card");
      toyCollection.appendChild(card);
    })
  })
});
