const popup = document.getElementById('tos-popup');
const btn = document.getElementById('agree-button');

btn.addEventListener("click", () => {
  localStorage.setItem('tosAccepted', 'true');
  popup.style.display = 'none';
});

function tosVerification() {
  if (localStorage.getItem('tosAccepted') == 'true') {
    popup.style.display = 'none';
  }
  else {
    popup.style.display = 'flex';
  }
}