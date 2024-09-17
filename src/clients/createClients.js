window.onload = (event) => {
    const clientsForm = document.getElementById('clientsForm');

    clientsForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const clienteId = document.getElementById('id').value;
        const clienteNombres = document.getElementById('nombres').value;
        const clienteApellidos = document.getElementById('apellidos').value;
        const clienteDireccion = document.getElementById('direccion').value;
        const clienteTelefono = document.getElementById('telefono').value;
        const clienteEmail = document.getElementById('email').value;

        try {
            const response = await fetch('http://localhost:3000/createClientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({clienteId, clienteNombres, clienteApellidos, clienteDireccion, clienteTelefono, clienteEmail}),
            });
            const data = await response.json();
            if (response.ok) {
                window.alert('Cliente Creado Exitosamente.'); 
                document.getElementById('id').value="";
                document.getElementById('nombres').value="";
                document.getElementById('apellidos').value="";
                document.getElementById('direccion').value="";
                document.getElementById('telefono').value="";
                document.getElementById('email').value="";

            } else {
                window.alert('Cliente No Fue Creado.');
            }
        } catch (error) {
            console.error(error);
            window.alert('Tenemos problemas técnicos.');
        }
    });
};