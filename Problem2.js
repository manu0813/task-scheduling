const friendsGraph = {
    'Alice': ['Bob', 'Charlie', 'David'],
    'Bob': ['Alice', 'Eva', 'Janice'],
    'Charlie': ['Alice'],
    'David': ['Alice'],
    'Eva': ['Bob'],
    'Janice': ['Bob']
};


function getAllFriends(person) {
    return friendsGraph[person] || [];
}


function getCommonFriends(person1, person2) {
    const friends1 = new Set(getAllFriends(person1));
    const friends2 = getAllFriends(person2);
    return friends2.filter(friend => friends1.has(friend));
}


function findNthConnection(person1, person2) {
    if (person1 === person2) return 0;

    let queue = [[person1, 0]];
    let visited = new Set([person1]);

    while (queue.length > 0) {
        let [currentPerson, level] = queue.shift();
        let friends = getAllFriends(currentPerson);

        for (let friend of friends) {
            if (friend === person2) {
                return level + 1;
            }
            if (!visited.has(friend)) {
                visited.add(friend);
                queue.push([friend, level + 1]);
            }
        }
    }

    return -1;
}

// Example
console.log("All friends of Alice:", getAllFriends('Alice'));
console.log("All friends of Bob:", getAllFriends('Bob'));
console.log("Common friends of Alice and Bob:", getCommonFriends('Alice', 'Bob'));
console.log("Connection between Alice and Janice:", findNthConnection('Alice', 'Janice')); // Output: 2
console.log("Connection between Alice and Bob:", findNthConnection('Alice', 'Bob')); // Output: 1
console.log("Connection between Alice and Eva:", findNthConnection('Alice', 'Eva')); // Output: 2
console.log("Connection between Alice and Charlie:", findNthConnection('Alice', 'Charlie')); // Output: 1
console.log("Connection between Alice and someone not in the graph:", findNthConnection('Alice', 'Unknown')); // Output: -1
