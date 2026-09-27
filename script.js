const pages = [
    {
        type: "cover",
        eyebrow: "ЗАЧАРОВАННАЯ КНИГА",
        title: "История длиной 7 месяцев",
        copy: "Удача 3",
        caption: "ОДНА ИСТОРИЯ. ДВА СЕРДЦА."
    },
    {
        eyebrow: "ГЛАВА I · ДЕКАБРЬ",
        title: "С чего началась эта книга",
        photos: [{ file: "photo-02-chat.jpg", label: "ФОТО 02 · НАШ ПЕРВЫЙ ШАГ", alt: "Переписка, с которой началась наша история" }],
        caption: "Иногда одно «привет» открывает целый новый мир."
    },
    {
        eyebrow: "ГЛАВА II · ЯНВАРЬ",
        title: "Январь пролетел незаметно",
        copy: "Когда ты рядом, даже целый месяц кажется одним счастливым мгновением.",
        photos: [{ file: "photo-04-january.jpg", label: "ФОТО 04 · ЯНВАРЬ", alt: "Январское воспоминание" }]
    },
    {
        eyebrow: "ГЛАВА III · НАЧАЛО",
        title: "26.02.26",
        copy: "День, когда наша история стала нашей. С этого момента мы уже не просто переписывались: мы выбрали быть вместе.",
        photos: [{ file: "photo-05-start.jpg", label: "ФОТО 05 · ЭТОТ ДЕНЬ", alt: "Сообщения о начале наших отношений" }]
    },
    {
        eyebrow: "ГЛАВА IV · ПЕРВЫЙ МЕСЯЦ",
        title: "1 месяц",
        copy: "Первый месяц рядом, и уже столько тепла, нежности и маленьких моментов, которые хочется сохранить.",
        photos: [{ file: "photo-06-roses.jpg", label: "ФОТО 06 · ЦВЕТЫ ДЛЯ ТЕБЯ", alt: "Нежный букет роз" }]
    },
    {
        eyebrow: "ГЛАВА V · АПРЕЛЬ",
        title: "Апрель пролетел незаметно",
        copy: "С тобой обычные дни становятся воспоминаниями, к которым хочется возвращаться.",
        photos: [{ file: "photo-07-april.jpg", label: "ФОТО 07 · НАШ АПРЕЛЬ", alt: "Наше апрельское фото" }]
    },
    {
        eyebrow: "ГЛАВА VI · МАЙ",
        title: "Май — мы счастливы",
        copy: "Пусть мир вокруг меняется, главное остаётся прежним: мы рядом и нам хорошо.",
        photos: [
            { file: "photo-08-may-selfie.jpg", label: "ФОТО 08 · МАЙ", alt: "Майское селфи" },
            { file: "photo-09-may-together.jpg", label: "ФОТО 09 · ВМЕСТЕ", alt: "Мы вдвоём в городе" }
        ]
    },
    {
        eyebrow: "ГЛАВА VII · ИЮНЬ",
        title: "Июнь — не всё сразу",
        copy: "Мы учимся понимать друг друга, бережно проходить непростые дни и всё равно оставаться рядом.",
        photos: [
            { file: "photo-10-june-funny.jpg", label: "ФОТО 10 · НАШИ МОМЕНТЫ", alt: "Весёлое совместное фото" },
            { file: "photo-11-june-umbrella.jpg", label: "ФОТО 11 · ДОЖДЛИВЫЙ ДЕНЬ", alt: "Встреча под зонтом" }
        ]
    },
    {
        eyebrow: "ГЛАВА VIII · ПЯТЬ МЕСЯЦЕВ",
        title: "5 месяцев счастья",
        copy: "Наш маленький мир, в котором есть место и большим чувствам, и самым уютным мелочам.",
        photos: [{ file: "photo-12-five-months.jpg", label: "ФОТО 12 · НАШ МИР", alt: "Наши фотографии и уютные моменты" }]
    },
    {
        eyebrow: "ДОСТИЖЕНИЕ ОТКРЫТО",
        title: "Полгода",
        copy: "Шесть месяцев вместе. Достижение выполнено: пройти целую главу, не потеряв самое важное — друг друга.",
        achievement: true,
        photos: [{ file: "photo-13-half-year.jpg", label: "ФОТО 13 · ПОЛГОДА", alt: "Праздничный букет в честь наших отношений" }]
    },
    {
        eyebrow: "ГЛАВА X · СЕНТЯБРЬ",
        title: "Сентябрь — продолжение следует",
        letter: "Моя любимая Лизонька, я тебя очень сильно люблю. Все трудности временны и всё будет у нас с тобою хорошо. Я стараюсь всегда делать тебя счастливой и быть твоей точкой опоры в любых ситуациях. У нас бывают разные ситуации, но мы всё равно по-прежнему остаёмся любимыми и просто счастливыми. Я хочу сказать тебе огромное спасибо, моё солнышко, за то, что ты у меня есть, за твою заботу, внимание ко мне, поддержку и всё самое лучшее. Я могу перечислять твои достоинства до бесконечности, поэтому просто всегда оставайся такой, какая ты есть. У нас всё получится."
    }
];

