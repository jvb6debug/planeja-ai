const ctx1 = document.getElementById('tasksChart');
const ctx2 = document.getElementById('productivityChart');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const cardTaskCount = document.getElementById('total-tasks');
const cardTasksDone = document.getElementById('tasks-done');
const cardTasksInProgress = document.getElementById('tasks-in-progress');
const cardTasksLate = document.getElementById('tasks-late');
const BestPerformerCard = document.getElementById('BestPerformerCard');
const RecentTaskCard = document.getElementById('RecentTaskCard');

let fakeData1 = [5, 2, 5, 2];
let fakeData2 = [6, 10, 5, 12, 6, 9, 15];

addEventListener('load', () => {
    for (let i = 0; i < fakeData1.length; i++) {
        let randomValue = Math.floor(Math.random() * 20) + 5;
        fakeData1[i] = randomValue;
    }

    for (let i = 0; i < fakeData2.length; i++) {
        let randomValue = Math.floor(Math.random() * fakeData1[3]) + 1;
        fakeData2[i] = randomValue;
    }

    cardTaskCount.textContent = fakeData1[3];
    cardTasksDone.textContent = fakeData1[0];
    cardTasksInProgress.textContent = fakeData1[1];
    cardTasksLate.textContent = fakeData1[2];

    new Chart(ctx1, {
        type: 'polarArea',
        data: {
            labels: ['Concluídas', 'Em andamento', 'Atrasadas', 'Total'],
            datasets: [{
                label: 'Tasks',
                data: fakeData1,
                borderWidth: 1,
                backgroundColor: [
                    '#2ECC71a1',
                    '#FFB703a1',
                    '#E63946a1',
                    '#3A86FFa1'
                ],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Horas produtivas',
                data: fakeData2,
                backgroundColor: '#3A86FFa1',
                borderColor: '#3A86FF',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    })
})

async function getRecentTasks() {
    const response = await fetch('http://localhost:3000/tasks/recent', {
        method: "GET"
    });

    const data = await response.json();
    return data;
}

loginBtn.addEventListener('click', () => {
    window.location.href = 'Login.html';
});

registerBtn.addEventListener('click', () => {
    window.location.href = 'Register.html';
});

(async () => {
    let tasks = await getRecentTasks();

    console.log(tasks);

    const container = document.querySelector(".open-tasks-cards");
    const template = document.getElementById("RecentTaskCard");

    if (tasks && Array.isArray(tasks)) {
        tasks.forEach(task => {
            let clone = template.content.cloneNode(true);

            // Fill data
            clone.querySelector(".task-title").textContent = task.name;
            clone.querySelector(".task-description").textContent = task.description;

            switch (task.priority) {
                case "Low":
                    clone.querySelector(".priority-dot").classList.add("low");
                    break;

                case "Medium":
                    clone.querySelector(".priority-dot").classList.add("med");
                    break;

                case "High":
                    clone.querySelector(".priority-dot").classList.add("high");
                    break;
            }

            clone.querySelector(".task-priority-text").textContent = task.priority;
            clone.querySelector(".task-date-text").textContent = task.time_frame;

            // Priority example mapping
            const priorityText = clone.querySelectorAll("p")[1];
            priorityText.textContent = task.priority;

            // Date
            const dateText = clone.querySelectorAll("p")[2];
            dateText.textContent = task.time_frame;

            container.appendChild(clone);
        });
    }
})();

addEventListener("load", () => {
    
})