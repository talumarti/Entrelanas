window.onload = (event) => {
    console.log('estoy cargado');
    //const encodeData = window.location.hash.substring(1);
    //const data = JSON.parse(atob(encodeData));
    //console.log(data);
    const createClients = document.getElementById('createClients');
    createClients.addEventListener('click', function(event){
        console.log('Hice click');
        window.location.href = './createClients.html';
        });
    loadClients();
};

async function loadClients() {
    try {
        console.log('voy a cargar clientes')
        const response = await fetch('https://entrelanas-be.vercel.app/list/clientes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const clients = await response.json();
        console.log(clients);

        const tableBody = document.getElementById('clientsTBody');
        tableBody.innerHTML = '';

        clients.forEach(client => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = client.cliente_id;

            const nameCell = document.createElement('td');
            nameCell.textContent = client.nombres;

            const surnameCell = document.createElement('td');
            surnameCell.textContent = client.apellidos;

            const addressCell = document.createElement('td');
            addressCell.textContent = client.direccion;

            const phoneCell = document.createElement('td');
            phoneCell.textContent = client.telefono;

            const emailCell = document.createElement('td');
            emailCell.textContent = client.email;

            const actionCell = document.createElement('td');

            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modificar';
            modifyButton.className = 'modify_button';
            modifyButton.onclick = () => modifyCategory(client.cliente_id);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete_button';
            deleteButton.onclick = () => deleteClient(client.cliente_id);

            actionCell.appendChild(modifyButton);
            actionCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(surnameCell);
            row.appendChild(addressCell);
            row.appendChild(phoneCell);
            row.appendChild(emailCell);

            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
}

async function deleteClient(id) {
    try {
        const response = await fetch(`https://entrelanas-be.vercel.app/deleteClientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (response.ok) {
            window.alert('Cliente Eliminado Exitosamente.');
            location.reload(); 
        } else {
            window.alert('Cliente No Fue Eliminado.');
        }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};

function modifyCategory (id) {
    window.location.href = `updateClients.html?id=${id}`;
}
