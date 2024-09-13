window.onload = (event) => {
    const categoriesForm = document.getElementById('categoriesForm');

    categoriesForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const categoriaId = document.getElementById('id').value;
        const categoriaDescripcion = document.getElementById('descripcion').value;

        try {
            const response = await fetch('http://localhost:3000/createcategorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({categoriaId, categoriaDescripcion}),
            });
            const data = await response.json();
            if (response.ok) {
                window.alert('Categoría Creada Exitosamente.'); 
            } else {
                window.alert('Categoría No Fue Creada.');
            }
        } catch (error) {
            console.error(error);
            window.alert('Tenemos problemas técnicos.');
        }
    });
};