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
            <div class='J_tirle'>
            <input class="pole" data-card="${i}" placeholder="Должность" maxlength="25" value="${titles[i] || ''}"></input>
            <button  class="button_remove" data-card="${i}">X</button>
            </div>
            `
        }
        if (!human[i]) human[i] = []; 
        for(var j = 0; j < human[i].length; j++){
        if(file === 'index.html'){div.innerHTML += `
            <input disabled class="pole" data-card="${i}" data-row="${j}" placeholder="ФИО" maxlength="25" value="${human[i][j] || ''}"></input>
        `}
        else{div.innerHTML += `
            <div class="fio">
            <input class="pole pole_FIO" data-card="${i}" data-row="${j}" placeholder="ФИО" maxlength="25" value="${human[i][j] || ''}"></input>
            <button  class="button_removeFIO" data-card="${i}" data-row="${j}">X</button>
            </div>
        `}
        }
        if(file != 'index.html')div.innerHTML += `<button type="button" class='button_FIO' data-card="${i}">Добавить человека</button>`
        body.append(div);
    }
    if(window.location.pathname.split('/').pop() == 'position.html'){
        const AppendBut1 = document.createElement('button');
        AppendBut1.id = 'Count'; AppendBut1.textContent = 'Добавить новую';
        body.append(AppendBut1);
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

function Exactly(){
    return confirm("Вы точно хотите удалить?");
}

if (body) {
    body.addEventListener('click', function(event) {
        if (event.target.classList.contains('button_FIO')) {//добавление
            const cardIndex = event.target.getAttribute('data-card');
            if (!human[cardIndex]) human[cardIndex] = [];
            human[cardIndex].push(''); 
            localStorage.setItem('SaveHumans', JSON.stringify(human));
            newcolumns(); 
        }
        if (event.target.classList.contains('button_removeFIO')) {//удаление
            if(Exactly()){
                const cardIndex = event.target.getAttribute('data-card');
                const rowIndex = event.target.getAttribute('data-row');
                
                if (human[cardIndex]) {
                    human[cardIndex].splice(rowIndex, 1); 
                }
                localStorage.setItem('SaveHumans', JSON.stringify(human)); 
                newcolumns(); }
        }
        if (event.target.id === 'Count') {
            n++; 
            localStorage.setItem('SaveCount', n);
            newcolumns();
            return; // Выходим из функции, так как перерисовка уже запущена
        }
        if (event.target.classList.contains('button_remove')) {
            if (Exactly()) {
                const cardIndex = parseInt(event.target.getAttribute('data-card'));
                titles.splice(cardIndex, 1);
                human.splice(cardIndex, 1);
                n--;
                localStorage.setItem('SaveTitles', JSON.stringify(titles));
                localStorage.setItem('SaveHumans', JSON.stringify(human));
                localStorage.setItem('SaveCount', n);
                newcolumns();
            }
        }
    });
}

console.log(n);
console.log(countFIO);
newcolumns()
// ------------------Страничка employee.thml------------------