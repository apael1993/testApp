window.onload = main;

const matrix = [];
const M = 10;
const N = 10;
let endPointI;
let endPointJ;

function main() {
    createMatrix();
    setInitialValues();
    findShortWayToEndPoint();
    printMatrix();
}

function createMatrix() {
    for (let i = 0; i < M; i++) {
        matrix[i] = [];
        for (let j = 0; j < N; j++) {
            matrix[i][j] = 0;
        }
    }
}

function setInitialValues() {
    setStartPoint();
    setEndPoint();
    setWalls();
}

function setStartPoint() {
    const i = Math.floor(Math.random() * M);
    const j = Math.floor(Math.random() * N);

    matrix[i][j] = 1;
}

function setEndPoint() {
    endPointI = Math.floor(Math.random() * M);
    endPointJ = Math.floor(Math.random() * M);

    while (matrix[endPointI][endPointJ] === 1) {
        endPointI = Math.floor(Math.random() * M);
        endPointJ = Math.floor(Math.random() * M);
    }

    matrix[endPointI][endPointJ] = M * N;
}

function setWalls() {
    let count = Math.ceil(M * N * 0.1);

    while (count > 0) {
        const i = Math.floor(Math.random() * M);
        const j = Math.floor(Math.random() * M);

        if (matrix[i][j] === 0) {
            matrix[i][j] = -1;
            count--;
        }
    }
}

function findShortWayToEndPoint() {
    let maxLayerNumber = 0;

    while (!isFinished(maxLayerNumber + 1)) {
        maxLayerNumber++;
        const boxes = getBoxesFor(maxLayerNumber);
        setNeighbours(boxes, maxLayerNumber + 1);
    }
    if (isGetToEnd()) {
        markShortWay(maxLayerNumber + 1);
    } else {
        alert('No way to end point!');
    }
}

function markShortWay(number) {
    let i = endPointI;
    let j = endPointJ;

    while (number !== 1) {
        const box = getNeighbourEqualTo(number, i, j);
        i = box.i;
        j = box.j;
        matrix[i][j] = '#';
        number--;
    }
}

function getNeighbourEqualTo(num, i, j) {
    if (i - 1 >= 0 && matrix[i - 1][j] === num) {
        return {i: i - 1, j};
    }
    if (i + 1 < M && matrix[i + 1][j] === num) {
        return {i: i + 1, j};
    }
    if (j - 1 >= 0 && matrix[i][j - 1] === num) {
        return {i, j: j - 1};
    }
    if (j + 1 < N && matrix[i][j + 1] === num) {
        return {i, j: j + 1};
    }
}

function setNeighbours(boxes, number) {
    boxes.forEach(box => {
        changeNeighboursOf(box, number);
    });
}

function changeNeighboursOf(box, number) {
    const {i, j} = box;

    if (i - 1 >= 0 && matrix[i - 1][j] === 0) {
        matrix[i - 1][j] = number;
    }
    if (i + 1 < M && matrix[i + 1][j] === 0) {
        matrix[i + 1][j] = number;
    }
    if (j - 1 >= 0 && matrix[i][j - 1] === 0) {
        matrix[i][j - 1] = number;
    }
    if (j + 1 < N && matrix[i][j + 1] === 0) {
        matrix[i][j + 1] = number;
    }
}

function getBoxesFor(maxLayerNumber) {
    const boxes = [];

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] === maxLayerNumber) {
                boxes.push({i, j});
            }
        }
    }
    return boxes;
}

function printMatrix() {
    let matrixStr = '';

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            matrixStr += `  ${matrix[i][j]}  `;
        }
        matrixStr += '\n';
    }

    console.log(matrixStr);
}

function isFinished(number) {
    return isGetToEnd() || !canMove(number);
}

function isGetToEnd() {
    const i = endPointI;
    const j = endPointJ;

    if (i - 1 >= 0 && matrix[i - 1][j] >= 1) {
        return true;
    }
    if (i + 1 < M && matrix[i + 1][j] >= 1) {
        return true;
    }
    if (j - 1 >= 0 && matrix[i][j - 1] >= 1) {
        return true;
    }
    return j + 1 < N && matrix[i][j + 1] >= 1;
}

function canMove(number) {
    const boxes = getBoxesFor(number);

    for (let box of boxes) {
        if (hasEmptyNeighbour(box)) {
            return true;
        }
    }

    return false;
}

function hasEmptyNeighbour(box) {
    const {i, j} = box;

    if (i - 1 >= 0 && matrix[i - 1][j] === 0) {
        return true;
    }
    if (i + 1 < M && matrix[i + 1][j] === 0) {
        return true;
    }
    if (j - 1 >= 0 && matrix[i][j - 1] === 0) {
        return true;
    }
    return j + 1 < N && matrix[i][j + 1] === 0;
}