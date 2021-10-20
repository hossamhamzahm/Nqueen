const main = document.querySelector('main');
const grid_size_input = document.getElementById('grid-input');
const grid_size_range = document.getElementById('grid-range');
const generate_sol_btn= document.getElementById('solve-btn');
const select = document.getElementById('solutions')

let n = 4
let solutions = [];
let grid = [];


grid_size_input.addEventListener('change', (e) => {
    if (grid_size_input.value > '8') {
        grid_size_input.value = '8';
        grid_size_input.innerText = '8'
    }
    grid_size_range.value = grid_size_input.value
})

grid_size_input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        const event = new Event('change');
        grid_size_input.dispatchEvent(event);
        generate_solution();
    }
})

grid_size_range.addEventListener('change', (e) => {
    if (grid_size_range.value > '8') {
        grid_size_range.value = '8';
        grid_size_range.innerText = '8'
    }
    grid_size_input.value = grid_size_range.value
})

generate_sol_btn.addEventListener('click', generate_solution)

select.addEventListener('change', (e)=>{
    display(select.value)
})


function generate_solution(){
    n = parseInt(grid_size_range.value);
    solutions = [];
    grid = [];

    main.innerHTML = '';

    // generating HTML grid using lis
    for (let r = 0; r < n; r++) {
        const ul = document.createElement('ul')
        for (let c = 0; c < n; c++) {
            const li = document.createElement('li');
            ul.appendChild(li);
        }
        main.appendChild(ul)
    }

    // generating the array grid
    for (let r = 0; r < n; r++) {
        grid.push([])
        for (let c = 0; c < n; c++) {
            grid[r].push('.');
        }
    }

    solve();
    generate_select_opts();
    display();
    document.querySelector('aside h4').innerHTML = `There are ${solutions.length} solutions generated for the chosen grid, chose one of them to display`;
}


// check if there is no queens clashes
function check(r, c){
    for(let i=r-1; i>-1; i--){
        if(grid[i][c] !== '.') return false;
    }
    for(let i=r-1, j=c-1; i>-1 && j>-1; i--, j--){
        if(grid[i][j] !== '.') return false;
    }
    for(let i=r-1, j=c+1; i>-1 && j<n; i--, j++){
        if(grid[i][j] !== '.') return false;
    }

    return true;
}

// Backtracking algorithm
function solve(r=0){
    if(r === n){
        solutions.push(JSON.parse(JSON.stringify(grid)));
        return 
    }

    for(let c=0; c<n; c++){
        if(check(r, c)){
            grid[r][c] = 'Q';
            solve(r+1);
            grid[r][c] = '.';
        }
    }
}

function display(sol_num=0){
    // Creating the HTML grid using uls and lis
    let uls = document.querySelectorAll('main ul');
    uls.forEach((ul, r) => {
        ul.querySelectorAll('li').forEach((li, c) => {
            if (solutions[sol_num][r][c] === '.') {
                li.innerHTML = ``;
            } else {
                li.innerHTML = `<i class="chess-piece las la-chess-queen"></i>`;
            }
        })
    })
}


function generate_select_opts(){
    select.innerHTML = "";
    for(let i=0; i<solutions.length; i++){
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i+1;
        select.appendChild(opt);
    }
}