import fs from "fs";

// prepare priority map
const lower_case_alphabet = "abcdefghijklmnopqrstuvwxyz";
const upper_case_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = lower_case_alphabet.concat(upper_case_alphabet);
const priority_map = {};
// fill
for (let idx in alphabet) {
    priority_map[alphabet[idx]] = +idx + 1;
}

// console.log(priority_map);

// total sum of prioroties
function sumOfPriorities(priorities = [0]) {
    return priorities.reduce((preV, currV) => preV + currV, 0);
}
// rucksack to priorities
function rucksackToPriority(
    // a rsack it array with 2 compartiments
    // every compartiment is an array filled with letters
    rucksack = [[""], [""]]
) {
    const item_in_both_compartiments = itemInBoth(rucksack[0], rucksack[0]);
    const item_priority = getItemPriority(item_in_both_compartiments);
    return item_priority;
}

// input to rucksac
function inputToRucksack(input = "") {
    const lines = input.split("\n");
    const rucksacks = [];
    lines.forEach((line) => rucksacks.push(lineToRucksack(line)));
    // console.log("input has: " + lines.length + " lines");
    return rucksacks;
}

function itemInBoth(c1 = [""], c2 = [""]) {
    let a = new Set(c1);
    let b = new Set(c2);
    let intersect = [...a].filter((i) => b.has(i));
    // console.log(intersect);
    return intersect[0];
}

function getItemPriority(item = "a") {
    return priority_map[item] || 0;
}

function lineToRucksack(line = "") {
    const length = line.length;
    const c1 = line.slice(0, length / 2);
    const c2 = line.slice(length / 2);
    return [c1, c2];
}

const sample_input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

// const rsks = inputToRucksack(sample_input);
// const items = rsks.map((rsk) => itemInBoth(rsk[0], rsk[1]));
// const priorities = items.map((item) => getItemPriority(item));
// const total_p = sumOfPriorities(priorities);
// console.log(rsks, items, priorities, total_p);

function inputToTotalPriority(input = "") {
    const rsks = inputToRucksack(input);
    const items = rsks.map((rsk, idx) => {
        const item = itemInBoth(rsk[0], rsk[1]);
        // console.log(idx, item);
        return item;
    });
    const priorities = items.map((item) => getItemPriority(item));
    const total_p = sumOfPriorities(priorities);
    return total_p;
}

async function processInput() {
    try {
        const input = await fs.promises.readFile("./input.txt", "utf8");
        const total = inputToTotalPriority(input);
        console.log(total);
    } catch (error) {
        console.error(error);
    }
}

processInput();

// notes
// 89 P
