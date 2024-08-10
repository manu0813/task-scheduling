class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.dependencies = []; 
        this.EST = 0; 
        this.EFT = 0; 
        this.LST = Infinity; 
        this.LFT = Infinity; 
    }
}

function topologicalSort(tasks) {
    const visited = new Set();
    const stack = [];

    function dfs(task) {
        if (visited.has(task.name)) return;
        visited.add(task.name);
        for (let dep of task.dependencies) {
            dfs(dep);
        }
        stack.push(task);
    }

    tasks.forEach(task => {
        if (!visited.has(task.name)) {
            dfs(task);
        }
    });

    return stack.reverse();
}

function calculateTimes(tasks) {
    const topoSortedTasks = topologicalSort(tasks);

    
    topoSortedTasks.forEach(task => {
        task.EFT = task.EST + task.duration;
        for (let dep of task.dependencies) {
            dep.EST = Math.max(dep.EST, task.EFT);
        }
    });

    
    let projectCompletionTime = Math.max(...topoSortedTasks.map(t => t.EFT));

    topoSortedTasks.reverse().forEach(task => {
        if (task.LFT === Infinity) task.LFT = projectCompletionTime;
        task.LST = task.LFT - task.duration;
        for (let dep of task.dependencies) {
            task.LFT = Math.min(task.LFT, dep.LST);
        }
    });

    return {
        earliestCompletionTime: projectCompletionTime,
        latestCompletionTime: topoSortedTasks[0].LFT
    };
}


const T_START = new Task('T_START', 0); 
const taskA = new Task('A', 3);
const taskB = new Task('B', 2);
const taskC = new Task('C', 1);
const taskD = new Task('D', 4);

taskA.dependencies.push(T_START);
taskB.dependencies.push(taskA);
taskC.dependencies.push(taskA);
taskD.dependencies.push(taskB, taskC);

const tasks = [T_START, taskA, taskB, taskC, taskD];

const result = calculateTimes(tasks);

console.log("Earliest time all tasks will be completed:", result.earliestCompletionTime);
console.log("Latest time all tasks will be completed:", result.latestCompletionTime);
