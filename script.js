/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now = new Date();


    const hours =
        String(now.getHours())
            .padStart(2, "0");

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");


    const time =
        `${hours}:${minutes}`;


    document.getElementById(
        "lockClock"
    ).textContent = time;


    document.getElementById(
        "smallClock"
    ).textContent = time;


    const dateFormatter =
        new Intl.DateTimeFormat(
            "ru-RU",
            {
                weekday: "long",
                day: "numeric",
                month: "long"
            }
        );


    document.getElementById(
        "lockDate"
    ).textContent =
        dateFormatter.format(now);

}


updateClock();


setInterval(
    updateClock,
    1000
);



/* =========================================================
   LOCK SCREEN
========================================================= */

const lockScreen =
    document.getElementById(
        "lockScreen"
    );


const updateScreen =
    document.getElementById(
        "updateScreen"
    );


const notification =
    document.getElementById(
        "birthdayNotification"
    );


notification.addEventListener(
    "click",
    () => {

        lockScreen.style.transition =
            "opacity .45s ease";

        lockScreen.style.opacity =
            "0";


        setTimeout(
            () => {

                lockScreen.classList
                    .add(
                        "hidden"
                    );


                updateScreen.classList
                    .remove(
                        "hidden"
                    );


                startUpdate();

            },
            430
        );

    }
);



/* =========================================================
   UPDATE
========================================================= */

const updateProgress =
    document.getElementById(
        "updateProgress"
    );


const updatePercent =
    document.getElementById(
        "updatePercent"
    );


const updateLog =
    document.getElementById(
        "updateLog"
    );


const restartButton =
    document.getElementById(
        "restartButton"
    );


let updateStarted = false;


function addLog(
    text,
    className = ""
) {

    const line =
        document.createElement(
            "div"
        );


    line.className =
        "log-line "
        + className;


    line.textContent =
        text;


    updateLog.appendChild(
        line
    );

}


function startUpdate() {

    if (updateStarted) {
        return;
    }


    updateStarted = true;


    let progress = 0;


    const steps = [

        {
            at: 10,

            text:
                "Проверяем именинника… ✓",

            className:
                "log-ok"
        },


        {
            at: 30,

            text:
                "Загружаем праздничное настроение… ✓",

            className:
                "log-ok"
        },


        {
            at: 52,

            text:
                "Добавляем +1 к возрасту… ✓",

            className:
                "log-ok"
        },


        {
            at: 72,

            text:
                "Удаляем признаки старения…",

            className:
                ""
        },


        {
            at: 79,

            text:
                "Ошибка: функция недоступна.",

            className:
                "log-error"
        },


        {
            at: 93,

            text:
                "Оптимизируем уровень счастья… ✓",

            className:
                "log-ok"
        }

    ];


    const shown =
        new Set();


    const interval =
        setInterval(
            () => {

                progress +=
                    Math.floor(
                        Math.random() * 6
                    ) + 2;


                if (progress > 100) {
                    progress = 100;
                }


                updateProgress.style.width =
                    progress + "%";


                updatePercent.textContent =
                    progress + "%";


                steps.forEach(
                    (step, index) => {

                        if (
                            progress >= step.at
                            &&
                            !shown.has(index)
                        ) {

                            shown.add(
                                index
                            );


                            addLog(
                                step.text,
                                step.className
                            );

                        }

                    }
                );


                if (progress === 100) {

                    clearInterval(
                        interval
                    );


                    setTimeout(
                        () => {

                            addLog(
                                "Birthday Edition установлена.",
                                "log-ok"
                            );


                            restartButton
                                .classList
                                .remove(
                                    "hidden"
                                );

                        },
                        400
                    );

                }

            },
            130
        );

}



/* =========================================================
   RESTART
========================================================= */

restartButton.addEventListener(
    "click",
    () => {

        updateScreen.style.transition =
            "opacity .45s ease";


        updateScreen.style.opacity =
            "0";


        setTimeout(
            () => {

                updateScreen.classList
                    .add(
                        "hidden"
                    );


                const main =
                    document.getElementById(
                        "mainSite"
                    );


                main.style.display =
                    "block";


                document.body.classList
                    .remove(
                        "no-scroll"
                    );


                window.scrollTo(
                    0,
                    0
                );


                /*
                    Canvas нельзя правильно
                    рассчитать, пока main
                    display:none.

                    Поэтому создаём скретч
                    только сейчас.
                */

                initialiseScratch();

            },
            430
        );

    }
);



