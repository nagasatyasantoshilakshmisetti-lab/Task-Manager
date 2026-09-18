/* =========================================================
   MY MOON GARDEN
   COMPLETE SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. DAILY ROUTINE
   ========================================================= */

const routine = [
    {
        id: "wake",
        time: "05:00",
        title: "Wake Up & Fresh Start",
        description: "Start the morning peacefully."
    },
    {
        id: "study",
        time: "06:00",
        title: "Study & Skill Building",
        description: "Learn something useful and build your skills."
    },
    {
        id: "breakfast",
        time: "07:30",
        title: "Get Ready & Breakfast",
        description: "Get ready for the day."
    },
    {
        id: "college",
        time: "08:30",
        title: "College / Main Work",
        description: "Focus on your main responsibilities."
    },
    {
        id: "lunch",
        time: "13:00",
        title: "Lunch & Refresh",
        description: "Take a peaceful break."
    },
    {
        id: "project",
        time: "15:00",
        title: "Study / Project Time",
        description: "Work on studies, coding or projects."
    },
    {
        id: "garden",
        time: "17:00",
        title: "Gardening + Walk + Green Tea",
        description: "Spend time with nature and refresh."
    },
    {
        id: "meditation",
        time: "18:00",
        title: "Meditation & Reconnect",
        description: "Slow down and reconnect with yourself."
    },
    {
        id: "family",
        time: "19:00",
        title: "Family Time",
        description: "Enjoy meaningful time with family."
    },
    {
        id: "journal",
        time: "20:00",
        title: "Journaling + Books",
        description: "Write your thoughts and read peacefully."
    },
    {
        id: "reflection",
        time: "21:00",
        title: "Night Reflection",
        description: "Reflect on your day."
    }
];


/* =========================================================
   2. HABITS
   ========================================================= */

const habits = [
    {
        id: "water",
        title: "Water",
        icon: "💧"
    },
    {
        id: "study",
        title: "Study",
        icon: "📚"
    },
    {
        id: "meditation",
        title: "Meditation",
        icon: "🧘"
    },
    {
        id: "reading",
        title: "Reading",
        icon: "📖"
    },
    {
        id: "nature",
        title: "Nature",
        icon: "🌿"
    },
    {
        id: "family",
        title: "Family",
        icon: "💗"
    }
];


/* =========================================================
   3. DATE HELPERS
   ========================================================= */

function getDateKey(date = new Date()) {

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const todayKey = getDateKey();


/* =========================================================
   4. LOAD SAVED DATA
   ========================================================= */

let completedTasks =
    JSON.parse(
        localStorage.getItem("completedTasks_" + todayKey)
        || "[]"
    );

let completedHabits =
    JSON.parse(
        localStorage.getItem("completedHabits_" + todayKey)
        || "[]"
    );


/* =========================================================
   5. SAVE DATA
   ========================================================= */

function saveTasks() {

    localStorage.setItem(
        "completedTasks_" + todayKey,
        JSON.stringify(completedTasks)
    );
}


function saveHabits() {

    localStorage.setItem(
        "completedHabits_" + todayKey,
        JSON.stringify(completedHabits)
    );
}


/* =========================================================
   6. CLOCK
   ========================================================= */

function updateClock() {

    const now = new Date();

    const timeElement =
        document.getElementById("currentTime");

    const dateElement =
        document.getElementById("currentDate");

    if (timeElement) {

        timeElement.textContent =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );
    }

    if (dateElement) {

        dateElement.textContent =
            now.toLocaleDateString(
                [],
                {
                    weekday: "long",
                    month: "short",
                    day: "numeric"
                }
            );
    }

    const greeting =
        document.getElementById("greeting");

    if (greeting) {

        const hour = now.getHours();

        if (hour < 12) {

            greeting.textContent =
                "Good Morning 🌸";

        } else if (hour < 17) {

            greeting.textContent =
                "Good Afternoon ☀️";

        } else if (hour < 21) {

            greeting.textContent =
                "Good Evening 🌷";

        } else {

            greeting.textContent =
                "Good Night 🌙";
        }
    }
}


