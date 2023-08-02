const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

item.addEventListener('dragstart', dragstart);
item.addEventListener('dragend', dragend);

for(const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragOver);
    placeholder.addEventListener('dragenter', dragEnter);
    placeholder.addEventListener('dragleave', dragLeave);
    placeholder.addEventListener('drop', dragDrop);
}

function dragstart(event) {
    event.target.classList.add('hold');
    setTimeout(() => event.target.classList.add('hide'), 0);
    
}

function dragend(event) {
    event.target.className = 'item'
    // event.target.classList.remove('hold');
    // event.target.classList.remove('hide');
}

function dragOver(event) {
    event.preventDefault();
}


function dragEnter(event) {
    event.target.classList.add('hovered');
}

function dragLeave(event) {
    event.target.classList.remove('hovered');
}

function dragDrop(event) {
    event.target.classList.remove('hovered');
    event.target.append(item);
}