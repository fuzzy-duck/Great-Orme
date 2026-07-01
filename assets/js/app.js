const tabs = document.querySelectorAll('.screen-tab');
const screens = document.querySelectorAll('.screen');
const screenLinks = document.querySelectorAll('[data-target-screen]');
const mapHotspots = document.querySelectorAll('.map-hotspot');
const mapDetailHotspots = document.querySelectorAll('.map-detail-hotspot');
const mapModeButtons = document.querySelectorAll('[data-map-set-target]');
const mapInfoCloseButtons = document.querySelectorAll('.map-info-panel__close');
const answerOptions = document.querySelectorAll('.answer-option');
const fixedMapPositionDots = document.querySelectorAll('.map-position-dot[data-map-detail-set]');
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
    title: "Ffynnon Powell / Powell's Well",
    panelFixedPosition: { left: 630.609, top: 548.875 },
    body: [
      "Ffynnon Powell, or Powell's Well, is a historic spring on the Great Orme, one of many freshwater sources that would have been vital to the communities who lived and worked on the headland throughout the centuries."
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
    imageSrc: 'assets/images/pen-dinas.jpg',
    panelFixedPosition: { left: 508.448, top: 244.787 },
    body: [
      'This would have been an ideal place for such a settlement, being protected on three sides by steep cliffs, with only one side needing the construction of a built double bank and ditch defence. Inside the fort there was a large community of over 60 roundhouses.',
      'The ‘Rocking Stone’, is believed to be a way of trying people of certain crimes. The prisoner was stood upon the stone blindfolded – if it rocked they were innocent; if it stayed still they would have been thrown down the cliffs!'
    ]
  },
  5: {
    title: 'Medieval Ridge and Furrow Agriculture',
    imageSrc: 'assets/images/ridge-and-furrow-1.jpg',
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
  13: {
    title: 'The Victorian Tramway',
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
      "Around Bishop’s Quarry is an area known as the Hill of Names where it is said, the limestone rocks were originally arranged into the names of their regiments by the soldiers of the Royal Artillery School during the Second World War; people today continue this tradition by writing their own names."
    ]
  },
  10: {
    title: "St Tudno’s Church",
    body: [
      "Parts of this church date back to the 11th Century, making it one of the oldest places of worship in Wales.",
      "St Tudno was a 6th-century Welsh saint who is said to have founded a monastery on the Great Orme. The church that bears his name has been a place of pilgrimage and worship for over a thousand years."
    ]
  },
  12: {
    title: "The Summit Complex",
    body: [
      "The Summit Complex sits at the very top of the Great Orme and consists of a café, restaurant and gift shop with breath-taking views across the bay to the mountains of Snowdonia.",
      "During the Second World War the summit was used as a top secret radar research station."
    ]
  }
};