/* =========================================================
   7. FORMAT TIME
   ========================================================= */

function formatTime(time) {

    const [hour, minute] =
        time.split(":").map(Number);

    const date = new Date();

    date.setHours(hour, minute, 0, 0);

    return date.toLocaleTimeString(
        [],
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   8. GET CURRENT TASK
   ========================================================= */

function getCurrentTask() {

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    let currentTask = null;

    routine.forEach(task => {

        const [h, m] =
            task.time.split(":").map(Number);

        const taskMinutes =
            h * 60 + m;

        if (taskMinutes <= currentMinutes) {

            currentTask = task;
        }
    });

    return currentTask;
}


/* =========================================================
   9. GET NEXT UNCOMPLETED TASK
   ========================================================= */

function getNextTask() {

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    for (const task of routine) {

        const [h, m] =
            task.time.split(":").map(Number);

        const taskMinutes =
            h * 60 + m;

        if (
            taskMinutes >= currentMinutes &&
            !completedTasks.includes(task.id)
        ) {

            return task;
        }
    }

    return null;
}


/* =========================================================
   10. RENDER ROUTINE
   ========================================================= */

function renderRoutine() {

    const container =
        document.getElementById("routineList");

    if (!container) return;

    container.innerHTML = "";

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    routine.forEach(task => {

        const [h, m] =
            task.time.split(":").map(Number);

        const taskMinutes =
            h * 60 + m;

        const completed =
            completedTasks.includes(task.id);

        const current =
            taskMinutes === currentMinutes;

        const item =
            document.createElement("div");

        item.className =
            "routine-item" +
            (completed ? " completed" : "") +
            (current ? " current" : "");

        item.innerHTML = `
            <div class="routine-time">
                ${formatTime(task.time)}
            </div>

            <div class="routine-info">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>

            <button
                class="routine-check"
                onclick="toggleTask('${task.id}')"
            >
                ${completed ? "✓" : ""}
            </button>
        `;

        container.appendChild(item);
    });
}


/* =========================================================
   11. TOGGLE ROUTINE TASK
   ========================================================= */

function toggleTask(id) {

    const index =
        completedTasks.indexOf(id);

    if (index === -1) {

        completedTasks.push(id);

        showToast("✓ Task completed! 🌸");

    } else {

        completedTasks.splice(index, 1);

        showToast("Task reopened 🌷");
    }

    saveTasks();

    renderRoutine();
    updateStats();
    updateActionCenter();
    updateMyDayTimeline();
    updateOverallProgress();
}


/* =========================================================
   12. UPDATE NEXT TASK CARD
   ========================================================= */

function updateNextTaskCard() {

    const title =
        document.getElementById("nextTaskTitle");

    const description =
        document.getElementById("nextTaskDescription");

    const countdown =
        document.getElementById("countdown");

    if (!title) return;

    const task = getNextTask();

    if (!task) {

        title.textContent =
            "Today's routine is complete 🌙";

        if (description) {

            description.textContent =
                "Slow down and enjoy your peaceful evening.";
        }

        if (countdown) {

            countdown.textContent =
                "Beautiful work today ✨";
        }

        return;
    }

    title.textContent =
        task.title;

    if (description) {

        description.textContent =
            task.description;
    }

    updateCountdown(task);
}


/* =========================================================
   13. COUNTDOWN
   ========================================================= */

function updateCountdown(task) {

    const countdown =
        document.getElementById("countdown");

    if (!countdown || !task) return;

    const now = new Date();

    const [h, m] =
        task.time.split(":").map(Number);

    const target =
        new Date();

    target.setHours(h, m, 0, 0);

    let difference =
        target.getTime() -
        now.getTime();

    if (difference < 0) {

        difference = 0;
    }

    const totalSeconds =
        Math.floor(difference / 1000);

    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    if (totalSeconds === 0) {

        countdown.textContent =
            "It's time! 🌸";

    } else if (hours > 0) {

        countdown.textContent =
            `Starts in ${hours}h ${minutes}m`;

    } else {

        countdown.textContent =
            `Starts in ${minutes}m ${seconds}s`;
    }
}


/* =========================================================
   14. STATS
   ========================================================= */

function updateStats() {

    const total =
        routine.length;

    const completed =
        completedTasks.length;

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    const progress =
        document.getElementById("todayProgress");

    if (progress) {

        progress.textContent =
            percentage + "%";
    }

    const progressBar =
        document.getElementById(
            "todayProgressBar"
        );

    if (progressBar) {

        progressBar.style.width =
            percentage + "%";
    }

    const completedNumber =
        document.getElementById(
            "completedTasks"
        );

    if (completedNumber) {

        completedNumber.textContent =
            completed;
    }

    const totalNumber =
        document.getElementById(
            "totalTasks"
        );

    if (totalNumber) {

        totalNumber.textContent =
            total;
    }
}


/* =========================================================
   15. HABITS
   ========================================================= */

function renderHabits() {

    const container =
        document.getElementById("habitGrid");

    if (!container) return;

    container.innerHTML = "";

    habits.forEach(habit => {

        const done =
            completedHabits.includes(habit.id);

        const card =
            document.createElement("div");

        card.className =
            "habit-card" +
            (done ? " done" : "");

        card.onclick =
            () => toggleHabit(habit.id);

        card.innerHTML = `
            <div class="habit-icon">
                ${habit.icon}
            </div>

            <h3>
                ${habit.title}
            </h3>

            <div class="habit-count">
                ${done ? "Completed ✓" : "Tap to complete"}
            </div>

            <div class="habit-progress">
                <div
                    class="habit-progress-fill"
                    style="width:${done ? "100%" : "0%"}"
                ></div>
            </div>
        `;

        container.appendChild(card);
    });
}


/* =========================================================
   16. TOGGLE HABIT
   ========================================================= */

function toggleHabit(id) {

    const index =
        completedHabits.indexOf(id);

    if (index === -1) {

        completedHabits.push(id);

        showToast("🌿 Habit completed!");

    } else {

        completedHabits.splice(index, 1);

        showToast("Habit reopened.");
    }

    saveHabits();

    renderHabits();
    updateOverallProgress();
}


/* =========================================================
   17. ACTION CENTER
   ========================================================= */

function updateActionCenter() {

    const status =
        document.getElementById("actionStatus");

    const title =
        document.getElementById("actionTitle");

    const description =
        document.getElementById(
            "actionDescription"
        );

    const time =
        document.getElementById("actionTime");

    const countdown =
        document.getElementById(
            "actionCountdown"
        );

    const startBtn =
        document.getElementById(
            "actionStartBtn"
        );

    const completeBtn =
        document.getElementById(
            "actionCompleteBtn"
        );

    if (!status || !title) return;

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    let currentTask = null;
    let nextTask = null;

    for (const task of routine) {

        const [h, m] =
            task.time.split(":").map(Number);

        const taskMinutes =
            h * 60 + m;

        if (taskMinutes <= currentMinutes) {

            currentTask = task;
        }

        if (
            taskMinutes > currentMinutes &&
            !completedTasks.includes(task.id)
        ) {

            nextTask = task;

            break;
        }
    }


    /* DAY COMPLETE */

    if (!currentTask && !nextTask) {

        status.textContent =
            "🌙 DAY COMPLETE";

        title.textContent =
            "Enjoy your peaceful evening";

        description.textContent =
            "Your planned routine has finished. Take some time to slow down ✨";

        time.textContent =
            "✓";

        countdown.textContent =
            "Beautiful work today";

        if (startBtn)
            startBtn.style.display = "none";

        if (completeBtn)
            completeBtn.style.display = "none";

        return;
    }


    /* NEXT TASK */

    if (nextTask) {

        const [nh, nm] =
            nextTask.time.split(":").map(Number);

        const nextMinutes =
            nh * 60 + nm;

        const difference =
            nextMinutes - currentMinutes;

        status.textContent =
            difference <= 15
                ? "🟡 STARTING SOON"
                : "🟢 UP NEXT";

        title.textContent =
            nextTask.title;

        description.textContent =
            difference <= 15
                ? "Get ready. Your next task starts soon 💫"
                : "Finish what you're doing and prepare for this 🌷";

        time.textContent =
            formatTime(nextTask.time);

        countdown.textContent =
            `Starts in ${difference} min`;

        if (startBtn)
            startBtn.style.display = "inline-block";

        if (completeBtn)
            completeBtn.style.display = "inline-block";

        return;
    }


    /* CURRENT TASK */

    if (currentTask) {

        const completed =
            completedTasks.includes(
                currentTask.id
            );

        const [ch, cm] =
            currentTask.time
                .split(":")
                .map(Number);

        const taskMinutes =
            ch * 60 + cm;

        if (completed) {

            status.textContent =
                "✓ COMPLETED";

            title.textContent =
                currentTask.title;

            description.textContent =
                "Beautiful work! You completed this task ✨";

            time.textContent =
                formatTime(currentTask.time);

            countdown.textContent =
                "Done for today";

            if (startBtn)
                startBtn.style.display = "none";

            if (completeBtn)
                completeBtn.style.display = "none";

        } else {

            status.textContent =
                taskMinutes === currentMinutes
                    ? "🔵 START NOW"
                    : "🌷 CURRENT FOCUS";

            title.textContent =
                currentTask.title;

            description.textContent =
                currentTask.description;

            time.textContent =
                formatTime(currentTask.time);

            countdown.textContent =
                taskMinutes === currentMinutes
                    ? "It's time!"
                    : "Your current focus";

            if (startBtn)
                startBtn.style.display =
                    "inline-block";

            if (completeBtn)
                completeBtn.style.display =
                    "inline-block";
        }
    }
}


/* =========================================================
   18. ACTION CENTER BUTTONS
   ========================================================= */

function startCurrentTask() {

    const task =
        getNextTask() ||
        getCurrentTask();

    if (!task) {

        showToast(
            "🌙 No more tasks for today."
        );

        return;
    }

    openFocusModeForTask(task);
}


function completeCurrentTask() {

    const task =
        getNextTask() ||
        getCurrentTask();

    if (!task) {

        showToast(
            "🌙 No task to complete."
        );

        return;
    }

    if (!completedTasks.includes(task.id)) {

        completedTasks.push(task.id);

        saveTasks();

        renderRoutine();
        updateStats();
        updateActionCenter();
        updateMyDayTimeline();
        updateOverallProgress();

        showToast(
            "✓ " + task.title + " completed!"
        );
    }
}


/* =========================================================
   19. MY DAY TIMELINE
   ========================================================= */

function updateMyDayTimeline() {

    const container =
        document.getElementById(
            "myDayTimeline"
        );

    if (!container) return;

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    container.innerHTML = "";

    routine.forEach(task => {

        const [h, m] =
            task.time.split(":").map(Number);

        const taskMinutes =
            h * 60 + m;

        let state = "upcoming";

        let icon = "○";

        if (
            completedTasks.includes(
                task.id
            )
        ) {

            state = "completed";

            icon = "✓";

        } else if (
            taskMinutes <= currentMinutes
        ) {

            state = "current";

            icon = "●";
        }

        const item =
            document.createElement("div");

        item.className =
            "day-item " + state;

        item.innerHTML = `
            <div class="day-line">
                <div class="day-icon">
                    ${icon}
                </div>
            </div>

            <div class="day-info">

                <span class="day-time">
                    ${formatTime(task.time)}
                </span>

                <h3>
                    ${task.title}
                </h3>

                <small>
                    ${getTaskStateText(state)}
                </small>

            </div>
        `;

        container.appendChild(item);
    });
}


function getTaskStateText(state) {

    if (state === "completed")
        return "Completed ✓";

    if (state === "current")
        return "Your current focus";

    return "Coming up";
}


/* =========================================================
   20. DAILY GOALS
   ========================================================= */

function loadGoals() {

    for (let i = 1; i <= 3; i++) {

        const input =
            document.getElementById(
                "goal" + i
            );

        const priority =
            document.getElementById(
                "priority" + i
            );

        const note =
            document.getElementById(
                "note" + i
            );


        /* Goal */

        if (input) {

            input.value =
                localStorage.getItem(
                    "dailyGoal" + i
                ) || "";

            input.addEventListener(
                "input",
                () => {

                    localStorage.setItem(
                        "dailyGoal" + i,
                        input.value
                    );
                }
            );
        }


        /* Priority */

        if (priority) {

            priority.value =
                localStorage.getItem(
                    "goalPriority" + i
                ) || "Medium";

            priority.addEventListener(
                "change",
                () => {

                    localStorage.setItem(
                        "goalPriority" + i,
                        priority.value
                    );
                }
            );
        }


        /* Note */

        if (note) {

            note.value =
                localStorage.getItem(
                    "goalNote" + i
                ) || "";

            note.addEventListener(
                "input",
                () => {

                    localStorage.setItem(
                        "goalNote" + i,
                        note.value
                    );
                }
            );
        }
    }

    updateGoalProgress();
}


/* =========================================================
   21. COMPLETE GOAL
   ========================================================= */

function completeGoal(number) {

    const input =
        document.getElementById(
            "goal" + number
        );

    if (
        !input ||
        !input.value.trim()
    ) {

        showToast(
            "🌸 Write your goal first."
        );

        return;
    }

    const key =
        "goalCompleted_" +
        todayKey +
        "_" +
        number;

    const completed =
        localStorage.getItem(key)
        === "true";

    localStorage.setItem(
        key,
        completed ? "false" : "true"
    );

    updateGoalProgress();
    updateOverallProgress();

    showToast(
        completed
            ? "Goal reopened 🌷"
            : "✓ Goal completed!"
    );
}


/* =========================================================
   22. GOAL PROGRESS
   ========================================================= */

function updateGoalProgress() {

    let completed = 0;

    for (let i = 1; i <= 3; i++) {

        const input =
            document.getElementById(
                "goal" + i
            );

        const key =
            "goalCompleted_" +
            todayKey +
            "_" +
            i;

        const done =
            localStorage.getItem(key)
            === "true";

        if (done)
            completed++;

        if (input)
            input.classList.toggle(
                "goal-done",
                done
            );
    }

    const progress =
        document.getElementById(
            "goalProgress"
        );

    if (progress) {

        progress.textContent =
            completed === 3
                ? "🎉 All goals completed!"
                : `${completed} / 3 completed`;
    }
}


/* =========================================================
   23. GOAL FOCUS
   ========================================================= */

function startGoalFocus(number) {

    const input =
        document.getElementById(
            "goal" + number
        );

    if (
        !input ||
        !input.value.trim()
    ) {

        showToast(
            "🌸 Write the goal first!"
        );

        return;
    }

    const focusBox =
        document.getElementById(
            "focusMode"
        );

    const taskName =
        document.getElementById(
            "focusTaskName"
        );

    if (!focusBox || !taskName) {

        showToast(
            "⚠️ Focus Mode is unavailable."
        );

        return;
    }

    openFocusMode(
        input.value
    );

    showToast(
        "🎯 Goal focus started!"
    );
}


/* =========================================================
   24. FOCUS MODE
   ========================================================= */

let focusSeconds = 25 * 60;

let focusInterval = null;

let focusRunning = false;


function openFocusMode(taskName = "Focus Time") {

    const focusBox =
        document.getElementById(
            "focusMode"
        );

    const title =
        document.getElementById(
            "focusTaskName"
        );

    if (!focusBox) return;

    if (title)
        title.textContent =
            taskName;

    focusSeconds =
        25 * 60;

    clearInterval(
        focusInterval
    );

    focusRunning = false;

    updateFocusTimer();

    focusBox.classList.add("show");

    startFocusTimer();
}


function openFocusModeForTask(task) {

    if (!task) return;

    openFocusMode(
        task.title
    );

    showToast(
        "🎯 Focus started: " +
        task.title
    );
}


function startFocusTimer() {

    if (focusRunning)
        return;

    focusRunning = true;

    const pauseButton =
        document.getElementById(
            "pauseFocus"
        );

    if (pauseButton)
        pauseButton.textContent =
            "⏸ Pause";

    focusInterval =
        setInterval(() => {

            if (focusSeconds <= 0) {

                clearInterval(
                    focusInterval
                );

                focusRunning = false;

                document.getElementById(
                    "focusMessage"
                ).textContent =
                    "🎉 Focus session complete! Take a peaceful break.";

                showToast(
                    "🎉 Focus session complete!"
                );

                return;
            }

            focusSeconds--;

            updateFocusTimer();

        }, 1000);
}


function updateFocusTimer() {

    const timer =
        document.getElementById(
            "focusTimer"
        );

    if (!timer) return;

    const minutes =
        Math.floor(
            focusSeconds / 60
        );

    const seconds =
        focusSeconds % 60;

    timer.textContent =
        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");
}


function pauseFocus() {

    const button =
        document.getElementById(
            "pauseFocus"
        );

    if (focusRunning) {

        clearInterval(
            focusInterval
        );

        focusRunning = false;

        if (button)
            button.textContent =
                "▶ Resume";

    } else {

        startFocusTimer();

        if (button)
            button.textContent =
                "⏸ Pause";
    }
}


function resetFocus() {

    clearInterval(
        focusInterval
    );

    focusSeconds =
        25 * 60;

    focusRunning = false;

    updateFocusTimer();

    const button =
        document.getElementById(
            "pauseFocus"
        );

    if (button)
        button.textContent =
            "⏸ Pause";

    const message =
        document.getElementById(
            "focusMessage"
        );

    if (message) {

        message.textContent =
            "One task. One moment. You can do this ✨";
    }
}


function finishFocus() {

    clearInterval(
        focusInterval
    );

    focusRunning = false;

    const message =
        document.getElementById(
            "focusMessage"
        );

    if (message) {

        message.textContent =
            "✓ Wonderful! You finished your focus session.";
    }

    showToast(
        "🌸 Focus session completed!"
    );
}


/* =========================================================
   25. EVENING SANCTUARY
   ========================================================= */

function toggleEvening(number) {

    const key =
        "eveningCompleted_" +
        todayKey +
        "_" +
        number;

    const completed =
        localStorage.getItem(key)
        === "true";

    localStorage.setItem(
        key,
        completed ? "false" : "true"
    );

    updateEveningSanctuary();
    updateOverallProgress();

    if (!completed) {

        showToast(
            "🌸 Evening activity completed!"
        );
    }
}


function updateEveningSanctuary() {

    let completedCount = 0;

    for (let i = 1; i <= 5; i++) {

        const key =
            "eveningCompleted_" +
            todayKey +
            "_" +
            i;

        const done =
            localStorage.getItem(key)
            === "true";

        const check =
            document.getElementById(
                "eveningCheck" + i
            );

        const card =
            check?.closest(
                ".evening-card"
            );

        if (done) {

            completedCount++;

            if (check)
                check.textContent = "✓";

            if (card)
                card.classList.add(
                    "evening-done"
                );

        } else {

            if (check)
                check.textContent = "○";

            if (card)
                card.classList.remove(
                    "evening-done"
                );
        }
    }

    const progress =
        document.getElementById(
            "eveningProgress"
        );

    if (progress) {

        progress.textContent =
            completedCount === 5
                ? "🌙 Evening complete — beautiful work!"
                : `${completedCount} / 5 evening activities completed`;
    }
}


/* =========================================================
   26. OVERALL DAILY PROGRESS
   ========================================================= */

function updateOverallProgress() {

    let completed = 0;

    let total = 0;


    /* Routine */

    routine.forEach(task => {

        total++;

        if (
            completedTasks.includes(
                task.id
            )
        ) {

            completed++;
        }
    });


    /* Goals */

    for (let i = 1; i <= 3; i++) {

        total++;

        const key =
            "goalCompleted_" +
            todayKey +
            "_" +
            i;

        if (
            localStorage.getItem(key)
            === "true"
        ) {

            completed++;
        }
    }


    /* Evening */

    for (let i = 1; i <= 5; i++) {

        total++;

        const key =
            "eveningCompleted_" +
            todayKey +
            "_" +
            i;

        if (
            localStorage.getItem(key)
            === "true"
        ) {

            completed++;
        }
    }


    /* Habits */

    habits.forEach(habit => {

        total++;

        if (
            completedHabits.includes(
                habit.id
            )
        ) {

            completed++;
        }
    });


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    const progress =
        document.getElementById(
            "overallProgress"
        );

    const message =
        document.getElementById(
            "progressMessage"
        );

    const details =
        document.getElementById(
            "progressDetails"
        );


    if (progress) {

        progress.textContent =
            percentage + "%";
    }

    if (details) {

        details.textContent =
            `${completed} of ${total} activities completed`;
    }


    if (message) {

        if (percentage === 0) {

            message.textContent =
                "Let's begin your day 🌸";

        } else if (percentage < 30) {

            message.textContent =
                "A beautiful start ✨";

        } else if (percentage < 60) {

            message.textContent =
                "You're making progress 🌷";

        } else if (percentage < 90) {

            message.textContent =
                "You're doing amazing! 💗";

        } else {

            message.textContent =
                "You almost completed your day! 🌟";
        }
    }


    const circle =
        document.querySelector(
            ".daily-progress .progress-circle"
        );

    if (circle) {

        circle.style.setProperty(
            "--progress",
            percentage + "%"
        );
    }
}


/* =========================================================
   27. TOMORROW PLANNER
   ========================================================= */

function tomorrowDateKey() {

    const tomorrow =
        new Date();

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    return getDateKey(
        tomorrow
    );
}


function loadTomorrowPlanner() {

    const key =
        tomorrowDateKey();

    const goal =
        document.getElementById(
            "tomorrowGoal"
        );

    const notes =
        document.getElementById(
            "tomorrowNotes"
        );


    if (goal) {

        goal.value =
            localStorage.getItem(
                "tomorrowGoal_" + key
            ) || "";

        goal.addEventListener(
            "input",
            () => {

                localStorage.setItem(
                    "tomorrowGoal_" + key,
                    goal.value
                );

                showSavedTomorrow();
            }
        );
    }


    if (notes) {

        notes.value =
            localStorage.getItem(
                "tomorrowNotes_" + key
            ) || "";

        notes.addEventListener(
            "input",
            () => {

                localStorage.setItem(
                    "tomorrowNotes_" + key,
                    notes.value
                );

                showSavedTomorrow();
            }
        );
    }


    const dateElement =
        document.getElementById(
            "tomorrowDate"
        );

    if (dateElement) {

        const tomorrow =
            new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        dateElement.textContent =
            tomorrow.toLocaleDateString(
                [],
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            );
    }
}


function showSavedTomorrow() {

    const status =
        document.getElementById(
            "tomorrowSaved"
        );

    if (!status) return;

    status.textContent =
        "✓ Saved automatically";

    setTimeout(() => {

        status.textContent = "";

    }, 1500);
}


/* =========================================================
   28. JOURNAL
   ========================================================= */

function loadJournal() {

    const journal =
        document.getElementById(
            "journal"
        );

    if (!journal) return;

    const key =
        "journal_" + todayKey;

    journal.value =
        localStorage.getItem(key)
        || "";

    journal.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                key,
                journal.value
            );

            const status =
                document.getElementById(
                    "journalStatus"
                );

            if (status) {

                status.textContent =
                    "✓ Saved";
            }
        }
    );
}


