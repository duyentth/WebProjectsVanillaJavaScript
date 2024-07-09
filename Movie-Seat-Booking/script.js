const container = document.querySelector(".container");
// const seats = document.querySelectorAll(".row.seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");
let ticketPrice = +movieSelect.value;

//update Count and Total
const updateCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seats = document.querySelectorAll(".row .seat:not(.occupied)");
  const movieSelected = document.querySelector("#movie");
  ticketPrice = +movieSelected.value;
  let seatsNum = selectedSeats.length;
  count.innerHTML = seatsNum;
  total.innerHTML = ticketPrice * seatsNum;
  const seatsIndex = [...selectedSeats].map((selectedSeat) =>
    [...seats].indexOf(selectedSeat)
  );
  localStorage.setItem("seatsIndex", JSON.stringify(seatsIndex));
  localStorage.setItem("selectedMovieIndex", movieSelected.selectedIndex);
  localStorage.setItem("moviePrice", movieSelected.value);
};

//movie change event
movieSelect.addEventListener("change", (e) => {
  updateCountAndTotal();
});

// seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountAndTotal();
  }
});

//Initial loading
const init = () => {
  const seats = document.querySelectorAll(".row .seat:not(.occupied)");
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const moviePrice = +localStorage.getItem("moviePrice");
  const seatsIndex = JSON.parse(localStorage.getItem("seatsIndex"));
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  if (seatsIndex !== null && seatsIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (seatsIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  let seatsNum = selectedSeats.length;
  count.innerHTML = seatsNum;
  total.innerHTML = moviePrice * seatsNum;
};

init();
