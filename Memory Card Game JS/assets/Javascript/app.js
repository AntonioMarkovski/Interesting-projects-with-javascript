const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the data
const getData = () => [
  { imgSrc: "./assets/Images/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "./assets/Images/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "./assets/Images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "./assets/Images/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "./assets/Images/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "./assets/Images/ledzep.jpeg", id: 6, name: "led zeppelin" },
  { imgSrc: "./assets/Images/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "./assets/Images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "./assets/Images/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "./assets/Images/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "./assets/Images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "./assets/Images/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "./assets/Images/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "./assets/Images/ledzep.jpeg", id: 14, name: "led zeppelin" },
  { imgSrc: "./assets/Images/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "./assets/Images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

// Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card Generator Function
const cardGenerator = () => {
  const cardData = randomize();
  // Generate the HTML
  cardData.forEach((item, index) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//Check Cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart(":( try again");
      }
    }
  }
  //Run a check to see if we won the game
  if (toggleCard.length === 16) {
    restart(":) you won");
  }
};

//Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenerator();