const geologyMapCopy = {
  1: {
    title: 'Fossils found in Bishop’s Quarry',
    imageSrc: 'assets/images/brachiopods.jpg',
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
    title: 'Rock Contours',
    body: [
      'These layers of rock have been twisted and tilted by underground volcanic forces. As the sea wore away the cliff face, the layers, or “stratifications”, have been revealed.'
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
    imageSrc: 'assets/images/erratic-2.jpg',
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
  },
  5: {
    title: 'Summer Icon 5',
    body: [
      'The grayling butterfly is a master of disguise. The sub-species found on the Great Orme is unique; it cannot be found anywhere else!'
    ]
  },
  6: {
    title: 'Summer Icon 6',
    body: [
      'The silver-studded blue butterfly is small but beautiful, and the sub-species seen here is unique to the Great Orme.'
    ]
  },
  7: {
    title: 'Summer Icon 7',
    body: [
      'Listen for the call of the Great Orme’s resident stonechats among the gorse bushes: distinctive clicks that sound like stones tapped together, giving the bird its name.'
    ]
  }
};

const wildlifeSpringCopy = {
  1: {
    title: 'Spring Icon 1',
    body: [
      'As nature wakes up after the winter, spring marks the arrival of goat kids on the Great Orme. Usually difficult to spot, watch out for them if you see a group of nanny goats (females), but please don’t disturb them.',
      'These are Kashmir goats, much prized for their wool, acquired from Queen Victoria’s Royal herd by Major General Sir Savage Mostyn, and brought here in the 1900s; they have roamed wild ever since.'
    ]
  },
  2: {
    title: 'Spring Icon 2',
    body: [
      'Spring sees our biggest visitor numbers: but these visitors come all the way from Africa! Ring Ouzels, Tree Pipits and Whinchats stop here to “refuel” as they follow the spring migration north.',
      'Swallows, Wheatears and Willow Warblers complete their migration here, settling on the Great Orme to breed each summer.'
    ]
  },
  3: {
    title: 'Spring Icon 3',
    body: [
      'Cotoneaster cambricus or the ‘Great Orme berry’ is found nowhere else but on limestone cliffs of the Great Orme and is Critically Endangered.',
      'It has small white flowers in spring and berries like miniature apples in the autumn. It is these berries that give the plant its Welsh name, Craig Afal (Rock Apple).'
    ]
  },
  4: {
    title: 'Spring Icon 4',
    body: [
      'Other rare wildflowers include spring cinquefoil, spring sandwort and hutchinsia.',
      'Thrift can be seen carpeting areas of grassland and sea cliffs towards the end of spring.'
    ]
  },
  5: {
    title: 'Spring Icon 5',
    body: [
      'On the northern side of the Great Orme are relics of the woodland that once grew on many parts of the headland. Plants like violets, wood sorrel, wood anemones and primroses now thrive under a canopy of bracken.',
      'This habitat provides an important refuge for woodland plants and the insects that rely on them.'
    ]
  }
};

const wildlifeAutumnCopy = {
  1: {
    title: 'Autumn Icon 1',
    body: [
      'In the autumn you can see the billy goats clashing horns to compete for the attention of the nanny goats.'
    ]
  },
  2: {
    title: 'Autumn Icon 2',
    body: [
      'Ring ouzels, tree pipits and whinchats can be seen feeding during their autumn migration as they stop to refuel on their way south to Africa for the winter.'
    ]
  },
  3: {
    title: 'Autumn Icon 3',
    body: [
      'Now is the time to see the small red berries of the wild cotoneaster on the limestone cliffs.'
    ]
  },
  4: {
    title: 'Autumn Icon 4',
    body: [
      'The woodlands are rich with mosses, fungi and lichens, and red campion flowers can be seen up to October.'
    ]
  }
};

const wildlifeWinterCopy = {
  1: {
    title: 'Winter Icon 1',
    body: [
      'Winter sees the arrival of birds from Northern Europe and the Arctic such as the snow bunting, which searches for seeds on the generally snow-free ground as it over-winters here.'
    ]
  },
  2: {
    title: 'Winter Icon 2',
    body: [
      'Lady ferns and harts-tongue ferns can be seen in the cracks of the limestone pavement.'
    ]
  },
  3: {
    title: 'Winter Icon 3',
    body: [
      'Hardy domestic sheep will be out in all weathers, and so will our Country Park Wardens; the heathlands are cut every winter to encourage new seedlings and fresh ground cover.'
    ]
  }
};

const wildlifeAttractionsCopy = {
  1: {
    title: 'Ski Slope and Snowboard Centre',
    body: [
      'With the longest toboggan run in Britain and a scenic PermaSnow ski slope, the centre offers skiing, snowboarding, toboggan & sno-tubing with a fully licensed Alpine Lodge Bar & Restaurant.',
      'Open 10am - 10pm',
      'http://jnllandudno.co.uk',
      '01492 874707'
    ]
  },
  2: {
    title: 'The Great Orme Ancient Mine',
    body: [
      'The copper mines date back to the Bronze Age, and are one of the most astounding archaeological discoveries of recent times.',
      'Open daily mid-March to end of October',
      'Open 10am - last tour 4:30pm',
      'http://www.greatormemines.info/',
      '01492 870447'
    ]
  },
  3: {
    title: 'The Cable Car',
    body: [
      'Running from Happy Valley to the Great Orme Summit, the Cable Car reveals many magnificent views, and at one mile from end to end, is the longest aerial cabin lift in the United Kingdom.',
      'http://www.greatorme.org.uk/cablecar.html'
    ]
  },
  4: {
    title: 'The Tramway',
    body: [
      'Great Britain\'s only remaining cable operated street tramway runs from Victoria Station in Church Walks, Llandudno, to the Great Orme Summit, with passengers changing cars at the Halfway Station.',
      'Open mid-March to early November 10am - 5.45pm daily',
      'http://www.greatormetramway.co.uk/',
      '01492 577877'
    ]
  },
  6: {
    title: 'Rocky Pines Adventure Golf',
    body: [
      'Part of the Summit Complex, Rocky Pines Adventure Golf is an 18-hole course providing spectacular views of the dramatic North Wales coast.',
      'Open daily 11am - 5pm from mid March to early November',
      'http://www.theoldevictorianpicturehouse.co.uk/golf.htm',
      '01492 860870'
    ]
  },
  7: {
    title: 'Great Orme Family Golf',
    body: [
      'The only full sized 9-hole golf course in North Wales, with spectacular views and fun for the whole family.',
      'Open daily 10am-dusk',
      'www.Ormegolf.blogspot.com',
      '07990 517020'
    ]
  },
  8: {
    title: 'Marine Drive',
    body: [
      'A 4 1/2 mile scenic drive around the Great Orme headland, from Llandudno\'s North Shore to Llandudno\'s West Shore, with wonderful views in all directions.',
      '£2.50 per car (which also covers parking at the summit of the Great Orme)'
    ]
  },
  9: {
    title: 'Tramway & Visitor Centre',
    body: [
      'The Great Orme Tramway runs from Victorian Station in Church Walks, Llandudno, to the summit. The Visitor Centre at the tram station provides information about the nature reserve, its wildlife, and the local area.'
    ]
  },
  10: {
    title: "St. Tudno's Church",
    body: [
      "The ancient church of St. Tudno dates back to the 12th century, nestled on the north side of the Great Orme headland. The peaceful churchyard offers stunning sea views and is one of the oldest sites of Christian worship in Wales."
    ]
  },
  11: {
    title: 'Happy Valley Gardens',
    body: [
      "Happy Valley Gardens sits at the base of the Great Orme — a beautiful Victorian pleasure garden offering stunning views of the bay and easy access to the cable car."
    ]
  },
  12: {
    title: 'Pitch & Putt Golf Course',
    body: [
      "A scenic pitch and putt golf course on the Great Orme with spectacular views over Llandudno and the bay."
    ]
  },
  13: {
    title: 'Haulfre Gardens',
    body: [
      "Haulfre Gardens is a beautiful terraced public garden on the slopes of the Great Orme, offering panoramic views across Llandudno including the West Shore and Conwy Estuary."
    ]
  }
};

const wildlifeEatCopy = {
  1: {
    title: 'The Summit Complex',
    body: [
      'The Summit Complex consists of a cafe / restaurant and gift shop with breath-taking views.'
    ]
  },
  2: {
    title: 'Rest and be Thankful Cafe',
    body: [
      'As well as serving rolls, cakes, drinks, ice creams and many other delightful treats, the Cafe also acts as an information centre for the Great Orme and maintains a large range of photograph albums and specialist publications.',
      'https://rest-be-thankful.weeblyte.com'
    ]
  },
  3: {
    title: 'Alpine Lodge',
    body: [
      'The Alpine Lodge bar and restaurant provides panoramic views of the main ski slope, toboggan track, Alpine Adventure Golf course and Llandudno bay.',
      'www.jnlllandudno.co.uk'
    ]
  },
  4: {
    title: 'Parisella’s Cafeteria',
    body: [
      'Set in Happy Valley gardens, Parisella’s Cafeteria provides drinks, cakes, hot meals and Parisella’s own ice cream.',
      'www.parisellasicecream.co.uk',
      '01492 592448'
    ]
  },
  5: {
    title: 'Haulfre Gardens Tea Rooms',
    body: [
      'A traditional tea room set in the beautiful and relaxing location of Haulfre Gardens, serving homemade cakes, scones and bara brith. A sheltered sun-trap, with panoramic views across Llandudno including the West Shore and Conwy Estuary.'
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
  if (mapSetName !== 'history') {
    delete stageFrame.dataset.historyActiveKey;
  } else if (!stageFrame.dataset.historyActiveKey) {
    stageFrame.dataset.historyActiveKey = '';
  }
  mapImage.src = getMapImageSrc(mapSetName, imageIndex);

  const buttons = stageFrame.querySelectorAll('[data-map-set-target]');
  buttons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mapSetTarget === mapSetName);
  });

  hideMapInfoPanel(stageFrame);
  syncHistoryMapDots(stageFrame);
}

