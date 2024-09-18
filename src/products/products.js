window.onload = (event) => {
    console.log('estoy cargado');
    //const encodeData = window.location.hash.substring(1);
    //const data = JSON.parse(atob(encodeData));
    //console.log(data);
    const createproducts = document.getElementById('createProducts');
    createproducts.addEventListener('click', function (event) {
            console.log('Hice click');
            window.location.href = './createproducts.html';
        });
    loadproducts();
};

async function loadproducts() {
    try {
        console.log('voy a cargar productos')
        const response = await fetch('https://entrelanas-be.vercel.app/list/productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const products = await response.json();
        console.log(products);

        const tableBody = document.getElementById('ProductsTBody');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = product.producto_id;

            const nameCell = document.createElement('td');
            nameCell.textContent = product.nombre;

            const priceCell = document.createElement('td');
            priceCell.textContent = product.precio;

            const category_idCell = document.createElement('td');
            category_idCell.textContent = product.categoria_id;

            const observationCell = document.createElement('td');
            observationCell.textContent = product.observacion;

            const supplierCell = document.createElement('td');
            supplierCell.textContent = product.proveedor_id;

            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modificar';
            modifyButton.className = 'modify_button';
            modifyButton.onclick = () => modifyProduct(product.producto_id);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete_button';
            deleteButton.onclick = () => deleteProduct(product.producto_id);

            const actionCell = document.createElement('td');

            actionCell.appendChild(modifyButton);
            actionCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(category_idCell);
            row.appendChild(observationCell);
            row.appendChild(supplierCell);

            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });


    } catch (error) {
        console.error(error);
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`https://entrelanas-be.vercel.app/deleteproductos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (response.ok) {
            window.alert('Producto Eliminado Exitosamente.');
            location.reload(); 
        } else {
            window.alert('Producto No Fue Eliminado.');
        }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};

function modifyProduct (id) {
    window.location.href = `updateproducts.html?id=${id}`;
}
