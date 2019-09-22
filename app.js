window.onload = main;

const matrix = [];
const M = 8;
const N = 8;

let currentPositionI;
let currentPositionJ;

function main() {
    createMatrix();
    initializeMatrixStepCounts();
    setHorseStartPoint();
    startAlgorithm();
}

function startAlgorithm() {
    while (!isAlgorithmFinished()) {
        initializeMatrixStepCounts();
        moveHorse();
    }
}

function isAlgorithmFinished() {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] !== -1) {
                return false;
            }
        }
    }
    return true;
}

function moveHorse() {
    const availableBoxes = getAvailableBoxesFor(currentPositionI, currentPositionJ);
    let minStepCount = 8;

    availableBoxes.forEach(box => {
        const {i, j} = box;

        if (matrix[i][j] < minStepCount) {
            minStepCount = matrix[i][j];
            currentPositionJ = j;
            currentPositionI = i;
        }
    });
    matrix[currentPositionI][currentPositionJ] = -1;
}

function setHorseStartPoint() {
    let minStepCount = 8;

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] < minStepCount) {
                minStepCount = matrix[i][j];
                currentPositionI = i;
                currentPositionJ = j;
            }
        }
    }
    matrix[currentPositionI][currentPositionJ] = -1;
}

function createMatrix() {
    for (let i = 0; i < M; i++) {
        matrix[i] = [];
        for (let j = 0; j < N; j++) {
            matrix[i][j] = 0;
        }
    }
}

function initializeMatrixStepCounts() {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] !== -1) {
                matrix[i][j] = getAvailableBoxesFor(i, j).length;
            }
        }
    }
}

function getAvailableBoxesFor(i, j) {
    let availableBoxes = [];

    if (i - 2 >= 0 && j + 1 < N && matrix[i - 2][j + 1] !== -1) {
        availableBoxes.push({i: i - 2, j: j + 1});
    }
    if (i - 2 >= 0 && j - 1 >= 0 && matrix[i - 2][j - 1] !== -1) {
        availableBoxes.push({i: i - 2, j: j - 1});
    }
    if (i + 2 < M && j + 1 < N && matrix[i + 2][j + 1] !== -1) {
        availableBoxes.push({i: i + 2, j: j + 1});
    }
    if (i + 2 < M && j - 1 >= 0 && matrix[i + 2][j - 1] !== -1) {
        availableBoxes.push({i: i + 2, j: j - 1});
    }
    if (i - 1 >= 0 && j + 2 < N && matrix[i - 1][j + 2] !== -1) {
        availableBoxes.push({i: i - 1, j: j + 2});
    }
    if (i - 1 >= 0 && j - 2 >= 0 && matrix[i - 1][j - 2] !== -1) {
        availableBoxes.push({i: i - 1, j: j - 2});
    }
    if (i + 1 < M && j + 2 < N && matrix[i + 1][j + 2] !== -1) {
        availableBoxes.push({i: i + 1, j: j + 2});
    }
    if (i + 1 < M && j - 2 >= 0 && matrix[i + 1][j - 2] !== -1) {
        availableBoxes.push({i: i + 1, j: j - 2});
    }

    return availableBoxes;
}