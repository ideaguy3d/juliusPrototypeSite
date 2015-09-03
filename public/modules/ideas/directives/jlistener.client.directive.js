'use strict';

/*this file is used for the draggable object */
angular.module('ideas').directive('jlistenerDrag', ['$document',
    function ($document) {
        return {
            link: function postLink(scope, element, attrs) {
                var startX = 0, startY = 0, x = 0, y = 0;
                element.css({
                    position: 'relative',
                    border: '2px solid deepskyblue',
                    backgroundColor: 'blue',
                    cursor: 'move'
                });

                element.on('mousedown', function (event) {
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    console.log(event.pageX + " = pageX, pageY =" + event.pageY);
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    console.log(event.pageX + " = pageX, pageY =" + event.pageY);
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }

                element.text('DRAG ME');
            }
        };
    }
]);
