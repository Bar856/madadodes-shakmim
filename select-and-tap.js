
document.addEventListener('DOMContentLoaded', () => {
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

    createNameDivs(childrenList);
    setupSelectAndTap();
});

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

function setupSelectAndTap() {
    let selectedName = null;
    const names = document.querySelectorAll('.name');
    const transports = document.querySelectorAll('.transport');

    names.forEach(name => {
        name.addEventListener('click', () => {
            if (selectedName) {
                selectedName.classList.remove('selected'); 
            }
            selectedName = name;
            selectedName.classList.add('selected'); 
            disableOtherNames(names, name);
        });
    });

    transports.forEach(transport => {
        transport.addEventListener('click', () => {
            if (selectedName) {
                transport.appendChild(selectedName); 
                updateCount(transport);
                enableAllNames(names);
                selectedName.classList.remove('selected');
                selectedName = null; 
            }
        });
    });
}

function disableOtherNames(names, selected) {
    names.forEach(name => {
        if (name !== selected) {
            name.classList.add('disabled'); 
        }
    });
}

function enableAllNames(names) {
    names.forEach(name => {
        name.classList.remove('disabled', 'selected'); 
    });
}

function updateCount(transport) {
    const count = transport.querySelectorAll('.name').length;
    const countElement = transport.querySelector('.count');
    countElement.textContent = `${count}`; 
}
