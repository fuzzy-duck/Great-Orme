const tabs = document.querySelectorAll('.screen-tab');
const screens = document.querySelectorAll('.screen');
const screenLinks = document.querySelectorAll('[data-target-screen]');
const mapHotspots = document.querySelectorAll('.map-hotspot');
const answerOptions = document.querySelectorAll('.answer-option');
const stageRoot = document.documentElement;
const stageArea = document.querySelector('.stage-area');
const languageToggleEligibleScreens = Array.from(screens).filter((screen) => !['attractor', 'language'].includes(screen.id));

function getLanguageTarget(screenId, language) {
  const isWelsh = screenId.endsWith('-cy');
  const baseId = isWelsh ? screenId.slice(0, -3) : screenId;

  if (language === 'cy') {
    return `${baseId}-cy`;
  }

  return baseId;
}

function createLanguageToggle(screen) {
  const stageFrame = screen.querySelector('.stage-frame');
  if (!stageFrame) {
    return;
  }

  const currentScreenId = screen.id;
  const isWelsh = currentScreenId.endsWith('-cy');
  const englishTarget = getLanguageTarget(currentScreenId, 'en');
  const welshTarget = getLanguageTarget(currentScreenId, 'cy');
  const englishExists = document.getElementById(englishTarget);
  const welshExists = document.getElementById(welshTarget);

  if (!englishExists || !welshExists) {
    return;
  }

  const toggle = document.createElement('div');
  toggle.className = 'language-toggle';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', 'Language toggle');

  const englishButton = document.createElement('button');
  englishButton.type = 'button';
  englishButton.className = `language-toggle__button${isWelsh ? '' : ' is-active'}`;
  englishButton.textContent = 'EN';
  englishButton.disabled = !isWelsh;
  englishButton.addEventListener('click', () => activateScreen(englishTarget));

  const welshButton = document.createElement('button');
  welshButton.type = 'button';
  welshButton.className = `language-toggle__button${isWelsh ? ' is-active' : ''}`;
  welshButton.textContent = 'CY';
  welshButton.disabled = isWelsh;
  welshButton.addEventListener('click', () => activateScreen(welshTarget));

  toggle.append(englishButton, welshButton);
  stageFrame.append(toggle);
}

function fitStageToViewport() {
  const stageWidth = 1920;
  const stageHeight = 1080;
  const stageAreaStyles = stageArea ? window.getComputedStyle(stageArea) : null;
  const horizontalPadding = stageAreaStyles
    ? parseFloat(stageAreaStyles.paddingLeft) + parseFloat(stageAreaStyles.paddingRight)
    : 0;
  const verticalPadding = stageAreaStyles
    ? parseFloat(stageAreaStyles.paddingTop) + parseFloat(stageAreaStyles.paddingBottom)
    : 0;
  const availableWidth = Math.max(window.innerWidth - horizontalPadding, 320);
  const availableHeight = Math.max(window.innerHeight - verticalPadding, 180);
  const scale = Math.min(availableWidth / stageWidth, availableHeight / stageHeight, 1);

  stageRoot.style.setProperty('--stage-scale', `${scale}`);
}

function activateScreen(targetId) {
  tabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.target === targetId);
  });

  screens.forEach((screen) => {
    const isVisible = screen.id === targetId;
    screen.classList.toggle('is-visible', isVisible);

    const videos = screen.querySelectorAll('video');
    videos.forEach((video) => {
      if (isVisible) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateScreen(tab.dataset.target));
});

screenLinks.forEach((link) => {
  link.addEventListener('click', () => activateScreen(link.dataset.targetScreen));
});

mapHotspots.forEach((hotspot) => {
  hotspot.addEventListener('click', () => {
    if (hotspot.dataset.targetScreen) {
      activateScreen(hotspot.dataset.targetScreen);
      return;
    }

    const stageFrame = hotspot.closest('.stage-frame');
    const mapImage = stageFrame?.querySelector('[data-map-image="true"]');

    if (mapImage) {
      mapImage.src = hotspot.dataset.imageSrc;
    }
  });
});

answerOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const group = option.closest('.answer-options');
    if (!group) {
      return;
    }

    const optionsInGroup = group.querySelectorAll('.answer-option');
    optionsInGroup.forEach((item) => {
      item.classList.remove('is-selected', 'is-correct', 'is-incorrect');
    });

    option.classList.add('is-selected');

    const isCorrect = option.dataset.correct === 'true';

    option.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

    let feedback = group.nextElementSibling;
    if (!feedback || !feedback.classList.contains('answer-feedback')) {
      feedback = document.createElement('p');
      feedback.className = 'answer-feedback';
      group.insertAdjacentElement('afterend', feedback);
    }

    feedback.classList.toggle('is-correct', isCorrect);
    feedback.classList.toggle('is-incorrect', !isCorrect);
    feedback.textContent = isCorrect
      ? 'Correct.'
      : `Incorrect. The correct answer is ${group.querySelector('[data-correct="true"] span')?.textContent ?? ''}.`;
  });
});

fitStageToViewport();
languageToggleEligibleScreens.forEach(createLanguageToggle);
window.addEventListener('resize', fitStageToViewport);
