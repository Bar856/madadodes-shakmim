const childrenList = [
    'אמל אבו רביע',
    'עומר אברמוב',
    'שאם אלקרינאו',
    'ליבי אפשטיין',
    'רניה ארמילאת',
    'עבדאללה אשתיוי',
    'יהלי בונני',
    'סהר בן חיים',
    'תאיר בנימין',
    'שון בקשייב',
    'רינת גוסקוב',
    'עמית גנדל',
    'ליאנה דוידוב',
    'מיראל ויצמן',
    'יסמין חטיב',
    'מישל יחנקו',
    'איתן יעקובוב',
    'רפאל כהן',
    'זיו לסניק',
    'קימבר מוגילניק',
    'הילי פדלון',
    'אדם פיליאבסקי',
    'איתן ראובן',
    'אדל שלם',
    'מיאל שמוטקין'
];
function makeElementDraggable(element) {
    let active = false;
    let currentX, currentY, initialX, initialY, offsetX = 0, offsetY = 0;
  
    element.addEventListener("touchstart", dragStart, false);
    element.addEventListener("touchend", dragEnd, false);
    element.addEventListener("touchmove", drag, false);
  
    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - offsetX;
        initialY = e.touches[0].clientY - offsetY;
      }
      active = true;
    }
  
    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      active = false;
    }
  
    function drag(e) {
      if (active) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        }
  
        offsetX = currentX;
        offsetY = currentY;
  
        setTranslate(currentX, currentY, element);
      }
    }
  
    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
  }
function createNameDivs(namesArray) {
    const namesContainer = document.getElementById('names');
    namesContainer.innerHTML = '';

    namesArray.forEach(name => {
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.textContent = name;
        nameDiv.setAttribute('draggable', true);
        namesContainer.appendChild(nameDiv);
    });
}
document.addEventListener('DOMContentLoaded', (event) => {
    let draggedItem = null;
    document.querySelectorAll('.name').forEach((nameElement) => {
        makeElementDraggable(nameElement);
      });
    createNameDivs(childrenList)
    function updateCount(zone) {
        const count = zone.querySelectorAll('.name').length; // Ensure to only select .name elements
        zone.querySelector('.count').textContent = `${count}`;
    }

    document.querySelectorAll('.name').forEach((item) => {
        item.addEventListener('dragstart', function (e) {
            draggedItem = this;
            setTimeout(() => this.style.display = 'none', 0);
        });

        item.addEventListener('dragend', function (e) {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });

    document.querySelectorAll('.transport').forEach((zone) => {
        zone.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        zone.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.classList.add('over');
        });

        zone.addEventListener('dragleave', function (e) {
            this.classList.remove('over');
        });

        zone.addEventListener('drop', function (e) {
            e.preventDefault();
            if (draggedItem) {
                this.classList.remove('over');
                const countElement = this.querySelector('.count');
                this.insertBefore(draggedItem, countElement.nextSibling); 
                updateCount(this);
            }
        });
    });

    document.querySelectorAll('.transport').forEach((zone) => {
        updateCount(zone);
    });
});
