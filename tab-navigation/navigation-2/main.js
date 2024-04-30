const buttons = document.querySelectorAll(".btn");
const cards = document.querySelectorAll(".card");
const icons = document.querySelectorAll("i")
function showCard(e, index) {
//adds the hidden-city class to all city element and removes the active-btn class from all
buttons
for (let q = 0; q < cards.length; q+=1) {
cards[q].classList.add("hidden-card");
cards[q].classList.remove("animate");
icons[q].classList.remove("active-btn");
buttons[q].classList.remove("active-btn");
}
//adding the active-btn class to the clicked button
e.target.classList.add("active-btn");
// picking the right card and make it visible
cards[index].classList.remove("hidden-card");
cards[index].classList.add("animate");
}
buttons.forEach((button, index) => {
button.addEventListener("click", (e) => {
showCard(e, index);
});
});