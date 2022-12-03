import fs from "fs";

const game_moves = {
    // oponent
    A: "A", // "ROCK",
    B: "B", // "PAPER",
    C: "C", // "SCISSORS",
    // me
    X: "X", // "ROCK",
    Y: "Y", // "PAPER",
    Z: "Z", // "SCISSORS",
};

const moves_value = {
    X: 1,
    Y: 2,
    Z: 3,
};

const my_moves_values = {
    ROCK: 1, //X
    PAPER: 2, //Y
    SCISSORS: 3, //Z
};

const match_values = {
    lost: 0,
    draw: 3,
    win: 6,
};

const match_values_keys = {
    lost: "lost",
    draw: "draw",
    win: "win",
};

function match_score(
    oponet_move = game_moves.A || game_moves.B || game_moves.C,
    my_move = game_moves.X || game_moves.Y || game_moves.Z
) {
    // console.log({ oponet_move, my_move });
    const move_value = moves_value[my_move];
    const match_value = match_values[match_result(oponet_move, my_move)];

    return move_value + match_value;
}

function match_result(
    oponet_move = game_moves.A || game_moves.B || game_moves.C,
    my_move = game_moves.X || game_moves.Y || game_moves.Z
) {
    // define game result and return a match value string key
    if (oponet_move == game_moves.A) {
        switch (my_move) {
            // lost
            case game_moves.Z:
                return match_values_keys.lost;
            // draw
            case game_moves.X:
                return match_values_keys.draw;
            // win
            case game_moves.Y:
                return match_values_keys.win;
        }
    }

    if (oponet_move == game_moves.B) {
        switch (my_move) {
            // lost
            case game_moves.X:
                return match_values_keys.lost;
            // draw
            case game_moves.Y:
                return match_values_keys.draw;
            // win
            case game_moves.Z:
                return match_values_keys.win;
        }
    }

    if (oponet_move == game_moves.C) {
        switch (my_move) {
            // lost
            case game_moves.Y:
                return match_values_keys.lost;
            // draw
            case game_moves.Z:
                return match_values_keys.draw;
            // win
            case game_moves.X:
                return match_values_keys.win;
        }
    }
}

function matchLineToMoveKeys(line = "") {
    return [line[0], line[2]];
}

// test match score (for me)
function testMatchResultFn() {
    // / losts
    // ROCK - SCISSORS
    const m1 = match_result(game_moves.A, game_moves.Z);
    const r1 = m1 == match_values_keys.lost;
    // SCISSORS - PAPER
    const m2 = match_result(game_moves.C, game_moves.Y);
    const r2 = m1 == match_values_keys.lost;
    // PAPER - ROCK
    const m3 = match_result(game_moves.B, game_moves.X);
    const r3 = m1 == match_values_keys.lost;

    // draws
    // ROCK - ROCK
    const m4 = match_result(game_moves.A, game_moves.X);
    const r4 = m4 == match_values_keys.draw;
    // SCISSORS - SCISSORS
    const m5 = match_result(game_moves.C, game_moves.Z);
    const r5 = m5 == match_values_keys.draw;
    // PAPER - PAPER
    const m6 = match_result(game_moves.B, game_moves.Y);
    const r6 = m6 == match_values_keys.draw;

    // wins
    // ROCK - PAPER
    const m7 = match_result(game_moves.A, game_moves.Y);
    const r7 = m7 == match_values_keys.win;
    // SCISSORS - ROCK
    const m8 = match_result(game_moves.C, game_moves.X);
    const r8 = m8 == match_values_keys.win;
    // PAPER - SCISSORS
    const m9 = match_result(game_moves.B, game_moves.Z);
    const r9 = m9 == match_values_keys.win;

    const results = [r1, r2, r3, r4, r5, r6, r7, r8, r9];
    const broken_case = results.filter((r) => r == false);

    console.log(
        broken_case.length ? "match_result_fn_fail" : "match_result_fn_ok"
    );
}
testMatchResultFn();

const sample_input = `A Y
B X
C Z`;

const matches = sample_input.split("\n");

const matches_moves_keys = matches.map((match_line) =>
    matchLineToMoveKeys(match_line)
);

const matches_score = matches_moves_keys.map(([oponentM, myM]) =>
    match_score(oponentM, myM)
);

const score = matches_score.reduce((p, c) => p + c, 0);

console.log({
    matches,
    matches_moves_keys,
    matches_score,
    score,
});

async function printTotalScore() {
    const data = await fs.promises.readFile("./input.txt", "utf8");

    const matches = data.split("\n");

    console.log("input", matches);

    const matches_moves_keys = matches.map((match_line) =>
        matchLineToMoveKeys(match_line)
    );

    const matches_score = matches_moves_keys.map(([oponentM, myM]) =>
        match_score(oponentM, myM)
    );

    const score = matches_score.reduce((p, c) => p + c, 0);

    console.log("total score:", score);
}

printTotalScore();

// function mapMatchInputToGameMoves(match_input = "") {
//     const oponent_move = match_input[0];
//     const my_move = match_input[2];
//     return [game_moves[oponent_move], game_moves[my_move]];
// }

// const matches_game_moves = matches.map((match_input) =>
//     mapMatchInputToGameMoves(match_input)
// );

// const input_match_scores = matches_moves_keys.map(([oponent_move, my_move]) => {
//     // console.log([oponent_move, my_move]);
//     return match_score(oponent_move, my_move);
// });

// const matches_moves_keys = matches.map((match_line) =>
//     matchLineToMoveKeys(match_line)
// );

// function get_matches_results(matches_map = ["opM", "myM"]) {
//     return matches_map.map(([oponent_move, my_move]) =>
//         match_result(oponent_move, my_move)
//     );
// }
