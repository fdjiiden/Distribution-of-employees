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
            <input disabled class="pole" data-card="${i} " placeholder="Должность" maxlength="25" value="${titles[i] || ''}"></input>
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

function Exactly1(){
    return confirm("Вы точно хотите удалить должность?");
}
function Exactly2(){
    return confirm("Вы точно хотите убрать?");
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
            if(Exactly2()){
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
            if (Exactly1()) {
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
if (file == 'employee.html') {
    const emp = { item: document.querySelector('.employee') };
    let employees = JSON.parse(localStorage.getItem('SaveEmployees')) || Array.from({ length: 8 }, () => ({
        fio: '', gender: 'Пол', age: '', specialty: '', experience: '', competence: '---', teamwork: '---', qualities: '', customSkills: []
    }));
    function getEmployeeHTML(index, data) {
        let customSkillsHTML = '';
        if (data.customSkills && data.customSkills.length > 0) {
            data.customSkills.forEach((skill, j) => {
                customSkillsHTML += `
                <div class="humansStatIn">
                    <input class="pole" data-card="${index}" data-skill-idx="${j}" data-field="skill-name" style="width: 175px; text-align: left;" placeholder="Характеристика" maxlength="45" value="${skill.name || ''}">
                    <input class="pole" data-card="${index}" data-skill-idx="${j}" data-field="skill-val" placeholder="____________________" maxlength="45" value="${skill.value || ''}">
                </div>`;
            });
        }
        return `
        <div class="humans closed">
            <div class="humans-header" style="width: 100%;">
                <button type="button" class="humans-close">⌃</button>
                <button type="button" class="humans-delete" data-card="${index}">X</button>
                <input class='pole' data-card="${index}" data-field="fio" placeholder="ФИО" maxlength="45" style="width: 100%; height: 75px; text-align: center; box-sizing: border-box; margin-bottom: 10px; font-weight: bold;" value="${data.fio || ''}">
            </div>
            <div class="humans-body" style="width: 100%;">
                <div class="humans-body-content">
                     <div class="humansStatIn">
                        <select class='list-for-humans' data-card="${index}" data-field="gender" style="width: 100%; text-align: center; box-sizing: border-box; margin-bottom: 4px; font-size: 18px;">
                            <option disabled ${data.gender === 'Пол' ? 'selected' : ''}>Пол</option>
                            <option ${data.gender === 'Мужской' ? 'selected' : ''}>Мужской</option>
                            <option ${data.gender === 'Женский' ? 'selected' : ''}>Женский</option>
                        </select>
                     </div>
                    <div class="humansStatIn">
                        <label>Возраст:</label>
                        <input class='pole' data-card="${index}" data-field="age" placeholder="____________________" maxlength="45" value="${data.age || ''}">
                    </div>
                    <div class="humansStatIn">
                        <label>Специальность:</label>
                        <input class='pole' data-card="${index}" data-field="specialty" placeholder="____________________" maxlength="45" value="${data.specialty || ''}">
                    </div>
                    <div class="humansStatIn">
                        <label>Опыт работы:</label>
                        <input class='pole' data-card="${index}" data-field="experience" placeholder="____________________" maxlength="45" value="${data.experience || ''}">
                    </div>
                    <div class="humansStatIn">
                        <label>Компетентность:</label>
                        <select style="font-size: 18px;" class='list-for-humans' data-card="${index}" data-field="competence">
                            <option disabled ${data.competence === '---' ? 'selected' : ''}>---</option>
                            ${[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(num => `<option ${data.competence == num ? 'selected' : ''}>${num}</option>`).join('')}
                        </select>
                    </div>
                    <div class="humansStatIn">
                        <label title="Умение работать в команде">Командность:</label>
                        <select style="font-size: 18px;" class='list-for-humans' data-card="${index}" data-field="teamwork">
                            <option disabled ${data.teamwork === '---' ? 'selected' : ''}>---</option>
                            ${[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(num => `<option ${data.teamwork == num ? 'selected' : ''}>${num}</option>`).join('')}
                        </select>
                    </div>
                    <div class="humansStatIn">
                        <label title="Профессиональные качества">Проф. качества:</label>
                        <input class='pole' data-card="${index}" data-field="qualities" placeholder="____________________" maxlength="45" value="${data.qualities || ''}">
                    </div>
                    ${customSkillsHTML}
                    <button type="button" class="button_CH btn-add-skill" data-card="${index}">Добавить характеристику</button>
                </div>
            </div>
        </div>`;
    }
    function ExactlyDeleteEmployee() {
        return confirm("Вы точно хотите удалить сотрудника?");
    }
    function employee_spawn() {
        const container = emp.item;
        if (!container) return;
        container.innerHTML = '';
        employees.forEach((empData, i) => {
            container.insertAdjacentHTML('beforeend', getEmployeeHTML(i, empData));
        });
        const addBtn = document.createElement('button');
        addBtn.classList.add('button_EM');
        addBtn.innerText = 'Добавить сотрудника';
        container.append(addBtn);
    }
    if (emp.item) {
        const autoSaveHandler = function (e) {
            const field = e.target.getAttribute('data-field');
            const cardIdx = e.target.getAttribute('data-card');
            if (!field || cardIdx === null) return;
            if (field !== 'skill-name' && field !== 'skill-val') {
                employees[cardIdx][field] = e.target.value;
            } else {
                const skillIdx = e.target.getAttribute('data-skill-idx');
                if (!employees[cardIdx].customSkills[skillIdx]) {
                    employees[cardIdx].customSkills[skillIdx] = { name: '', value: '' };
                }
                if (field === 'skill-name') {
                    employees[cardIdx].customSkills[skillIdx].name = e.target.value;
                } else {
                    employees[cardIdx].customSkills[skillIdx].value = e.target.value;
                }
            }
            localStorage.setItem('SaveEmployees', JSON.stringify(employees));
        };
        emp.item.addEventListener('input', autoSaveHandler);
        emp.item.addEventListener('change', autoSaveHandler);
        emp.item.addEventListener('click', function (e) {
            if (e.target.classList.contains('humans-delete')) {
                if (ExactlyDeleteEmployee()) {
                    const cardIdx = parseInt(e.target.getAttribute('data-card'));
                    employees.splice(cardIdx, 1);
                    localStorage.setItem('SaveEmployees', JSON.stringify(employees));
                    employee_spawn();
                }
                return;
            }
            if (e.target.classList.contains('button_EM')) {
                employees.push({
                    fio: '', gender: 'Пол', age: '', specialty: '', experience: '', competence: '---', teamwork: '---', qualities: '', customSkills: []
                });
                localStorage.setItem('SaveEmployees', JSON.stringify(employees));
                employee_spawn();
                return;
            }
            if (e.target.classList.contains('btn-add-skill')) {
                const cardIdx = e.target.getAttribute('data-card');
                if (!employees[cardIdx].customSkills) {
                    employees[cardIdx].customSkills = [];
                }
                employees[cardIdx].customSkills.push({ name: '', value: '' });
                localStorage.setItem('SaveEmployees', JSON.stringify(employees));
                employee_spawn();
                return;
            }
            const card = e.target.closest('.humans');
            if (!card) return;
            if (e.target.classList.contains('humans-close')) {
                card.classList.add('closed');
                return;
            }
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON') {
                card.classList.remove('closed');
                return;
            }
            if (card.classList.contains('closed')) {
                card.classList.remove('closed');
            }
        });
    }
    employee_spawn();
}