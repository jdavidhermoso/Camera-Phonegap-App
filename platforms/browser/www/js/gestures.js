var app = {
    color: {
        light: 'light',
        dark: 'dark'
    },
    init: function () {
        'use strict';
        var lightButton = document.querySelector('#light'),
            darkButton = document.querySelector('#dark');

        app.initFastClick();
        app.initHammer();

        lightButton.addEventListener('click', this.toggleColor, false);
        darkButton.addEventListener('click', this.toggleColor, false);
    },

    toggleColor: function (ev) {
        var button = ev.target,
            color = button.dataset.color;

        document.body.className = color;
    },

    initHammer: function () {
        var zone = document.getElementById('gestures-zone'),
            hammerTime = new Hammer(zone);

        hammerTime.get('pinch').set({enable: true});
        hammerTime.get('rotate').set({enable: true});

        zone.addEventListener('webkitAnimationEnd', function(e) {
            zone.className = '';
        });

        hammerTime.on('tap', function () {
            zone.classList.add('tap');
        });

        hammerTime.on('doubletap', function () {
            zone.classList.add('doubletap');
        });

        hammerTime.on('swipe', function(ev) {
            var swipeClass,
                direction = ev.direction;

            if (direction === 4) {
                swipeClass = 'swipe-right';
            }

            if (direction === 2) {
                swipeClass = 'swipe-left';
            }

            zone.className = swipeClass;

        });

        hammerTime.on('rotate', function (ev) {
            var grades = 25;
            if (ev.distance > grades) {
                zone.classList.add('rotate');
            }

        });

        hammerTime.on('press', function () {
            zone.classList.add('press');
        });
    },

    initFastClick: function () {
        FastClick.attach(document.body);
    }
};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        app.init();
    });
}