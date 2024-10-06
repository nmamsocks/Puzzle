const puzzleContainer = document.getElementById('puzzle');
const shuffleBtn = document.getElementById('shuffle');
const imageInput = document.getElementById('image');

// Store tiles in array
let tiles = [];

// Store image
let img = ''; 

// Create the 3x3 grid of image tiles
function createPuzzle() {
    // Clear existing tiles
    puzzleContainer.innerHTML = '';
    
    // Empty
    tiles = [];

    // Loop 9 tiles for puzzle grid
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        // User imput img
        tile.style.backgroundImage = `url(${imgUrl})`;
        
        // Make sure each is in correct position
        tile.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
        tile.setAttribute('data-index', i);
        tile.addEventListener('click', handleTileClick);
        puzzleContainer.appendChild(tile);
        tiles.push(tile);
    }
}

// Shuffle the tiles
function shuffleTiles() {

    // starts loop backwards for shuffling
    for (let i = tiles.length - 1; i > 0; i--) {

        // randomly pick index to swap
        const j = Math.floor(Math.random() * (i + 1));

        // swap using index
        [tiles[i].style.backgroundPosition, tiles[j].style.backgroundPosition] =
            [tiles[j].style.backgroundPosition, tiles[i].style.backgroundPosition];
    }
}

// holds first selected tile
let firstTile = null;

// clicking tiles
function handleTileClick() {
    if (!firstTile) {

        // selected
        firstTile = this;
        this.classList.add('selected');
    } else {
        // if selected swap tiles
        swapTiles(firstTile, this);
        firstTile.classList.remove('selected');

        //reset 
        firstTile = null;

        // check if finished after each ove
        checkWin();
    }
}

// Swap the tiles you clicked on
function swapTiles(tile1, tile2) {
    // store position
    let temp = tile1.style.backgroundPosition;
    
    // swap positions
    tile1.style.backgroundPosition = tile2.style.backgroundPosition;
    tile2.style.backgroundPosition = temp;
}

// Check if the puzzle is solved by checking to see if all the tiles are in their correct position
function checkWin() {
    let isSolved = tiles.every((tile, i) => {
        return tile.style.backgroundPosition === `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
    });

    if (isSolved) {
        alert('Good Job!');
    }
}

// image upload
imageInput.addEventListener('change', (event) => {

    // uploaded file
    const file = event.target.files[0];
    if (file) {

        // load file, create puzzle
        const reader = new FileReader();
        reader.onload = function(e) {
            img = e.target.result;
            createPuzzle();
        };
        reader.readAsDataURL(file);
    }
});

// Shuffle 
shuffleBtn.addEventListener('click', shuffleTiles);
