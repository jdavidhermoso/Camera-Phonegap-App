(function () {
    'use strict';
    var init = function () {
            initButtons();
        },

        initButtons = function () {
            var cameraBtn = document.querySelector('#button-action');
            cameraBtn.addEventListener('click', function() {
                loadPicture(Camera.PictureSourceType.CAMERA);
            });

            var galleryBtn = document.querySelector('#button-gallery');
            galleryBtn.addEventListener('click', function() {
                loadPicture(Camera.PictureSourceType.PHOTOLIBRARY);
            });

            var filterButtons = document.querySelectorAll('.button-filter');

            for (var i = 0, z = filterButtons.length; i < z; i++) {
                filterButtons[i].addEventListener('click', function (ev) {
                    var filter = ev.target.dataset.effect;
                    applyFilter(filter);
                });
            }
        },

        loadPicture = function (sourceType) {
            var opt = {
                Direction: 0,
                quality: 50,
                sourceType: sourceType,
                destinationType: Camera.DestinationType.FILE_URI,
                targetWidth: 300,
                targetHeight: 300,
                correctOrientation: true
            };

            navigator.camera.getPicture(shotHandler, errorHandler, opt);
        },

        takePicture = function () {

        },

        shotHandler = function (imgURI) {
            var img = document.createElement('img');

            img.onload = function () {
                paintPicture(img);
            };

            img.src = imgURI;

        },

        errorHandler = function (msg) {
            console.log('User cancelled shot or there was an issue: ' + msg);
        },

        paintPicture = function (img) {
            var canvas = document.querySelector('#pic'),
                context = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
        },

        applyFilter = function (filter) {
            var canvas = document.querySelector('#pic');
            var context = canvas.getContext('2d');
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            effects[filter](imageData.data);

            context.putImageData(imageData, 0, 0);

        };

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            init();
        }, false);
    }
})();

