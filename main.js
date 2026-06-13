const file = window.location.pathname.split('/').pop();
if(file == 'index.html' || file == 'position.html'){
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
}
// ------------------Страничка employee.thml------------------
if(file == 'employee.html'){

const emp={item:document.querySelector('.employee')};
var Em_n = 8;
function employee_spawn(){
    const container = emp.item;
    if(!container) return;
    container.innerHTML = '';
    for(var i = 0; i < Em_n;i++){
        const Em_div = document.createElement('div');
        Em_div.classList.add('humans', 'closed');
        Em_div.innerHTML =`
        <div class="humans-header" style="width: 100%;">
            <input class='pole' data-card="${i}" placeholder="ФИО" maxlength="45" style="width: 100%; height: 75px; text-align: center; box-sizing: border-box; margin-bottom: 10px; font-weight: bold;">
        </div>
        
        <div class="humans-body" style="width: 100%;">
             <div class="humansStatIn">
                <select style="width: 100%; text-align: center; box-sizing: border-box; margin-bottom: 4px; font-size: 18px;">
                <option disabled selected>Пол</option>
                <option>Мужской</option>
                <option>Женский</option>
            </select>
             </div>
            <div class="humansStatIn">
                <label>Возраст:</label>
                <input class='pole' data-card="${i}" placeholder="____________________" maxlength="45">
            </div>
            <div class="humansStatIn">
                <label>Специальность:</label>
                <input class='pole' data-card="${i}" placeholder="____________________" maxlength="45">
            </div>
            <div class="humansStatIn">
                <label>Опыт работы:</label>
                <input class='pole' data-card="${i}" placeholder="____________________" maxlength="45">
            </div>
            <div class="humansStatIn">
                <label>Компетентность:</label>
                <select style="font-size: 18px;">
                    <option disabled selected>---</option><option>10</option><option>9</option><option>8</option><option>7</option><option>6</option><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option>
                </select>
            </div>
            <div class="humansStatIn">
                <label title="Умение работать в команде">Командность:</label>
                <select style="font-size: 18px;">
                    <option disabled selected>---</option><option>10</option><option>9</option><option>8</option><option>7</option><option>6</option><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option>
                </select>
            </div>
            <div class="humansStatIn">
                <label title="Профессиональные качества">Проф. качества:</label>
                <input class='pole' data-card="${i}" placeholder="____________________" maxlength="45">
            </div>
            <button type="button" class="button_CH btn-add-skill" data-card="${i}">Добавить характеристику</button>
        </div>
        `;
        container.append(Em_div);
    }
    const addBtn = document.createElement('button');
    addBtn.classList.add('button_EM');
    addBtn.setAttribute('data-card', '0');
    addBtn.innerText = 'Добавить сотрудника';
    container.append(addBtn);
}

if (emp.item) {
    emp.item.addEventListener('click', function(e) {
        // 1. Логика добавления новой характеристики
        if (e.target.classList.contains('btn-add-skill')) {
            const newRow = `
            <div class="humansStatIn">
                <input class="pole" style="width: 175px;" placeholder="Характеристика" maxlength="45">
                <input class="pole" placeholder="____________________" maxlength="45">
            </div>`;
            e.target.insertAdjacentHTML('beforebegin', newRow);
            return; // Прерываем код, чтобы не закрыть карточку при нажатии на кнопку
        }

        // 2. Логика переключения открыть/закрыть карточку
        const card = e.target.closest('.humans');
        if (card) {
            // Если кликнули по инпуту или селекту, открываем карточку, но не закрываем обратно при повторном клике внутрь поля
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
                card.classList.remove('closed');
            } else {
                // Если кликнули по самой карточке или по фону — переключаем состояние
                card.classList.toggle('closed');
            }
        }
    });
}
employee_spawn();
}