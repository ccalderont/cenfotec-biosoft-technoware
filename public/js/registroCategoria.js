if (localStorage.getItem('tipoUsuario') !== 'admin'){
    window.location.href = '/';
}

//Funcion para el modal
function showModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}


function closeModal(event){
    if (event.target.id === "modal") {
        location.reload();
    }
}

async function loadCategories(){
    let categoriesContainer = document.getElementById('categories-list');
    categoriesContainer.innerHTML = '';
    const categories = await getCategories();
    categories.forEach(category => {
        let categoryElement = document.createElement('section');
        categoryElement.classList.add('individual-category');
        categoryElement.innerHTML = `
            <input type="checkbox" ${category.activo ? 'checked' : ''}>
            <label>${category.nombre}</label>
        `;
        categoriesContainer.appendChild(categoryElement);
    });
}

async function getCategories(){
    const result = await fetch('/admin/getAllCategorias',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await result.json();
    return data;
}

function addNewCategoryField(){
    let categoriesContainer = document.getElementById('categories-list');
    let newCategoryField = document.createElement('section');
    newCategoryField.classList.add('add-category-section');
    newCategoryField.innerHTML = `
        <input type="text" id="new-category" name="new-category" placeholder="Nueva categoría">
        <button onclick="addNewCategory()"><i class="fa-solid fa-plus"></i></button>
    `;
    categoriesContainer.appendChild(newCategoryField);
}

function onSubmit(event){
    event.preventDefault();
}

async function loadPage(){
    await loadCategories();
    addNewCategoryField();
}

function addNewCategory(){
    let newCategoryInput = document.getElementById('new-category');
    let newCategory = newCategoryInput.value;
    if (newCategory === '') {
        return;
    }
    let list = document.getElementById('categories-list');
    let parentContainer = newCategoryInput.parentElement;
    let newCategoryField = document.createElement('section');
    newCategoryField.classList.add('individual-category');
    newCategoryField.innerHTML = `
        <input type="checkbox" checked>
        <label>${newCategory}</label>
    `;
    list.insertBefore(newCategoryField, parentContainer);
    newCategoryInput.value = '';
}

async function saveChanges(){
    const changes = getFormChanges();
    const result = await fetch('/admin/saveCategories',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({changes: changes})
    });

    const data = await result.text();
    if (data === 'Changes saved') {
        showModal();
    } else {
        alert('Error al guardar los cambios');
    }
}

function getFormChanges(){
    let categories = document.querySelectorAll('.individual-category');
    let changes = [];
    categories.forEach(category => {
        let checkbox = category.querySelector('input[type="checkbox"]');
        let categoryName = category.querySelector('label').innerText;
        let categoryData = {
            nombre: categoryName,
            activo: checkbox.checked
        };
        changes.push(categoryData);
    });
    return changes;
}

loadPage();