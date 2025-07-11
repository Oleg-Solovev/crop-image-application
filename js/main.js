import Cropper from 'cropperjs';
$(document).ready()

// vars
let result = document.querySelector('.result'),
    img_result = document.querySelector('.img-result'),
    img_w = document.querySelector('.img-w'),
    img_h = document.querySelector('.img-h'),
    options = document.querySelector('.options'),
    save = document.querySelector('#btnRestore'),
    cropped = document.querySelector('.cropped'),
    dwn = document.querySelector('.download'),
    upload = document.querySelector('#file-input'),
    cropper = '';


// загрузка изображения
upload.addEventListener('change', e => {
    if (e.target.files.length) {
        // start file reader
        const reader = new FileReader();
        reader.onload = e => {
            if (e.target.result) {
                // create new image
                let img = document.createElement('img');
                img.id = 'image';
                img.src = e.target.result;
                // clean result before
                result.innerHTML = '';
                // append new image
                result.appendChild(img);
                // show save btn and options
                save.classList.remove('hide');
                options.classList.remove('hide');
                // init cropper
                cropper = new Cropper(img);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});


// Сохранение готового изображения
save.addEventListener('click', e => {
    e.preventDefault();


    let imgSrc = cropper.getCroppedCanvas({
        width: img_w.value // input value
    }).toDataURL();
    cropped.classList.remove('hide');
    img_result.classList.remove('hide');
    cropped.src = imgSrc;
    dwn.classList.remove('hide');
    dwn.download = 'imagename.png';
    dwn.setAttribute('href', imgSrc);
});