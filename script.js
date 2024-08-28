const imageArray = ['https://http2.mlstatic.com/D_NQ_NP_2X_808573-MCO77496085678_072024-F.webp', 'https://http2.mlstatic.com/D_NQ_NP_2X_735352-MCO77496135152_072024-F.webp', 'https://http2.mlstatic.com/D_NQ_NP_2X_800476-MCO77495803210_072024-F.webp', 'https://http2.mlstatic.com/D_NQ_NP_2X_629249-MCO77496085640_072024-F.webp', 'https://http2.mlstatic.com/D_NQ_NP_2X_991906-MCO77495793514_072024-F.webp'];

const arrayObjects = [
    {
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_808573-MCO77496085678_072024-F.webp',
        modelo: 'BMW',
        anio: '2020'
    },
    {
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_735352-MCO77496135152_072024-F.webp',
        modelo: 'MERCEDES',
        anio: '2021'
    },
    {
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_629249-MCO77496085640_072024-F.webp',
        modelo: 'AUDI',
        anio: '2022'
    },
];

const nextImage = () => {
    const image = document.getElementById('imgId');
    const model = document.getElementById('model');
    const anio = document.getElementById('anio');
    const index = arrayObjects.findIndex(x => x.imagen ===image.src);
    if (index < arrayObjects.length-1) {
        image.src = arrayObjects[index+1].imagen;
        model.textContent = arrayObjects[index+1].modelo;
        anio.textContent = arrayObjects[index+1].anio;
    } else {
        image.src = arrayObjects[0].imagen;
        model.textContent = arrayObjects[0].modelo;
        anio.textContent = arrayObjects[0].anio;
    }
};


const previewImage = () => {
    const image = document.getElementById('imgId');
    const index = imageArray.indexOf(image.src);
    if (index > 0) {
        image.src = imageArray[index-1];
    } else {
        image.src = imageArray[imageArray.length-1];
    }
};

/*formulario*/

/* Formulario */

window.addEventListener('load', () => {
    const form = document.getElementById('contactForm');
    form.addEventListener("submit",(event)=>{try {
        const name = document.getElementById('inputName').value;
        const lastName = document.getElementById('inputLastName').value;
        const email = document.getElementById('inputEmail').value;
        const message = document.getElementById('textMessage').value;
    
        if(name === '' || lastName === '' || email === '' || message == ""){
            alert('Por favor rellene los campos.');
        } else {
            const contactMessage = {
                name,
                lastName,
                email,
                message
            };
            console.log(contactMessage);
            alert('Su mensaje ha sido enviado con Exito.')
        }
    } catch (error) {
        console.error(error);
    }});});