/* =========================================================
   УБЕГАЮЩАЯ КНОПКА
========================================================= */

const runawayButton =
    document.getElementById(
        "runawayButton"
    );


const trickZone =
    document.querySelector(
        ".trick-zone"
    );


const trickComment =
    document.getElementById(
        "trickComment"
    );


let runawayCount = 0;

let trickUnlocked = false;


runawayButton.addEventListener(
    "click",
    () => {

        /*
            После четырёх попыток
            кнопка становится обычной.
        */

        if (trickUnlocked) {

            document
                .getElementById(
                    "birthdayScroll"
                )
                .scrollIntoView({
                    behavior:
                        "smooth"
                });

            return;

        }


        runawayCount++;


        const comments = [
            "не так быстро 😌",
            "ещё попытка",
            "почти"
        ];


        if (runawayCount <= 3) {

            const zoneRect =
                trickZone
                    .getBoundingClientRect();


            const buttonRect =
                runawayButton
                    .getBoundingClientRect();


            const maxX =
                zoneRect.width
                - buttonRect.width
                - 24;


            const maxY =
                zoneRect.height
                - buttonRect.height
                - 24;


            const x =
                12
                + Math.random()
                * Math.max(
                    20,
                    maxX
                );


            const y =
                12
                + Math.random()
                * Math.max(
                    20,
                    maxY
                );


            runawayButton.style.left =
                x + "px";


            runawayButton.style.top =
                y + "px";


            runawayButton.style.transform =
                "none";


            trickComment.textContent =
                comments[
                    runawayCount - 1
                ];


            return;

        }


        trickUnlocked = true;


        runawayButton.style.left =
            "50%";


        runawayButton.style.top =
            "50%";


        runawayButton.style.transform =
            "translate(-50%, -50%)";


        runawayButton.textContent =
            "Ладно. Начинаем";


        trickComment.textContent =
            "заслужил";

    }
);



/* =========================================================
   SCROLL ANIMATIONS
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );

                    }

                }
            );

        },
        {
            threshold: .5
        }
    );


document
    .querySelectorAll(
        ".statement, .letter-line"
    )
    .forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );



/* =========================================================
   ПОДАРКИ
========================================================= */

document
    .querySelectorAll(
        ".gift-card"
    )
    .forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    card.classList
                        .toggle(
                            "open"
                        );

                }
            );

        }
    );



/* =========================================================
   SYSTEM ERROR
========================================================= */

const repairButton =
    document.getElementById(
        "repairButton"
    );


const repairLog =
    document.getElementById(
        "repairLog"
    );


const repairConclusion =
    document.getElementById(
        "repairConclusion"
    );


const errorWindow =
    document.getElementById(
        "errorWindow"
    );


let repaired = false;


repairButton.addEventListener(
    "click",
    () => {

        if (repaired) {
            return;
        }


        repaired = true;


        errorWindow.classList
            .add(
                "glitch"
            );


        repairButton.disabled =
            true;


        repairButton.textContent =
            "Исправляем…";


        const messages = [

            "Запуск диагностики…",

            "Сокращаем количество пожеланий…",

            "Операция отклонена.",

            "Причина: слишком жалко удалять.",

            "Статус: ERROR."

        ];


        let index = 0;


        const interval =
            setInterval(
                () => {

                    const line =
                        document
                            .createElement(
                                "div"
                            );


                    line.textContent =
                        messages[index];


                    line.className =
                        index ===
                        messages.length - 1

                            ? "terminal-red"

                            : "terminal-muted";


                    repairLog.appendChild(
                        line
                    );


                    index++;


                    if (
                        index >=
                        messages.length
                    ) {

                        clearInterval(
                            interval
                        );


                        repairButton.classList
                            .add(
                                "hidden"
                            );


                        setTimeout(
                            () => {

                                repairConclusion
                                    .classList
                                    .add(
                                        "show"
                                    );

                            },
                            400
                        );

                    }

                },
                500
            );

    }
);



