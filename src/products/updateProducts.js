window.onload = async (event) => {
    const idProduct = getQueryParams('id');
    console.log(idProduct)
    const product = await loadproduct(idProduct);
    const id = document.getElementById('id');
    const name = document.getElementById('nombre');
    const price = document.getElementById('precio');
    const category_id = document.getElementById('categoria_id');
    const observation= document.getElementById('observacion');
    const supplier = document.getElementById('proveedor_id');
    const productsForm = document.getElementById('productsForm');

    id.value = product.producto_id;
    name.value = product.nombre;
    price.value = product.precio;
    category_id.value = product.categoria_id;
    observation.value = product.observacion;
    supplier.value = product.proveedor_id;

    productsForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        await updateproduct(id.value, name.value, price.value, category_id.value, observation.value, supplier.value);
    });
};
function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

async function loadproduct(id) {
    try {
        const response = await fetch(`https://entrelanas-be.vercel.app/list/productos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const products = await response.json();
        return products[0];
    } catch (error) {
        console.error(error);
    }
};

async function updateproduct(id, productoNombre, productoPrecio,  productoCategoria_id, productoObservacion, productoProveedor) {
    try {
        const response = await fetch(`https://entrelanas-be.vercel.app/updateproductos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productoNombre, productoPrecio,  productoCategoria_id, productoObservacion, productoProveedor}),
        });
        const data = await response.json();
            if (response.ok) {
                window.alert('producto Actualizado Exitosamente.'); 
            } else {
                window.alert('producto No Fue Actualizado.');
            }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};