function syncHistoryMapDots(stageFrame) {
  const historyOverlay = stageFrame?.querySelector('.map-positioning-overlay--history-staging');
  if (!historyOverlay) {
    return;
  }

  const activeKey = stageFrame.dataset.historyActiveKey || '';
  historyOverlay.querySelectorAll('.map-position-dot').forEach((dot) => {
    const shouldShow = activeKey !== '' && dot.dataset.mapDetailKey === activeKey;
    dot.style.display = shouldShow ? 'block' : 'none';
  });
}

function positionMapInfoPanel(stageFrame, panel, anchorElement, panelPosition = '', panelOffset = null, panelFixedPosition = null) {
  if (!stageFrame || !panel || !anchorElement) {
    panel?.style.removeProperty('left');
    panel?.style.removeProperty('top');
    panel?.style.removeProperty('bottom');
    return;
  }

  let left;
  let top;

  if (panelFixedPosition) {
    left = panelFixedPosition.left;
    top = panelFixedPosition.top;
  } else {
    const stageRect = stageFrame.getBoundingClientRect();
    const anchorRect = anchorElement.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const gap = 18;

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

    if (panelOffset) {
      left += panelOffset.x ?? 0;
      top += panelOffset.y ?? 0;
    }
  }

  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
  panel.style.bottom = 'auto';
}

