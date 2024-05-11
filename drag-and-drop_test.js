function createNameDivs(namesArray) {
  const namesContainer = document.getElementById('names');
  namesContainer.innerHTML = '';

  namesArray.forEach((name, index) => {
      const nameDiv = document.createElement('div');
      nameDiv.classList.add('name');
      nameDiv.textContent = name;
      nameDiv.id = 'name-' + index; 
      namesContainer.appendChild(nameDiv);
  });
}

function updateCount(zone) {
  const count = zone.querySelectorAll('.name').length;
  zone.querySelector('.count').textContent = `${count}`;
}

const isMobileDevice = /Mobi/i.test(navigator.userAgent);

function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(id);
  const dropzone = e.target.closest('.transport');
  if (dropzone && draggableElement) {
      dropzone.appendChild(draggableElement);
      updateCount(dropzone);
  }
}

function handleTouchStart(e) {
  const touch = e.targetTouches[0];
  e.target.dataset.startX = touch.pageX;
  e.target.dataset.startY = touch.pageY;
  e.target.classList.add('dragging');
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.targetTouches[0];
  const startX = parseFloat(e.target.dataset.startX);
  const startY = parseFloat(e.target.dataset.startY);
  const deltaX = touch.pageX - startX;
  const deltaY = touch.pageY - startY;

  e.target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

function handleTouchEnd(e) {
  e.preventDefault();
  const draggableElement = e.target;
  draggableElement.classList.remove('dragging');
  draggableElement.style.transform = '';

  const changedTouch = e.changedTouches[0];
  const elemBelow = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  const dropzone = elemBelow.closest('.transport');

  if (dropzone) {
      dropzone.appendChild(draggableElement);
      updateCount(dropzone);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const childrenList = [
  ];
  
  createNameDivs(childrenList);

  if (isMobileDevice) {
      document.querySelectorAll('.name').forEach((nameElement) => {
          nameElement.addEventListener('touchstart', handleTouchStart, false);
          nameElement.addEventListener('touchmove', handleTouchMove, false);
          nameElement.addEventListener('touchend', handleTouchEnd, false);
      });
  } else {
      document.querySelectorAll('.name').forEach((nameElement) => {
          nameElement.setAttribute('draggable', true);
          nameElement.addEventListener('dragstart', handleDragStart, false);
      });
      document.querySelectorAll('.transport').forEach((zone) => {
          zone.addEventListener('dragover', handleDragOver, false);
          zone.addEventListener('drop', handleDrop, false);
      });
  }
  
  document.querySelectorAll('.transport').forEach(zone => {
      updateCount(zone);
  });
});
