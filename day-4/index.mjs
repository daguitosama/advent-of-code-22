import { readLines } from "../utils.mjs";
import fs from "fs";
import path from "path";

export async function day4() {
    // test();
    const r = await part1();
    console.log(`respone: ${JSON.stringify(r)}`);
}

async function part1() {
    var fullContainedRanges = 0;
    var partiallyOverlapedRanges = 0;
    const lines = await readLines("./day-4/input.txt");
    // console.log({ lines });
    const rangePairs = lines.map((line) => lineToIntRanges(line));
    rangePairs.forEach((pair) => {
        // console.log({ pair });
        if (thereIsAFullyContainedRange(pair[0], pair[1])) {
            fullContainedRanges++;
        }
        if (pair[0].isPartiallyOverlapedBy(pair[1])) {
            partiallyOverlapedRanges++;
        }
    });

    return { fullContainedRanges, partiallyOverlapedRanges };
}

class IntRange {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    isFullyContainedBy(range = new IntRange()) {
        var itis = false;

        if (
            // sart affter or in the r-begguining
            // ends before or in r-ends
            this.from >= range.from &&
            this.to <= range.to
        ) {
            itis = true;
        }
        return itis;
    }

    isPartiallyOverlapedBy(range = new IntRange()) {
        var itis = false;
        if (
            // starts in between gray borders
            (this.from >= range.from && this.from <= range.to) ||
            // or
            // ends in between gray borders
            (this.to >= range.from && this.to <= range.to) ||
            // or
            // range starts between current borders
            (range.from >= this.from && range.from <= this.to) ||
            // or
            // range ends between current borders
            (range.to >= this.from && range.to <= this.to)
        ) {
            itis = true;
        }
        return itis;
    }

    toString() {
        const values = [];
        for (let i = this.from; i < this.to + 1; i++) {
            values.push(i);
        }
        return `[${values.toString()}]`;
    }
}

function thereIsAFullyContainedRange(r1 = new IntRange(), r2 = new IntRange()) {
    return r1.isFullyContainedBy(r2) || r2.isFullyContainedBy(r1);
}

function lineToIntRanges(line = "2-4,1-5") {
    // console.log({ line });
    const parts = line.split(","); // [ '2-4' , '1-5' ]
    // console.log({ line, parts });
    const part1 = parts[0].split("-"); // '2x-4x'
    const part2 = parts[1].split("-"); // '1x-5x'
    const r1 = new IntRange(+part1[0], +part1[1]);
    const r2 = new IntRange(+part2[0], +part2[1]);

    return [r1, r2];
}

function test() {
    const r1 = new IntRange(2, 4);
    const r2 = new IntRange(1, 5);
    console.log("foo");
    console.log(
        `
        The statetment:  
           ${r1.toString()} 
           is contained in
           ${r2.toString()} 
           is 
           ${r1.isFullyContainedBy(r2) ? "true" : "false"}
        `
    );

    // console.log(lineToIntRanges("6-8").toString());

    console.log({
        r1,
        r2,
        "r1 is contained by r2": r1.isFullyContainedBy(r2),
        "r2 is contained by r1": r2.isFullyContainedBy(r1),
        "r2 is partially overlaped by r1": r2.isPartiallyOverlapedBy(r1),
        "there is a fully contained in [r1 , r2]": thereIsAFullyContainedRange(
            r1,
            r2
        ),
        "1-3,1-6 parsed ranges": lineToIntRanges("1-3,1-6"),
        "1-3,1-6 parsed ranges": lineToIntRanges("1-3,1-6"),
        //
    });
}
