import fs from "fs";

const sample_input = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

function elfNotesToElfSums(input = "") {
    const lines = input.split("\n");
    const elfsCalSums = [];
    var currentElfCalories = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let callories_in_line = parseInt(line);

        if (callories_in_line) {
            currentElfCalories += callories_in_line;
        } else {
            elfsCalSums.push(currentElfCalories);
            currentElfCalories = 0;
        }
    }
    // sort
    elfsCalSums.sort((a, b) => (a < b ? 1 : -1));
    return elfsCalSums;
}

async function processInput() {
    try {
        const data = await fs.promises.readFile("./input.txt", "utf8");
        const callories_by_elf = elfNotesToElfSums(data);
        const biggest_callories_bag = callories_by_elf[0];
        const top_tree_bags_callories = [
            callories_by_elf[0],
            callories_by_elf[1],
            callories_by_elf[2],
        ];
        console.log(biggest_callories_bag);
        console.log(top_tree_bags_callories);
        const top_tree_bags_sum = top_tree_bags_callories.reduce(
            (p, c) => p + c,
            0
        );
        console.log(top_tree_bags_sum);
    } catch (error) {
        console.error(error);
    }
}

processInput();
// const callories_by_elf = elfNotesToElfSums(sample_input);
// const biggest_callories_bag = callories_by_elf[0];
// console.log(biggest_callories_bag);
// console.table(callories_by_elf);

export async function day1() {
    await processInput();
}
