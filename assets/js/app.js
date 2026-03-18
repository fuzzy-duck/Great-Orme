const tabs = document.querySelectorAll('.screen-tab');
const screens = document.querySelectorAll('.screen');

function activateScreen(targetId) {
  tabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.target === targetId);
  });

  screens.forEach((screen) => {
    screen.classList.toggle('is-visible', screen.id === targetId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateScreen(tab.dataset.target));
});