function clearJournal() {

    const journal =
        document.getElementById(
            "journal"
        );

    if (!journal) return;

    journal.value = "";

    localStorage.removeItem(
        "journal_" + todayKey
    );

    const status =
        document.getElementById(
            "journalStatus"
        );

    if (status) {

        status.textContent =
            "Journal cleared";
    }

    showToast(
        "Journal cleared 🌙"
    );
}


/* =========================================================
   29. TOAST
   ========================================================= */

let toastTimer = null;


function showToast(message) {

    let toast =
        document.getElementById(
            "toast"
        );

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id = "toast";

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );
    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);
}


/* =========================================================
   30. NAVIGATION
   ========================================================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                navItems.forEach(
                    nav =>
                        nav.classList.remove(
                            "active"
                        )
                );

                item.classList.add(
                    "active"
                );

                const target =
                    item.dataset.target;

                if (target) {

                    const section =
                        document.getElementById(
                            target
                        );

                    if (section) {

                        section.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            }
        );
    });
}


/* =========================================================
   31. SMART REMINDERS
   ========================================================= */

let lastReminder = "";


function checkSmartReminder() {

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    routine.forEach(task => {

        const [h, m] =
            task.time.split(":").map(Number);

        const taskMinutes =
            h * 60 + m;

        const difference =
            taskMinutes -
            currentMinutes;

        const reminderKey =
            todayKey +
            "_" +
            task.id +
            "_" +
            difference;

        if (
            difference === 15 &&
            !completedTasks.includes(
                task.id
            ) &&
            lastReminder !== reminderKey
        ) {

            lastReminder =
                reminderKey;

            showToast(
                "💫 " +
                task.title +
                " starts in 15 minutes"
            );
        }

        if (
            difference === 0 &&
            !completedTasks.includes(
                task.id
            ) &&
            lastReminder !== reminderKey
        ) {

            lastReminder =
                reminderKey;

            showToast(
                "🌸 It's time for " +
                task.title
            );
        }
    });
}


