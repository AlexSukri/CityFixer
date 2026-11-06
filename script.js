// ===== ЗВУК СБОЯ (файл) =====
const glitchSound = document.getElementById('glitchSound');

function playGlitch(duration = 0.4, volume = 0.5) {
  if (!glitchSound) return;
  try {
    glitchSound.pause();
    glitchSound.currentTime = 0;
    glitchSound.volume = volume;
    glitchSound.play().catch(() => {});
    setTimeout(() => {
      glitchSound.pause();
    }, duration * 1000);
  } catch (e) {}
}

// ===== ЗВУК ПЕЧАТИ =====
const typingSound = document.getElementById('typingSound');

function typingStart() {
  if (!typingSound) return;
  typingSound.volume = 0.8;
  typingSound.currentTime = 0;
  typingSound.play().catch(() => {});
}

function typingPause() {
  if (!typingSound) return;
  typingSound.pause();
}

function typingResume() {
  if (!typingSound) return;
  typingSound.play().catch(() => {});
}

function typingStop() {
  if (!typingSound) return;
  typingSound.pause();
  typingSound.currentTime = 0;
}

// ===== ЗАГРУЗКА =====
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const loaderLine = document.getElementById('loaderLine');
const loaderStart = document.getElementById('loaderStart');

const LOADER_LINES = [
  'Сканируем местность…',
  'Отмываем деньги…',
  'Заводим связи…',
  'Не доверяй каждому прохожему…',
  'Учимся на ошибках…',
  'Проверяем контакты…',
  'Подключаемся к сети…',
  'Ищем работу…'
];

let loadProgress = 0;
let lineIndex = 0;
let loaderDone = false;
let lineTimeout = null;

function nextLine() {
  if (loaderDone) return;
  lineIndex = (lineIndex + 1) % LOADER_LINES.length;
  loaderLine.style.opacity = 0;
  setTimeout(() => {
    if (loaderDone) return;
    loaderLine.textContent = LOADER_LINES[lineIndex];
    loaderLine.style.opacity = 0.8;
  }, 150);
  lineTimeout = setTimeout(nextLine, 800 + Math.random() * 400);
}
nextLine();

// Прогресс за 4 секунды
const loadStartTime = Date.now();
const LOAD_DURATION = 4000;

const loadTimer = setInterval(() => {
  const elapsed = Date.now() - loadStartTime;
  loadProgress = Math.min(100, (elapsed / LOAD_DURATION) * 100);
  loaderBar.style.width = loadProgress + '%';
  loaderPercent.textContent = Math.floor(loadProgress) + '%';

  if (loadProgress >= 100) {
    clearInterval(loadTimer);
    loaderDone = true;
    clearTimeout(lineTimeout);
    loaderLine.textContent = 'Готово.';
    loaderLine.style.opacity = 0.8;
    setTimeout(() => {
      loaderStart.classList.add('show');
    }, 300);
  }
}, 50);

// ===== СТАРТ ПО НАЖАТИЮ =====
function startGame() {
  if (!loaderStart.classList.contains('show')) return;
  loader.classList.add('hide');
  document.body.removeEventListener('pointerdown', startGame);
  document.body.removeEventListener('touchstart', startGame);
  document.body.removeEventListener('keydown', startGame);

  // Запуск дождя
  const rainSound = document.getElementById('rainSound');
  if (rainSound) {
    rainSound.volume = 0.4; // Чуть тише, чтобы не перебивал музыку
    rainSound.play().catch(e => console.log("Ошибка дождя:", e));
  }

  // Запуск музыки меню
  const menuMusic = document.getElementById('menuMusic');
  if (menuMusic) {
    menuMusic.volume = 0.6;
    menuMusic.play().catch(e => console.log("Ошибка музыки:", e));
  }

  // Небольшая пауза, потом меню
  setTimeout(() => {
    document.body.classList.add('ready');
    startMenu();
  }, 400);
}

document.body.addEventListener('pointerdown', startGame);
document.body.addEventListener('touchstart', startGame);
document.body.addEventListener('keydown', startGame);