/* =========================================================
   SCRATCH CARD
========================================================= */

const canvas =
    document.getElementById(
        "scratchCanvas"
    );


const ctx =
    canvas.getContext(
        "2d"
    );


let scratching = false;

let scratchInitialised = false;


function initialiseScratch() {

    const rect =
        canvas.getBoundingClientRect();


    /*
        Если canvas пока невидим,
        размеры будут 0.
    */

    if (
        rect.width === 0
        ||
        rect.height === 0
    ) {

        return;

    }


    const dpr =
        window.devicePixelRatio
        || 1;


    canvas.width =
        rect.width * dpr;


    canvas.height =
        rect.height * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    ctx.globalCompositeOperation =
        "source-over";


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            rect.width,
            rect.height
        );


    gradient.addColorStop(
        0,
        "#eee9f4"
    );


    gradient.addColorStop(
        1,
        "#cfc4dc"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    ctx.fillStyle =
        "#645a70";


    ctx.textAlign =
        "center";


    ctx.font =
        "700 15px sans-serif";


    ctx.fillText(
        "СТЕРЕТЬ ПАЛЬЦЕМ",
        rect.width / 2,
        rect.height / 2
    );


    ctx.font =
        "14px sans-serif";


    ctx.fillStyle =
        "#83778e";


    ctx.fillText(
        "↓",
        rect.width / 2,
        rect.height / 2 + 33
    );


    scratchInitialised =
        true;

}



function scratchAt(
    clientX,
    clientY
) {

    if (!scratchInitialised) {
        return;
    }


    const rect =
        canvas
            .getBoundingClientRect();


    const x =
        clientX
        - rect.left;


    const y =
        clientY
        - rect.top;


    ctx.globalCompositeOperation =
        "destination-out";


    ctx.beginPath();


    ctx.arc(
        x,
        y,
        31,
        0,
        Math.PI * 2
    );


    ctx.fill();

}



canvas.addEventListener(
    "pointerdown",
    event => {

        scratching =
            true;


        canvas.setPointerCapture(
            event.pointerId
        );


        scratchAt(
            event.clientX,
            event.clientY
        );

    }
);



canvas.addEventListener(
    "pointermove",
    event => {

        if (!scratching) {
            return;
        }


        scratchAt(
            event.clientX,
            event.clientY
        );

    }
);



canvas.addEventListener(
    "pointerup",
    () => {

        scratching =
            false;

    }
);



canvas.addEventListener(
    "pointercancel",
    () => {

        scratching =
            false;

    }
);



/* =========================================================
   ТОРТ
========================================================= */

const candles =
    [
        ...document.querySelectorAll(
            ".candle"
        )
    ];


const wishText =
    document.getElementById(
        "wishText"
    );


const wishButton =
    document.getElementById(
        "wishButton"
    );


const cakeContinue =
    document.getElementById(
        "cakeContinue"
    );



candles.forEach(
    candle => {

        candle.addEventListener(
            "click",
            () => {

                /*
                    Повторно свечу
                    не считаем.
                */

                if (
                    candle.classList
                        .contains(
                            "lit"
                        )
                ) {

                    return;

                }


                candle.classList.add(
                    "lit"
                );


                if (
                    navigator.vibrate
                ) {

                    navigator.vibrate(
                        25
                    );

                }


                const litCount =
                    document
                        .querySelectorAll(
                            ".candle.lit"
                        )
                        .length;


                if (
                    litCount ===
                    candles.length
                ) {

                    setTimeout(
                        () => {

                            wishText.textContent =
                                "Теперь загадывай желание…";

                        },
                        400
                    );


                    setTimeout(
                        () => {

                            wishText.textContent =
                                "Загадал?";


                            wishButton.classList
                                .remove(
                                    "hidden"
                                );

                        },
                        2800
                    );

                }

            }
        );

    }
);



wishButton.addEventListener(
    "click",
    () => {

        candles.forEach(
            candle => {

                candle.classList
                    .remove(
                        "lit"
                    );

            }
        );


        wishButton.classList
            .add(
                "hidden"
            );


        wishText.textContent =
            "Пусть сбудется ❤️";


        if (
            navigator.vibrate
        ) {

            navigator.vibrate(
                [
                    40,
                    40,
                    80
                ]
            );

        }


        setTimeout(
            () => {

                cakeContinue.classList
                    .remove(
                        "hidden"
                    );

            },
            700
        );

    }
);



