const childrenList = [
    'אמל אבו רביע',
    'עומר אברמוב',
    'שאם אלקרינאו',
    'ליבי אפשטיין',
    'רניה ארמילאת',
    'עבאלל אשתיוי',
    'יהלי בונני',
    'סהר בן חיים',
    'בנימין תאיר',
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
    'אדם פיליאבסק',
    'איתן ראובן',
    'אדל שלם',
    'מיאל שמוטקין'
];
function createNameDivs(namesArray) {
    const namesContainer = document.getElementById('names');
    namesContainer.innerHTML = ''; // Clear existing names if any

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
    createNameDivs(childrenList)
    // Function to update the count of children for each transport method
    function updateCount(zone) {
        const count = zone.querySelectorAll('.name').length; // Ensure to only select .name elements
        zone.querySelector('.count').textContent = `${count}`;
    }

    // Add event listeners for drag and drop functionality to each name
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

    // Add event listeners for the transport method containers
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
                // Append the dragged item after the count element
                const countElement = this.querySelector('.count');
                this.insertBefore(draggedItem, countElement.nextSibling); // Insert after count
                updateCount(this); // Update the count
            }
        });
    });

    // Initialize the count display for each transport method
    document.querySelectorAll('.transport').forEach((zone) => {
        updateCount(zone); // This will set the initial count
    });
});
