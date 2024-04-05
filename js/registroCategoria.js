

//Funcion para el modal
function showModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}


function closeModal(event){
    if (event.target.id === "modal") {
        let modal = document.getElementById('modal');
        // If it was, hide the modal
        modal.style.display = 'none';
    }
}

function loadCategories(){
    let categoriesContainer = document.getElementById('categories-list');
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        let categoryElement = document.createElement('section');
        categoryElement.classList.add('individual-category');
        categoryElement.innerHTML = `
            <input type="checkbox" id="category-${category.id}" name="category-${category.id}" ${category.active ? 'checked' : ''}>
            <label for="category-${category.id}">${category.name}</label>
        `;
        categoriesContainer.appendChild(categoryElement);
    });
}

function addNewCategoryField(){
    let categoriesContainer = document.getElementById('categories-list');
    let newCategoryField = document.createElement('section');
    newCategoryField.classList.add('individual-category');
    newCategoryField.innerHTML = `
        <input type="text" id="new-category" name="new-category" placeholder="Nueva categoría">
        <button onclick="addNewCategory()"><i class="fa-solid fa-plus"></i></button>
    `;
    categoriesContainer.appendChild(newCategoryField);
}

function onSubmit(event){
    event.preventDefault();
}



const categories = [
    {
        id:1,
        name: 'Frutas',
        active: true
    },
    {
        id:2,
        name: 'Verduras',
        active: true
    },
    {
        id:3,
        name: 'Carnes',
        active: true
    },
    {
        id:4,
        name: 'Lacteos',
        active: true
    },
    {
        id:5,
        name: 'Panaderia',
        active: true
    },
    {
        id:6,
        name: 'Bebidas',
        active: true
    },
    {
        id:7,
        name: 'Dulces',
        active: true
    },
    {
        id:8,
        name: 'Aseo',
        active: true
    },
    {
        id:9,
        name: 'Cuidado Personal',
        active: true
    },
    {
        id:10,
        name: 'Otros',
        active: true
    }
]

loadCategories();
addNewCategoryField();