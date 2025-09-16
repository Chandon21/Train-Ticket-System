// Set minimum date = today
let today = new Date().toISOString().split("T")[0];
document.getElementById("journey-date").setAttribute("min", today);

const seatLayout = document.getElementById("seat-layout");
const timerMessage = document.getElementById("timer-message");
const confirmation = document.getElementById("confirmation");
const ticketDetails = document.getElementById("ticket-details");
const priceTag = document.getElementById("total-price");

let selectedSeat = null;
let timer = null;
let seatPrice = 500; // ৳500 per seat

// Create seat layout (16 seats)
for (let i = 1; i <= 16; i++) {
  let seat = document.createElement("div");
  seat.classList.add("seat");
  seat.textContent = i;
  seat.addEventListener("click", () => selectSeat(seat, i));
  seatLayout.appendChild(seat);
}

// Seat selection with 2 min timeout
function selectSeat(seat, seatNumber) {
  if (seat.classList.contains("booked")) return;

  // Clear previous seat
  document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
  seat.classList.add("selected");
  selectedSeat = seatNumber;

  // Show price
  priceTag.textContent = `৳${seatPrice}`;

  // Start 2 min timer
  clearInterval(timer);
  let timeLeft = 120;
  timerMessage.textContent = `You have ${timeLeft} seconds to confirm payment.`;

  timer = setInterval(() => {
    timeLeft--;
    timerMessage.textContent = `You have ${timeLeft} seconds to confirm payment.`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      seat.classList.remove("selected");
      selectedSeat = null;
      priceTag.textContent = "৳0";
      timerMessage.textContent = "⏰ Time expired! Please select a seat again.";
    }
  }, 1000);
}

// Payment confirmation
document.getElementById("confirm-payment").addEventListener("click", () => {
  const date = document.getElementById("journey-date").value;
  const time = document.getElementById("journey-time").value;
  const payment = document.getElementById("payment-method").value;

  if (!date || !time || !selectedSeat || !payment) {
    alert("⚠️ Please select date, time, seat, and payment method.");
    return;
  }

  // Confirm ticket
  clearInterval(timer);
  document.querySelector(`.seat:nth-child(${selectedSeat})`).classList.add("booked");

  confirmation.style.display = "block";
  ticketDetails.innerHTML = `
    <strong>Date:</strong> ${date} <br>
    <strong>Time:</strong> ${time} <br>
    <strong>Seat:</strong> ${selectedSeat} <br>
    <strong>Price:</strong> ৳${seatPrice} <br>
    <strong>Payment:</strong> ${payment.toUpperCase()}
  `;
});
