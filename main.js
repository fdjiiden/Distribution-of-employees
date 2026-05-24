const element = {
    item:document.querySelector('.pole'),
};
var n, countFIO;
if(localStorage.getItem('SaveCount')) n = parseInt(localStorage.getItem('SaveCount'));
else n = 0;
if(localStorage.getItem('SaveCountFIO')) countFIO = parseInt(localStorage.getItem('SaveCountFIO'));
else  countFIO= 0;
const body = document.querySelector('.columns');
const buttonPlusOne = document.getElementById('Count');
const buttonPlusOneFIO = document.getElementById('CountFIO');
let titles = JSON.parse(localStorage.getItem('SaveTitles')) || []; // Тут бля данные  
let human = JSON.parse(localStorage.getItem('SaveHumans')) || []; 

function newcolumns() {
    if (!body) return;
    body.innerHTML = '';
    for (var i = 0; i < n; i++) {
        const div = document.createElement('div');
        div.classList.add('info');
        const file = window.location.pathname.split('/').pop();
        if(file === 'index.html'){
            div.innerHTML = `
            <input disabled class="pole" data-card="${i}" placeholder="Должность" maxlength="25" value="${titles[i] || ''}"></input>
            `
        }
        else {
            div.innerHTML = `
            <input class="pole" data-card="${i}" placeholder="Должность" maxlength="25" value="${titles[i] || ''}"></input>
            
            `
        }
        for(var j = 0; j < countFIO; j++){
        if (!human[i]) human[i] = []; 
        if(file === 'index.html'){div.innerHTML += `
            <input disabled class="pole" data-card="${i}" data-row="${j}" placeholder="ФИО" maxlength="25" value="${human[i][j] || ''}"></input>
        `}
        else{div.innerHTML += `
            <input class="pole" data-card="${i}" data-row="${j}" placeholder="ФИО" maxlength="25" value="${human[i][j] || ''}"></input>
        `}
        }
        if(file != 'index.html')div.innerHTML += `<button class='button_FIO' id='CountFIO'>Добавить человека</button>`
        body.append(div);
    }
    document.querySelectorAll('.pole[placeholder="Должность"]').forEach(input => {
    input.addEventListener('input', function() {
        const cardIndex = this.getAttribute('data-card'); 
        titles[cardIndex] = this.value; 
        localStorage.setItem('SaveTitles', JSON.stringify(titles));
    });
    });
    document.querySelectorAll('.pole[placeholder="ФИО"]').forEach(input => {
    input.addEventListener('input', function() {
        const cardIndex = this.getAttribute('data-card');
        const rowIndex = this.getAttribute('data-row');
        
        if (!human[cardIndex]) human[cardIndex] = [];
        human[cardIndex][rowIndex] = this.value; 
        
        localStorage.setItem('SaveHumans', JSON.stringify(human));
    });
});
}

if (buttonPlusOne) {
    buttonPlusOne.addEventListener('click', function() {
        n++; 
        localStorage.setItem('SaveCount', n);
        newcolumns(); 
    });
}
if (body) {// тут под кнопку удаления всё сделанно id = 'button_removeFIO'
    body.addEventListener('click', function(event) {
        if (event.target.classList.contains('button_removeFIO')) {
            if (countFIO > 0) {
                countFIO--;
                localStorage.setItem('SaveCountFIO', countFIO);
                for (var i = 0; i < n; i++) {
                    if (human[i] && human[i].length > countFIO) {
                        human[i].splice(countFIO, 1);
                    }
                }
                localStorage.setItem('SaveHumans', JSON.stringify(human));
                newcolumns(); 
            }
        }
    });
}

console.log(n);
console.log(countFIO);
newcolumns()