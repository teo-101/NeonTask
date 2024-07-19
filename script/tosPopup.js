const popup = document.getElementById('tos-popup');
const btn = document.getElementById('agree-button');

btn.addEventListener("click", () => {
  localStorage.setItem('tosAccepted', 'true');
  popup.style.display = 'none';
});

function tosVerification() {
  if (localStorage.getItem('tosAccepted') !== 'true') {
    popup.style.display = 'flex';
  }
  else {
    popup.style.display = 'none';
  }
}