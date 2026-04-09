const tabs = document.querySelectorAll('.screen-tab');
const screens = document.querySelectorAll('.screen');
const screenLinks = document.querySelectorAll('[data-target-screen]');
const mapHotspots = document.querySelectorAll('.map-hotspot');
const mapDetailHotspots = document.querySelectorAll('.map-detail-hotspot');
const mapModeButtons = document.querySelectorAll('[data-map-set-target]');
const mapInfoCloseButtons = document.querySelectorAll('.map-info-panel__close');
const answerOptions = document.querySelectorAll('.answer-option');
const stageRoot = document.documentElement;
const stageArea = document.querySelector('.stage-area');
const languageToggleEligibleScreens = Array.from(screens).filter((screen) => !['attractor', 'language'].includes(screen.id));

const mapImageSets = {
  wildlife: [
    'assets/images/map-page.png',
    'assets/images/map-page_eat.png',
    'assets/images/map-page_geology.png',
    'assets/images/map-page_history.png',
    'assets/images/map-page_attractions.png',
    'assets/images/map-page_spring.png',
    'assets/images/map-page_summer.png',
    'assets/images/map-page_autumn.png',
    'assets/images/map-page_winter.png'
  ],
  geology: [
    'assets/images/Geology-map-page_1.png',
    'assets/images/Geology-map-page_2.png',
    'assets/images/Geology-map-page_3.png',
    'assets/images/Geology-map-page_4.png',
    'assets/images/Geology-map-page_5.png'
  ],
  history: [
    'assets/images/History-map-page_1.png',
    'assets/images/History-map-page_2.png',
    'assets/images/History-map-page_3.png',
    'assets/images/History-map-page_4.png',
    'assets/images/History-map-page_5.png',
    'assets/images/History-map-page_6.png',
    'assets/images/History-map-page_7.png',
    'assets/images/History-map-page_8.png',
    'assets/images/History-map-page_9.png'
  ]
};

const historyMapCopy = {
  1: {
    title: 'A Stone Age burial chamber',
    imageSrc: 'assets/images/stone-age-burial-chamber.jpg',
    body: [
      '“Llety’r Filiast” (literally translated as “lair of the female greyhound”) is a spectacular example of a Stone Age cromlech or burial chamber approximately 10 minutes walk from the visitor centre, near the Great Orme Ancient Mines.'
    ]
  },
  2: {
    title: 'Kendrick’s Cave',
    imageSrc: 'assets/images/kendricks-cave.jpg',
    body: [
      'In 1880 local stone-mason Mr. Thomas Kendrick was clearing a cave in his garden to extend his workshop and discovered a number of bones, including a remarkable decorated horse’s jaw.',
      'Further excavation has revealed the site as an important Stone Age burial site, and you can see the some of the remains in the Llandudno Museum.'
    ]
  },
  3: {
    title: 'The Great Orme Copper Mine',
    imageSrc: 'assets/images/great-orme-copper-mine.jpg',
    body: [
      'Visit the Great Orme Ancient Mines, explore some of the Bronze Age tunnels, and discover how the Bronze Age miners lit fires deep underground to shatter the rock and work the seams of copper ore with primitive stone hammers and animal bones or even antlers as picks.',
      'In the 17th century there was new demand for copper, and mining began again on a grand scale. You can see surface mines and spoil heaps between the summit and the halfway tram station, as the more modern miners first exploited easily accessible seams near the surface, and then deeper excavations underground.'
    ]
  },
  4: {
    title: 'Pen Dinas Iron Age hill-fort & rocking stone',
    imageSrc: 'assets/images/pen-dinas-hillfort.jpeg',
    body: [
      'This would have been an ideal place for such a settlement, being protected on three sides by steep cliffs, with only one side needing the construction of a built double bank and ditch defence. Inside the fort there was a large community of over 60 roundhouses.',
      'The ‘Rocking Stone’, is believed to be a way of trying people of certain crimes. The prisoner was stood upon the stone blindfolded – if it rocked they were innocent; if it stayed still they would have been thrown down the cliffs!'
    ]
  },
  5: {
    title: 'Medieval Ridge and Furrow Agriculture',
    body: [
      'Near St Tudno’s church are extensive and easily visible remains of the medieval “ridge and furrow” agricultural system, where individual families ploughed strips of land in an open field system.',
      'The abandoning of growing crops in favour of grazing animals in later medieval times has preserved this feature.'
    ]
  },
  6: {
    title: 'Shipwrecks',
    imageSrc: 'assets/images/shipwrecks.jpg',
    body: [
      'The Great Orme headland was a major navigational hazard to ships travelling to Liverpool and there have been many shipwrecks. On New Year’s Day 1824, the “Hornby” struck the rocks and was wrecked.',
      'A crew member called John Williams was thrown onto the cliffs, and scrambled to safety. He settled in the area and became a miner, telling his tale of survival, and the cave below the cliffs became known as Hornby cave. The Llandudno lifeboat was first launched in 1861 to rescue the many shipwrecked sailors of this period.'
    ]
  },
  7: {
    title: 'The Lighthouse',
    imageSrc: 'assets/images/great-orme-lighthouse.jpg',
    body: [
      'The Great Orme lighthouse was built in 1862 by the Mersey Docks and Harbour Company to help guide shipping into the busy port of Liverpool.',
      'After closure in 1985 it was turned into a bed and breakfast hotel – but the original light was saved and is now here in the visitor centre.'
    ]
  },
  8: {
    title: 'The Tramway',
    imageSrc: 'assets/images/great-orme-tramway.jpeg',
    body: [
      'Great Britain\'s only remaining cable-operated street tramway was built in 1902, and runs from Victoria Station in Church Walks, Llandudno, to the Great Orme Summit.',
      'Passengers change tramcars, each named after a Welsh saint, at the Halfway Station.'
    ]
  },
  9: {
    title: 'Wartime Great Orme',
    panelClassName: 'map-info-panel--wide',
    body: [
      'The gun and searchlight emplacements of the Royal Artillery coastal gunnery school can be explored on foot or viewed from above on the Marine Drive.',
      'The summit complex was used as a top secret radar research station, and at the far western end of the headland, a “concrete road” is the old tank track to what was a three-storey building believed to have been a secret experimental radar station.',
      'Around Bishop’s Quarry is an area known as the Hill of Names where it is said, the limestone rocks were originally arranged into the names of their regiments by the soldiers of the Royal Artillery School during the Second World War; people today continue this tradition by writing their own names.'
    ]
  }
};