function showMapInfoPanel(stageFrame, title, paragraphs, imageSrc = '', panelClassName = '', anchorElement = null, panelPosition = '', panelOffset = null, panelFixedPosition = null) {
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
    const labelMatch = paragraph.match(/^([^:]+:)\s*(.*)$/);

    if (labelMatch) {
      const labelNode = document.createElement('strong');
      labelNode.textContent = labelMatch[1];
      paragraphNode.append(labelNode, ` ${labelMatch[2]}`);
    } else {
      paragraphNode.textContent = paragraph;
    }

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
  positionMapInfoPanel(stageFrame, panel, anchorElement, panelPosition, panelOffset, panelFixedPosition);
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
  const scale = Math.max(availableWidth / stageWidth, availableHeight / stageHeight);

  stageRoot.style.setProperty('--stage-scale', `${scale}`);
}

function addQuestionProgressLabels() {
  const questionProgressConfig = [
    { prefix: 'history-test', total: 10 },
    { prefix: 'info', total: 7 }
  ];

  screens.forEach((screen) => {
    const copyBlock = screen.querySelector('.test-page-copy');
    if (!copyBlock) {
      return;
    }

    const matchedConfig = questionProgressConfig.find(({ prefix }) => (
      screen.id === prefix ||
      screen.id.startsWith(`${prefix}-`)
    ));

    if (!matchedConfig || copyBlock.querySelector('.question-progress')) {
      return;
    }

    const baseId = screen.id.replace(/-cy$/, '');
    const suffix = baseId === matchedConfig.prefix
      ? 1
      : Number.parseInt(baseId.replace(`${matchedConfig.prefix}-`, ''), 10);

    if (!Number.isFinite(suffix)) {
      return;
    }

    const progress = document.createElement('span');
    progress.className = 'question-progress';
    progress.textContent = `${suffix} of ${matchedConfig.total}`;
    copyBlock.appendChild(progress);
  });
}

function openStoryMap(screenId, mapSetName) {
  activateScreen(screenId);

  const mapScreen = document.getElementById(screenId);
  const mapFrame = mapScreen?.querySelector('.stage-frame[data-map-set]');
  if (mapFrame && mapSetName) {
    setMapSet(mapFrame, mapSetName);
    dismissMapOverlay(mapFrame);
  }
}

function applyLaunchStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const screenId = params.get('screen');
  const mapSetName = params.get('map');
  const imageIndexRaw = params.get('image');
  const imageIndex = imageIndexRaw === null ? null : Number.parseInt(imageIndexRaw, 10);

  if (!screenId) {
    return;
  }

  const targetScreen = document.getElementById(screenId);
  if (!targetScreen) {
    return;
  }

  activateScreen(screenId);

  const mapFrame = targetScreen.querySelector('.stage-frame[data-map-set]');
  if (!mapFrame || !mapSetName) {
    return;
  }

  setMapSet(mapFrame, mapSetName, Number.isFinite(imageIndex) ? imageIndex : 0);
  dismissMapOverlay(mapFrame);
}

function addStoryMapHotspots() {
  screens.forEach((screen) => {
    const stageFrame = screen.querySelector('.stage-frame--test');
    if (!stageFrame || stageFrame.querySelector('.story-map-hotspot')) {
      return;
    }

    const isHistoryScreen = screen.id.startsWith('history-test');
    const isGeologyScreen = screen.id.startsWith('info');

    if (!isHistoryScreen && !isGeologyScreen) {
      return;
    }

    const hotspot = document.createElement('button');
    hotspot.type = 'button';
    hotspot.className = 'story-map-hotspot';
    hotspot.setAttribute(
      'aria-label',
      isHistoryScreen ? 'Open history map' : 'Open geology map'
    );

    hotspot.addEventListener('click', () => {
      const targetScreenId = screen.id.endsWith('-cy') ? 'explore-map-cy' : 'explore-map';
      openStoryMap(targetScreenId, isHistoryScreen ? 'history' : 'geology');
    });

    stageFrame.appendChild(hotspot);
  });
}

function activateScreen(targetId) {
  tabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.target === targetId);
  });

  screens.forEach((screen) => {
    const isVisible = screen.id === targetId;
    screen.classList.toggle('is-visible', isVisible);

    const scrollBodies = screen.querySelectorAll('.test-page-scroll-body');
    scrollBodies.forEach((scrollBody) => {
      scrollBody.scrollTop = 0;
    });

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

      if (mapSetName === 'wildlife' && imageIndex === 2) {
        setMapSet(stageFrame, 'geology', 1);
        return;
      }

      if (mapSetName === 'wildlife' && imageIndex === 3) {
        setMapSet(stageFrame, 'history', 1);
        return;
      }

      stageFrame.dataset.mapImageIndex = `${imageIndex}`;
      mapImage.src = getMapImageSrc(mapSetName, imageIndex);
      if (mapSetName === 'history') {
        stageFrame.dataset.historyActiveKey = `${imageIndex}`;
        syncHistoryMapDots(stageFrame);
      }

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
          panelCopy.panelPosition ?? '',
          panelCopy.panelOffset ?? null,
          panelCopy.panelFixedPosition ?? null
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
      : detailSet === 'wildlife-spring'
        ? wildlifeSpringCopy[detailKey]
        : detailSet === 'wildlife-autumn'
          ? wildlifeAutumnCopy[detailKey]
          : detailSet === 'wildlife-winter'
            ? wildlifeWinterCopy[detailKey]
            : detailSet === 'wildlife-attractions'
              ? wildlifeAttractionsCopy[detailKey]
              : detailSet === 'wildlife-eat'
                ? wildlifeEatCopy[detailKey]
                : detailSet === 'geology'
                  ? geologyMapCopy[detailKey]
        : null;

    if (stageFrame && panelCopy) {
      showMapInfoPanel(
        stageFrame,
        panelCopy.title,
        panelCopy.body,
        panelCopy.imageSrc ?? '',
        panelCopy.panelClassName ?? '',
        hotspot,
        panelCopy.panelPosition ?? '',
        panelCopy.panelOffset ?? null,
        panelCopy.panelFixedPosition ?? null
      );
    }
  });
});

fixedMapPositionDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const stageFrame = dot.closest('.stage-frame');
    const detailSet = dot.dataset.mapDetailSet;
    const detailKey = Number(dot.dataset.mapPopupKey || dot.dataset.mapDetailKey || 0);

    const panelCopy = detailSet === 'wildlife-summer'
      ? wildlifeSummerCopy[detailKey]
      : detailSet === 'wildlife-spring'
        ? wildlifeSpringCopy[detailKey]
        : detailSet === 'wildlife-autumn'
          ? wildlifeAutumnCopy[detailKey]
          : detailSet === 'wildlife-winter'
            ? wildlifeWinterCopy[detailKey]
            : detailSet === 'wildlife-attractions'
              ? wildlifeAttractionsCopy[detailKey]
              : detailSet === 'wildlife-eat'
                ? wildlifeEatCopy[detailKey]
                : detailSet === 'geology'
                  ? geologyMapCopy[detailKey]
                  : detailSet === 'history'
                    ? historyMapCopy[detailKey]
                    : null;

    if (stageFrame && panelCopy) {
      showMapInfoPanel(
        stageFrame,
        panelCopy.title,
        panelCopy.body,
        panelCopy.imageSrc ?? '',
        panelCopy.panelClassName ?? '',
        dot,
        panelCopy.panelPosition ?? '',
        panelCopy.panelOffset ?? null,
        panelCopy.panelFixedPosition ?? null
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
      item.classList.remove('is-selected', 'is-correct', 'is-incorrect', 'is-correct-answer');
    });

    option.classList.add('is-selected');

    const isCorrect = option.dataset.correct === 'true';
    const correctOption = group.querySelector('[data-correct="true"]');

    if (isCorrect) {
      option.classList.add('is-correct');
    } else {
      option.classList.add('is-incorrect');
      correctOption?.classList.add('is-correct-answer');
    }

    let feedback = group.nextElementSibling;
    if (!feedback || !feedback.classList.contains('answer-feedback')) {
      feedback = document.createElement('p');
      feedback.className = 'answer-feedback';
      group.insertAdjacentElement('afterend', feedback);
    }

    feedback.classList.toggle('is-correct', isCorrect);
    feedback.classList.toggle('is-incorrect', !isCorrect);
    feedback.textContent = isCorrect
      ? 'Correct answer selected.'
      : '';
  });
});

fitStageToViewport();
languageToggleEligibleScreens.forEach(createLanguageToggle);
addQuestionImagePlaceholders();
addQuestionProgressLabels();
addStoryMapHotspots();
document.querySelectorAll('.stage-frame[data-map-set]').forEach((stageFrame) => {
  setMapSet(stageFrame, stageFrame.dataset.mapSet || 'wildlife');
});
applyLaunchStateFromUrl();
window.addEventListener('resize', fitStageToViewport);

function updatePositioningHud(stageFrame) {
  const sr = stageFrame.getBoundingClientRect();
  if (!sr.width) return;
  stageFrame.querySelectorAll('.map-positioning-hud').forEach((hud) => {
    const list = hud.querySelector('.map-positioning-hud__list');
    if (!list) return;
    const group = hud.dataset.positionGroup;
    const overlay = group ? stageFrame.querySelector(`.map-positioning-overlay--${group}`) : null;
    const dots = overlay
      ? overlay.querySelectorAll('.map-position-dot')
      : stageFrame.querySelectorAll('.map-positioning-overlay .map-position-dot');
    list.innerHTML = '';
    dots.forEach((dot, i) => {
      const er = dot.getBoundingClientRect();
      const x = ((er.left + er.width / 2 - sr.left) / sr.width * 100).toFixed(2);
      const y = ((er.top + er.height / 2 - sr.top) / sr.height * 100).toFixed(2);
      const colorClass = [...dot.classList].find(c => c.startsWith('map-position-dot--'));
      const color = colorClass ? colorClass.replace('map-position-dot--', '').toUpperCase() : `${i + 1}`;
      const label = (dot.getAttribute('aria-label') || '').replace(' placeholder', '');
      const li = document.createElement('li');
      li.textContent = `${i + 1}. ${color} | ${label} | ${x}%, ${y}%`;
      list.appendChild(li);
    });
  });
}

document.querySelectorAll('.stage-frame').forEach(updatePositioningHud);
document.querySelectorAll('.stage-frame[data-map-set="history"]').forEach(syncHistoryMapDots);

// Debug labels
screens.forEach((screen) => {
  const label = document.createElement('div');
  label.className = 'debug-screen-label';
  label.textContent = screen.id;
  screen.appendChild(label);
});
