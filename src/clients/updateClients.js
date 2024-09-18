window.onload = async (event) => {
    const idClient = getQueryParams('id');
    console.log(idClient)
    const client = await loadClient(idClient);
    const id = document.getElementById('id');
    const names = document.getElementById('nombres');
    const surnames = document.getElementById('apellidos');
    const address = document.getElementById('direccion');
    const phone = document.getElementById('telefono');
    const email = document.getElementById('email');

    id.value = client.cliente_id;
    names.value = client.Nombres;
    surnames.value = client.clienteApellidos;
    address.value = client.clienteDireccion;
    phone.value = client.clienteTelefono;
    email.value = client.clienteEmail;

    clientsForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        await updateClient(id.value, names.value, surnames.value, address.value, phone.value, email.value);
    });

};
function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

async function loadClient(id) {
    try {
        const response = await fetch(`https://entrelanas-be.vercel.app/list/clientes/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const clients = await response.json();
        return clients[0];
    } catch (error) {
        console.error(error);
    }
};

async function updateClient(id, clienteNombres, clienteApellidos, clienteDireccion, clienteTelefono, clienteEmail) {
    try {
        const response = await fetch(`https://entrelanas-be.vercel.app/updateClientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({clienteNombres, clienteApellidos, clienteDireccion, clienteTelefono, clienteEmail}),
        });
        const data = await response.json();
            if (response.ok) {
                window.alert('Cliente Actualizado Exitosamente.'); 
            } else {
                window.alert('Cliente No Fue Actualizado.');
            }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};