const craftScreen = document.querySelector("#craftScreen");
const storyScreen = document.querySelector("#storyScreen");
const pageContent = document.querySelector("#pageContent");
const pageCounter = document.querySelector("#pageCounter");
const previousButton = document.querySelector("#previousPage");
const nextButton = document.querySelector("#nextPage");
const pageDots = document.querySelector("#pageDots");
const soundToggle = document.querySelector("#soundToggle");
let currentPage = 0;
let soundEnabled = false;
let audioContext;

function makePhoto(photo) {
    const frame = document.createElement("div");
    frame.className = "photo-frame is-missing";
    frame.dataset.label = photo.label;
    const image = document.createElement("img");
    image.src = `assets/photos/${photo.file}`;
    image.alt = photo.alt;
    image.loading = "eager";
    image.addEventListener("load", () => frame.classList.remove("is-missing"));
    image.addEventListener("error", () => image.remove());
    frame.append(image);
    return frame;
}

function playPageSound() {
    if (!soundEnabled) return;
    audioContext ??= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(230, audioContext.currentTime + 0.055);
    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.06);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.06);
}

function renderPage() {
    const page = pages[currentPage];
    const inner = document.createElement("div");
    inner.className = `page-inner${page.letter ? " final-letter" : ""}`;

    const eyebrow = document.createElement("p");
    eyebrow.className = "page-eyebrow";
    eyebrow.textContent = page.eyebrow;
    inner.append(eyebrow);

    const title = document.createElement("h1");
    title.className = "page-title";
    title.textContent = page.title;
    inner.append(title);

    if (page.copy) {
        const copy = document.createElement("p");
        copy.className = "page-copy";
        copy.textContent = page.copy;
        inner.append(copy);
    }

    if (page.achievement) {
        const achievement = document.createElement("div");
        achievement.className = "achievement";
        achievement.innerHTML = '<span class="achievement-icon" aria-hidden="true">♥</span><div><p class="achievement-name">ДОСТИЖЕНИЕ ВЫПОЛНЕНО</p><p class="achievement-title">«Полгода вместе»</p></div>';
        inner.append(achievement);
    }

    if (page.letter) {
        const letter = document.createElement("p");
        letter.className = "page-copy";
        letter.textContent = page.letter;
        inner.append(letter);
        const signature = document.createElement("p");
        signature.className = "final-signature";
        signature.textContent = "Всегда твой ♥";
        inner.append(signature);
    }

    if (page.photos?.length) {
        const photoGrid = document.createElement("div");
        photoGrid.className = "photo-grid";
        photoGrid.style.setProperty("--photo-columns", String(Math.min(page.photos.length, 2)));
        for (const photo of page.photos) photoGrid.append(makePhoto(photo));
        inner.append(photoGrid);
    }

    if (page.caption) {
        const caption = document.createElement("p");
        caption.className = "photo-caption";
        caption.textContent = page.caption;
        inner.append(caption);
    }

    pageContent.replaceChildren(inner);
    pageContent.dataset.pageMark = String(currentPage);
    pageCounter.textContent = currentPage === 0 ? "ОБЛОЖКА" : `СТРАНИЦА ${currentPage} ИЗ ${pages.length - 1}`;
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;
    pageDots.replaceChildren(...pages.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "page-dot";
        dot.setAttribute("aria-label", index === 0 ? "Обложка" : `Страница ${index}`);
        if (index === currentPage) dot.setAttribute("aria-current", "page");
        dot.addEventListener("click", () => goToPage(index));
        return dot;
    }));
}

function goToPage(pageIndex) {
    const nextPageIndex = Math.max(0, Math.min(pages.length - 1, pageIndex));
    if (nextPageIndex === currentPage) return;
    currentPage = nextPageIndex;
    playPageSound();
    renderPage();
}

function openBook() {
    craftScreen.classList.add("is-hidden");
    storyScreen.classList.remove("is-hidden");
    currentPage = 0;
    renderPage();
    previousButton.focus();
}

function closeBook() {
    storyScreen.classList.add("is-hidden");
    craftScreen.classList.remove("is-hidden");
    document.querySelector("#openBook").focus();
}

document.querySelector("#openBook").addEventListener("click", openBook);
previousButton.addEventListener("click", () => goToPage(currentPage - 1));
nextButton.addEventListener("click", () => goToPage(currentPage + 1));
document.querySelector("#closeBook").addEventListener("click", closeBook);
soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundToggle.querySelector("span").textContent = soundEnabled ? "ВКЛ" : "ВЫКЛ";
    soundToggle.setAttribute("aria-label", soundEnabled ? "Звук включён" : "Звук выключен");
    if (soundEnabled) playPageSound();
});

document.addEventListener("keydown", (event) => {
    if (storyScreen.classList.contains("is-hidden")) return;
    if (event.key === "ArrowRight") goToPage(currentPage + 1);
    if (event.key === "ArrowLeft") goToPage(currentPage - 1);
    if (event.key === "Escape") closeBook();
});

renderPage();