/* =========================================================
   32. KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            focusRunning
        ) {

            pauseFocus();
        }
    }
);


/* =========================================================
   33. UPDATE EVERYTHING
   ========================================================= */

function updateEverything() {

    updateClock();

    const task =
        getNextTask();

    if (task) {

        updateCountdown(task);
    }

    updateNextTaskCard();

    updateActionCenter();

    updateMyDayTimeline();

    updateOverallProgress();

    updateStats();

    checkSmartReminder();
}


/* =========================================================
   34. START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderRoutine();

        renderHabits();

        loadGoals();

        loadTomorrowPlanner();

        loadJournal();

        updateEveningSanctuary();

        updateMyDayTimeline();

        updateOverallProgress();

        updateStats();

        updateActionCenter();

        updateClock();

        setupNavigation();

        updateNextTaskCard();

        showToast(
            "🌙 Welcome to My Moon Garden"
        );
    }
);


/* =========================================================
   35. BUTTON EVENTS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.id ===
            "actionStartBtn"
        ) {

            startCurrentTask();
        }


        if (
            event.target.id ===
            "actionCompleteBtn"
        ) {

            completeCurrentTask();
        }


        if (
            event.target.id ===
            "pauseFocus"
        ) {

            pauseFocus();
        }


        if (
            event.target.id ===
            "resetFocus"
        ) {

            resetFocus();
        }


        if (
            event.target.id ===
            "finishFocus"
        ) {

            finishFocus();
        }


        if (
            event.target.id ===
            "clearJournal"
        ) {

            clearJournal();
        }
    }
);


/* =========================================================
   36. LIVE UPDATE
   ========================================================= */

setInterval(
    updateEverything,
    1000
);