const geologyMapCopy = {
  1: {
    title: 'Fossils found in Bishop’s Quarry',
    body: [
      'Corals: Corals are marine animals which are often mistaken for plants.',
      'Brachiopods: Brachiopods have shells and a stalk attaching them to the floor.',
      'Trilobites: Trilobites were arthropods which are now extinct.',
      'Crinoids: Crinoids, also called sea lilies, are actually marine animals.'
    ]
  },
  2: {
    title: 'Limestone Pavement',
    body: [
      'As the Ice Age glaciers retreated, they exposed the limestone to rain, which washed into the cracks and eroded them into deep fissures or “grykes” between blocks of limestone known as “clints”.',
      'This creates the limestone pavement, a rare and fragile feature which provides a home for many unusual and delicate plants.'
    ]
  },
  3: {
    title: 'The Great Orme Copper Mine',
    body: [
      'Visit the Great Orme Ancient Mines, explore some of the Bronze Age tunnels, and discover how the Bronze Age miners lit fires deep underground to shatter the rock and work the seams of copper ore with primitive stone hammers and animal bones or even antlers as picks.'
    ]
  },
  4: {
    title: 'Copper Mineral Vein',
    body: [
      'This coloured stripe in the rock is copper ore, which has been mined here since the Bronze Age; you can go round the ancient mines and see how important copper once was.'
    ]
  },
  5: {
    title: 'Glacial Erratics',
    body: [
      'These rocks were carried here inside Ice Age glaciers and dropped as the ice melted; their unusual shapes have inspired local superstitions, and many have been given special names.'
    ]
  }
};

const wildlifeSummerCopy = {
  1: {
    title: 'Summer Icon 1',
    panelPosition: 'below',
    body: [
      'During the summer months, spiked speedwell, common rockrose, hoary rockrose and the purple flowering wild thyme can be seen carpeting areas of limestone grassland.'
    ]
  },
  2: {
    title: 'Summer Icon 2',
    body: [
      'The beautiful dark-red helleborine is a species of orchid which is endangered in Wales, so seeing it on the cliffs is a real treat. Keep an eye out for it in June and July.'
    ]
  },
  3: {
    title: 'Summer Icon 3',
    body: [
      'The sea cliffs come alive as hundreds of kittiwakes, razorbills, cormorants, fulmars and guillemots arrive in spring to nest on narrow cliff ledges. Just follow the sound of their calls, but take care; cliffs can be dangerous!'
    ]
  },
  4: {
    title: 'Summer Icon 4',
    body: [
      'Beginning to flower in late spring and continuing throughout the first 2 months of summer, rose pink thrift plants carpet the grasslands.'
    ]
  }
};

function getMapImageSrc(mapSetName, imageIndex = 0) {
  const imageSet = mapImageSets[mapSetName] ?? mapImageSets.wildlife;
  const resolvedIndex = ['geology', 'history'].includes(mapSetName)
    ? Math.max(imageIndex - 1, 0)
    : imageIndex;

  return imageSet[resolvedIndex] ?? imageSet[0];
}