cakeContinue.addEventListener(
    "click",
    () => {

        document
            .getElementById(
                "fakeEnd"
            )
            .scrollIntoView({
                behavior:
                    "smooth"
            });

    }
);



/* =========================================================
   FAKE END
========================================================= */

const fakeCloseButton =
    document.getElementById(
        "fakeCloseButton"
    );


const blackout =
    document.getElementById(
        "blackout"
    );


const blackoutText =
    document.getElementById(
        "blackoutText"
    );



fakeCloseButton.addEventListener(
    "click",
    () => {

        blackout.style.display =
            "flex";


        document.body.classList
            .add(
                "no-scroll"
            );


        setTimeout(
            () => {

                blackoutText.style.opacity =
                    "1";

            },
            900
        );


        setTimeout(
            () => {

                blackoutText.style.opacity =
                    "0";

            },
            3100
        );


        setTimeout(
            () => {

                blackout.style.display =
                    "none";


                document.body.classList
                    .remove(
                        "no-scroll"
                    );


                document
                    .getElementById(
                        "realMessage"
                    )
                    .scrollIntoView({
                        behavior:
                            "auto"
                    });

            },
            3900
        );

    }
);



/* =========================================================
   FINAL HOLD
========================================================= */

const holdButton =
    document.getElementById(
        "holdButton"
    );


const finalReveal =
    document.getElementById(
        "finalReveal"
    );


const HOLD_DURATION =
    2600;


let holdStart =
    null;


let holdFrame =
    null;


let completed =
    false;



function startHold(
    event
) {

    if (completed) {
        return;
    }


    event.preventDefault();


    holdStart =
        performance.now();


    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            25
        );

    }


    updateHold();

}



function updateHold() {

    if (
        holdStart === null
    ) {

        return;

    }


    const elapsed =
        performance.now()
        - holdStart;


    const progress =
        Math.min(
            elapsed
            / HOLD_DURATION,
            1
        );


    const degrees =
        progress
        * 360;


    holdButton.style.setProperty(
        "--progress",
        degrees + "deg"
    );


    if (
        progress >= 1
    ) {

        completeHold();

        return;

    }


    holdFrame =
        requestAnimationFrame(
            updateHold
        );

}



function cancelHold() {

    if (
        completed
        ||
        holdStart === null
    ) {

        return;

    }


    cancelAnimationFrame(
        holdFrame
    );


    holdStart =
        null;


    holdButton.style.setProperty(
        "--progress",
        "0deg"
    );

}



function completeHold() {

    completed =
        true;


    holdStart =
        null;


    cancelAnimationFrame(
        holdFrame
    );


    holdButton.style.setProperty(
        "--progress",
        "360deg"
    );


    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            [
                50,
                60,
                100,
                60,
                150
            ]
        );

    }


    setTimeout(
        () => {

            holdButton.classList
                .add(
                    "hidden"
                );


            finalReveal.classList
                .remove(
                    "hidden"
                );


            createConfetti();

        },
        250
    );

}



holdButton.addEventListener(
    "pointerdown",
    startHold
);


holdButton.addEventListener(
    "pointerup",
    cancelHold
);


holdButton.addEventListener(
    "pointerleave",
    cancelHold
);


holdButton.addEventListener(
    "pointercancel",
    cancelHold
);



/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    const colors = [

        "#5d4a76",

        "#d9ccff",

        "#ffd5df",

        "#d6e8d2",

        "#ffe39a",

        "#ffffff"

    ];


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.style.left =
            Math.random()
            * 100
            + "vw";


        piece.style.background =
            colors[
                Math.floor(
                    Math.random()
                    * colors.length
                )
            ];


        piece.style.animationDuration =
            (
                2.3
                +
                Math.random()
                * 2.8
            )
            + "s";


        piece.style.animationDelay =
            Math.random()
            * .4
            + "s";


        document.body.appendChild(
            piece
        );


        setTimeout(
            () => {

                piece.remove();

            },
            6000
        );

    }

}