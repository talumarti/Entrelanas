window.onload = (event) => {
    const productsForm = document.getElementById('productsForm');

    productsForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const productoId = document.getElementById('id').value;
        const productoNombre = document.getElementById('nombre').value;
        const productoPrecio = document.getElementById('precio').value;
        const productoCategoria_id = document.getElementById('categoria_id').value;
        const productoObservacion = document.getElementById('observacion').value;
        const productoProveedor_id = document.getElementById('proveedor_id').value;

        try {
            const response = await fetch('http://localhost:3000/createproductos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({productoId, productoNombre, productoPrecio, productoCategoria_id, productoObservacion, productoProveedor_id}),
            });
            const data = await response.json();
            if (response.ok) {
                window.alert('producto Creado Exitosamente.'); 
            } else {
                window.alert('producto No Fue Creado.');
            }
        } catch (error) {
            console.error(error);
            window.alert('Tenemos problemas técnicos.');
        }
    });
};