function setMapSet(stageFrame, mapSetName, imageIndex = 0) {
  if (!stageFrame) {
    return;
  }

  const mapImage = stageFrame.querySelector('[data-map-image="true"]');
  if (!mapImage) {
    return;
  }

  stageFrame.dataset.mapSet = mapSetName;
  stageFrame.dataset.mapImageIndex = `${imageIndex}`;
  mapImage.src = getMapImageSrc(mapSetName, imageIndex);

  const buttons = stageFrame.querySelectorAll('[data-map-set-target]');
  buttons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mapSetTarget === mapSetName);
  });

  hideMapInfoPanel(stageFrame);
}

function positionMapInfoPanel(stageFrame, panel, anchorElement, panelPosition = '') {
  if (!stageFrame || !panel || !anchorElement) {
    panel?.style.removeProperty('left');
    panel?.style.removeProperty('top');
    panel?.style.removeProperty('bottom');
    return;
  }

  const stageRect = stageFrame.getBoundingClientRect();
  const anchorRect = anchorElement.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const gap = 18;

  let left;
  let top;

  if (panelPosition === 'below') {
    left = anchorRect.left - stageRect.left;
    if (left + panelRect.width > stageRect.width - 24) {
      left = stageRect.width - panelRect.width - 24;
    }
    if (left < 24) {
      left = 24;
    }

    top = anchorRect.bottom - stageRect.top + gap;
    if (top + panelRect.height > stageRect.height - 24) {
      top = anchorRect.top - stageRect.top - panelRect.height - gap;
    }
  } else {
    left = anchorRect.left - stageRect.left - panelRect.width - gap;
    if (left < 24) {
      left = anchorRect.right - stageRect.left + gap;
    }
    if (left + panelRect.width > stageRect.width - 24) {
      left = stageRect.width - panelRect.width - 24;
    }

    top = anchorRect.top - stageRect.top;
    if (top + panelRect.height > stageRect.height - 24) {
      top = stageRect.height - panelRect.height - 24;
    }
    if (top < 24) {
      top = 24;
    }
  }

  if (top < 24) {
    top = 24;
  }

  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
  panel.style.bottom = 'auto';
}

function showMapInfoPanel(stageFrame, title, paragraphs, imageSrc = '', panelClassName = '', anchorElement = null, panelPosition = '') {
  const panel = stageFrame?.querySelector('.map-info-panel');
  const panelTitle = panel?.querySelector('.map-info-panel__title');
  const panelBody = panel?.querySelector('.map-info-panel__body');
  const panelImage = panel?.querySelector('.map-info-panel__image');
  const placeholder = panel?.querySelector('.map-info-panel__image-placeholder');

  if (!panel || !panelTitle || !panelBody || !panelImage || !placeholder) {
    return;
  }

  panelTitle.textContent = title;
  panelBody.innerHTML = '';
  panel.classList.remove('map-info-panel--wide');

  paragraphs.forEach((paragraph) => {
    const paragraphNode = document.createElement('p');
    paragraphNode.textContent = paragraph;
    panelBody.append(paragraphNode);
  });

  if (imageSrc) {
    panelImage.src = imageSrc;
    panelImage.hidden = false;
    placeholder.hidden = true;
  } else {
    panelImage.removeAttribute('src');
    panelImage.hidden = true;
    placeholder.hidden = false;
  }

  if (panelClassName) {
    panel.classList.add(panelClassName);
  }

  panel.classList.add('is-visible');
  positionMapInfoPanel(stageFrame, panel, anchorElement, panelPosition);
}

function hideMapInfoPanel(stageFrame) {
  const panel = stageFrame?.querySelector('.map-info-panel');
  const panelImage = panel?.querySelector('.map-info-panel__image');
  const placeholder = panel?.querySelector('.map-info-panel__image-placeholder');
  if (panel) {
    panel.classList.remove('map-info-panel--wide');
    panel.classList.remove('is-visible');
  }
  if (panelImage) {
    panelImage.removeAttribute('src');
    panelImage.hidden = true;
  }
  if (placeholder) {
    placeholder.hidden = false;
  }
}


function dismissMapOverlay(stageFrame) {
  const overlay = stageFrame?.querySelector('.map-mode-toggle');
  const toolbar = stageFrame?.querySelector('.map-mode-toolbar');
  if (overlay) {
    overlay.classList.add('is-dismissed');
  }
  if (toolbar) {
    toolbar.classList.add('is-visible');
  }
}

