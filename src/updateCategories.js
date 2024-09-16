window.onload = async (event) => {
    const idCategory = getQueryParams('id');
    console.log(idCategory)
    const category = await loadCategory(idCategory);
    const id = document.getElementById('id');
    const description = document.getElementById('descripcion');

    id.value = category.categoria_id;
    description.value = category.descripcion;

    categoriesForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        await updateCategory(id.value, description.value);
    });

};
function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

async function loadCategory(id) {
    try {
        const response = await fetch(`http://localhost:3000/list/categorias/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const categories = await response.json();
        return categories[0];
    } catch (error) {
        console.error(error);
    }
};

async function updateCategory(id, categoriaDescripcion) {
    try {
        const response = await fetch(`http://localhost:3000/updatecategorias/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({categoriaDescripcion}),
        });
        const data = await response.json();
            if (response.ok) {
                window.alert('Categoría Actualizada Exitosamente.'); 
            } else {
                window.alert('Categoría No Fue Actualizada.');
            }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};