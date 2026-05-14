const element = {
    item:document.querySelector('.pole'),
};
var n
if(localStorage.getItem('SaveCount')) n = parseInt(localStorage.getItem('SaveCount'));
else n = 0;
const body = document.querySelector('.columns');
const buttonPlusOne = document.getElementById('Count');
let titles = JSON.parse(localStorage.getItem('SaveTitles')) || [];
function newcolumns() {
    if (!body) return;
    body.innerHTML = '';
    for (var i = 0; i < n; i++) {
        const div = document.createElement('div');
        div.classList.add('info');
        const file = window.location.pathname.split('/').pop();
        if(file === 'index.html'){
            div.innerHTML = `<input disabled class="pole" data-index="${i}" placeholder="Должность" maxlength="25" value="${titles[i] || ''}">`
        }
        else div.innerHTML = `<input class="pole" data-index="${i}" placeholder="Должность" maxlength="25" value="${titles[i] || ''}">`
        body.append(div);
    }
    document.querySelectorAll('.pole').forEach(input => {
        input.addEventListener('input', function() {
            const index = this.getAttribute('data-index');
            titles[index] = this.value; 
            localStorage.setItem('SaveTitles', JSON.stringify(titles));
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

newcolumns()