function resetMapOverlay(stageFrame) {
  const overlay = stageFrame?.querySelector('.map-mode-toggle');
  const toolbar = stageFrame?.querySelector('.map-mode-toolbar');
  if (overlay) {
    overlay.classList.remove('is-dismissed');
  }
  if (toolbar) {
    toolbar.classList.remove('is-visible');
  }
}

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
  englishButton.setAttribute('aria-label', 'Switch to English');
  englishButton.disabled = !isWelsh;
  englishButton.addEventListener('click', () => activateScreen(englishTarget));
  const englishFlag = document.createElement('img');
  englishFlag.src = 'assets/images/flag-en.svg';
  englishFlag.alt = 'English';
  englishButton.append(englishFlag);

  const welshButton = document.createElement('button');
  welshButton.type = 'button';
  welshButton.className = `language-toggle__button${isWelsh ? ' is-active' : ''}`;
  welshButton.setAttribute('aria-label', 'Switch to Welsh');
  welshButton.disabled = isWelsh;
  welshButton.addEventListener('click', () => activateScreen(welshTarget));
  const welshFlag = document.createElement('img');
  welshFlag.src = 'assets/images/flag-cy.svg';
  welshFlag.alt = 'Cymraeg';
  welshButton.append(welshFlag);

  toggle.append(englishButton, welshButton);
  stageFrame.append(toggle);
}

function addQuestionImagePlaceholders() {
  document.querySelectorAll('.test-page-copy').forEach((copyBlock) => {
    copyBlock.classList.add('test-page-copy--with-question-media');

    if (copyBlock.querySelector('.question-image-placeholder')) {
      return;
    }

    const placeholder = document.createElement('div');
    placeholder.className = 'question-image-placeholder';
    placeholder.setAttribute('aria-hidden', 'true');

    const title = copyBlock.querySelector('h2');
    title?.insertAdjacentElement('afterend', placeholder);
  });
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

  const visibleScreen = document.getElementById(targetId);
  const visibleMapFrame = visibleScreen?.querySelector('.stage-frame[data-map-set]');
  if (visibleMapFrame) {
    resetMapOverlay(visibleMapFrame);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateScreen(tab.dataset.target));
});

screenLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const targetId = link.dataset.targetScreen;

    if (targetId) {
      activateScreen(targetId);
    }
  });
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
      const mapSetName = stageFrame.dataset.mapSet || 'wildlife';
      const imageIndex = Number(hotspot.dataset.mapIndex || 0);
      stageFrame.dataset.mapImageIndex = `${imageIndex}`;
      mapImage.src = getMapImageSrc(mapSetName, imageIndex);

      const panelCopy = mapSetName === 'history'
        ? historyMapCopy[imageIndex]
        : mapSetName === 'geology'
          ? geologyMapCopy[imageIndex]
          : null;

      if (panelCopy) {
        showMapInfoPanel(
          stageFrame,
          panelCopy.title,
          panelCopy.body,
          panelCopy.imageSrc ?? '',
          panelCopy.panelClassName ?? '',
          hotspot,
          panelCopy.panelPosition ?? ''
        );
      } else {
        hideMapInfoPanel(stageFrame);
      }
    }
  });
});

mapDetailHotspots.forEach((hotspot) => {
  hotspot.addEventListener('click', () => {
    const stageFrame = hotspot.closest('.stage-frame');
    const detailSet = hotspot.dataset.mapDetailSet;
    const detailKey = Number(hotspot.dataset.mapDetailKey || 0);

    const panelCopy = detailSet === 'wildlife-summer'
      ? wildlifeSummerCopy[detailKey]
      : null;

    if (stageFrame && panelCopy) {
      showMapInfoPanel(
        stageFrame,
        panelCopy.title,
        panelCopy.body,
        panelCopy.imageSrc ?? '',
        panelCopy.panelClassName ?? '',
        hotspot,
        panelCopy.panelPosition ?? ''
      );
    }
  });
});

mapInfoCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const stageFrame = button.closest('.stage-frame');
    if (stageFrame) {
      hideMapInfoPanel(stageFrame);
    }
  });
});

mapModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const stageFrame = button.closest('.stage-frame');
    const mapSetTarget = button.dataset.mapSetTarget;
    const isOverlayButton = button.classList.contains('map-mode-toggle__button');

    if (mapSetTarget) {
      setMapSet(stageFrame, mapSetTarget);
      if (isOverlayButton) {
        dismissMapOverlay(stageFrame);
      }
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
addQuestionImagePlaceholders();
document.querySelectorAll('.stage-frame[data-map-set]').forEach((stageFrame) => {
  setMapSet(stageFrame, stageFrame.dataset.mapSet || 'wildlife');
});
window.addEventListener('resize', fitStageToViewport);
