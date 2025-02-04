document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todoList");
    const addTodoForm = document.getElementById("addTodoForm");
    const newTodoInput = document.getElementById("newTodo");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const todos = [
        { task: "Complete Math Assignment", topics: ["Algebra", "Geometry", "Calculus"], completed: false },
        { task: "Study for History Exam", topics: ["World War II", "Industrial Revolution", "French Revolution"], completed: false },
        { task: "Finish Science Project", topics: ["Biology", "Chemistry", "Physics"], completed: false },
    ];

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${todo.task}</span>
                <button onclick="toggleTodo(${index})">${todo.completed ? "Undo" : "Complete"}</button>
                <button onclick="toggleTopics(${index})">Show Topics</button>
                <ul class="topics" style="display: none;">
                    ${todo.topics.map((topic) => `<li>${topic}</li>`).join("")}
                </ul>
            `;
            todoList.appendChild(li);
        });
        updateProgress();
    }

    function updateProgress() {
        const completedTodos = todos.filter((todo) => todo.completed).length;
        const progressPercentage = (completedTodos / todos.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
    }

    addTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = newTodoInput.value.trim();
        if (newTask) {
            todos.push({ task: newTask, topics: [], completed: false });
            newTodoInput.value = "";
            renderTodos();
        }
    });

    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    };

    window.toggleTopics = (index) => {
        const topicsList = todoList.children[index].querySelector(".topics");
        topicsList.style.display = topicsList.style.display === "none" ? "block" : "none";
    };

    renderTodos();
});
