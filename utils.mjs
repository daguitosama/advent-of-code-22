import fs from "fs/promises";

export function br(label = "foo", length = 30) {
    label = label.toUpperCase();
    var br = "";
    for (let i = 0; i < length; i++) {
        if (i == Math.round(length / 2)) {
            br += ` ${label} `;
        } else {
            br += "-";
        }
    }
    console.log(br);
}

export async function readLines(filename) {
    // console.log(filename);
    const data = await fs.readFile(filename, "utf-8");
    const lines = data.split("\n");
    return lines;
}
