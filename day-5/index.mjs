// readLines

import { readLines } from "../utils.mjs";

const doc = {
    1: ["F", "H", "M", "T", "V", "L", "D"],
    2: ["P", "N", "T", "C", "J", "G", "Q", "H"],
    3: ["H", "P", "M", "D", "S", "R"],
    4: ["F", "V", "B", "L"],
    5: ["Q", "L", "G", "H", "N"],
    6: ["P", "M", "R", "G", "D", "B", "W"],
    7: ["Q", "L", "H", "C", "R", "N", "M", "G"],
    8: ["W", "L", "C"],
    9: ["T", "M", "Z", "J", "Q", "L", "D", "R"],
};

export async function day5() {
    await part1();
}

async function part1() {
    const lines = await readLines("./day-5/commands.txt");
    const commands = lines.map((line) => createCommand(line));
    commands.forEach((command) => execute(command));
    console.log(doc);
}

function createCommand(input = "move x from y to z") {
    [].pop;
    return () => {
        const [x, y, z] = parseCommand(input);
        // console.log({ x, y, z });
        const source = doc[y];
        const target = doc[z];
        for (let i = 0; i < x; i++) {
            const box = source.pop();
            if (!box) {
                throw new Error(`no box number ${i} found`);
            }
            target.push(box);
        }
    };

    // return doc[x].po
}

function execute(command) {
    command();
}

function parseCommand(input = "move x from y to z") {
    const parts = input.split(" ");
    //    0      1     2      3     4     5
    // ['move', 'x', 'from', 'y', 'to', 'z']
    return [+parts[1], +parts[3], +parts[5]];
}

const out = {
    1: ["W", "L", "H", "P"],
    2: ["C", "Q"],
    3: ["P"],
    4: ["Z", "H", "B", "Q"],
    5: ["J", "F", "F", "D"],
    6: [
        "V",
        "T",
        "V",
        "M",
        "D",
        "J",
        "C",
        "G",
        "G",
        "Q",
        "H",
        "H",
        "P",
        "L",
        "M",
        "C",
        "T",
        "G",
        "B",
        "R",
        "M",
        "R",
    ],
    7: ["R", "G", "N", "L", "D", "L", "Q", "M", "S", "T", "L", "W", "M", "L"],
    8: ["D", "R", "N"],
    9: ["H", "N"],
};