// ===== ДОЖДЬ =====
const rain = document.getElementById('rain');
for (let i = 0; i < 55; i++) {
  const d = document.createElement('div');
  d.className = 'drop';
  const near = Math.random() > 0.65;
  d.style.left = Math.random() * 100 + '%';
  d.style.width = near ? '2px' : '1px';
  d.style.height = (near ? 55 + Math.random()*80 : 30 + Math.random()*40) + 'px';
  d.style.animationDuration = (near ? 0.5 + Math.random()*0.2 : 0.8 + Math.random()*0.5) + 's';
  d.style.animationDelay = (Math.random() * 2) + 's';
  d.style.opacity = near ? 0.55 + Math.random()*0.25 : 0.2 + Math.random()*0.25;
  rain.appendChild(d);
}

// ===== «ПОЛОМКА» ВЫВЕСКИ =====
const letters = document.querySelectorAll('.letter');
setInterval(() => {
  const count = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < count; i++) {
    const l = letters[Math.floor(Math.random() * letters.length)];
    l.classList.add('glitch');
    setTimeout(() => l.classList.remove('glitch'), 320);
  }
}, 10000 + Math.random() * 4000);

// ===== МЕНЮ =====
const titles = document.getElementById('titles');
const flash = document.getElementById('flash');
const choices = document.getElementById('choices');
const dot = document.getElementById('dot');
const phraseLines = document.getElementById('phraseLines');
const lineA = document.getElementById('lineA');
const lineB = document.getElementById('lineB');

const LINES = [
  'Что для тебя важнее:',
  'тихая жизнь — или смерть в лучах славы?'
];
const BASE_SPEED = 45;
const PAUSE = 450;
const PAUSE_AFTER = ['важнее:', 'тихая жизнь', '—'];

let glitchInterval = null;

// ===== СТАРТ МЕНЮ (после нажатия) =====
function startMenu() {
  setTimeout(() => {
    titles.classList.add('glitch1');
    playGlitch(0.5, 0.5);
    setTimeout(() => titles.classList.remove('glitch1'), 600);
  }, 4200);

  setTimeout(() => {
    titles.classList.add('break');
    playGlitch(0.4, 0.7);
  }, 6600);

  setTimeout(() => {
    dot.classList.add('blink');
    setTimeout(() => {
      dot.style.display = 'none';
      phraseLines.classList.add('on');
      startTyping();
    }, 1500);
  }, 7400);
}

function typeLine(el, text, onDone) {
  let i = 0;
  function step() {
    if (i >= text.length) { onDone(); return; }
    const ch = text[i];
    el.textContent += ch;
    i++;
    const typed = text.slice(0, i);
    let delay = BASE_SPEED;
    let isPause = false;
    for (const p of PAUSE_AFTER) {
      if (typed.endsWith(p)) { delay = PAUSE; isPause = true; break; }
    }

    if (isPause) {
      typingPause();
      setTimeout(() => {
        typingResume();
        step();
      }, delay);
    } else {
      setTimeout(step, delay);
    }
  }
  step();
}

function startTyping() {
  typingStart();

  typeLine(lineA, LINES[0], () => {
    lineA.setAttribute('data-text', LINES[0]);
    setTimeout(() => {
      typeLine(lineB, LINES[1], () => {
        lineB.setAttribute('data-text', LINES[1]);
        typingStop();
        choices.classList.add('show');

        if (glitchInterval) clearInterval(glitchInterval);
        glitchInterval = setInterval(() => {
          lineA.classList.add('pglitch');
          lineB.classList.add('pglitch');
          playGlitch(0.35, 0.4);
          setTimeout(() => {
            lineA.classList.remove('pglitch');
            lineB.classList.remove('pglitch');
          }, 350);
        }, 4000);
      });
    }, 400);
  });
}

function choose() {
  if (glitchInterval) clearInterval(glitchInterval);
  flash.classList.add('on');
  playGlitch(0.4, 0.5);
  setTimeout(() => flash.classList.remove('on'), 400);

  // плавное затухание музыки
  const menuMusic = document.getElementById('menuMusic');
  if (menuMusic && !menuMusic.paused) {
    let vol = menuMusic.volume;
    const fade = setInterval(() => {
      vol -= 0.03;
      if (vol <= 0) {
        clearInterval(fade);
        menuMusic.pause();
        menuMusic.currentTime = 0;
      } else {
        menuMusic.volume = vol;
      }
    }, 80);
  }
}

document.getElementById('btnCalm').addEventListener('click', choose);
document.getElementById('btnLegend').addEventListener('click', choose);
