const gameContainer = document.querySelector('#game-container');
const resetBtn = document.getElementById('reset-btn');
const resizeBtn = document.getElementById('resize-btn');
const blackBtn = document.getElementById('black-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const eraserBtn = document.getElementById('eraser-btn');


let squares = [];
let brushColor = 'grey';

widthSquares = (columns) => {
    squareWidth = 550 / columns;
    return squareWidth + 'px';
}

heightSquares = (rows) => {
    squareHeight = 750 / rows;
    return squareHeight + 'px';
}

brushEvent = () => {
    squares.forEach(square => {
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = brushColor;
        })
    })
}

createGrid = (rows, columns) => {
    gameContainer.style.gridAutoRows = widthSquares(columns);
    gameContainer.style.gridAutoColumns = heightSquares(rows);
    size = rows * columns; 
    let row = 1;
    let column = 1;
    for (let i = 0; i < size - 1; i++) {
        const newSquare = document.createElement('div');
        gameContainer.appendChild(newSquare);
        newSquare.className = 'square';
        newSquare.style.backgroundColor = 'lightgray';
        newSquare.style.gridRow = row;
        newSquare.style.gridColumn = column;
        squares.push(newSquare);
        column += 1;
        if (column == columns) {
            row += 1;
            column = 1;
        }
        console.log('square created');
        brushEvent();
    }
}

createGrid(16, 16);

resizeBtn.addEventListener('click', () => {
    var elements = document.getElementsByClassName('square');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    squares = [];
    createGrid(prompt('Number of rows?', 16), prompt('Number of columns?', 16));
}
);

blackBtn.addEventListener('click', () => {
    brushColor = 'black';
});

rainbowBtn.addEventListener('click', () => {

});

eraserBtn.addEventListener('click', () => {
    brushColor = 'lightgrey';
});

resetBtn.addEventListener('click', () => {
    squares.forEach(square => {
        square.style.backgroundColor = 'lightgrey';
    })
})

