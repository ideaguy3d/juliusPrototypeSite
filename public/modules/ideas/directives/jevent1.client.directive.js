'use strict';

//var mytemplate = "<div class=\'well\'>\n    <div class=\"container\">\n        <h1>We are in myevent html template html js string var mayne!!</h1>\n        <img src=\"/modules/core/img/info1.jpg\" alt=\"infographic\" class=\'center-block\'/>\n        <ul>\n            <li>This</li>\n            <li>is</li>\n            <li>Cool!!</li>\n        </ul>\n    </div>\n</div>\n<script>\n    $(\'li\').hover(function () {\n        $(this).hide();\n    });\n</script>";
//var mytemplate2 = "mytemplate2 variable mayne";
angular.module('ideas').directive('jeventDir', [
	function() {
		return {
			templateUrl: '/modules/ideas/directives/templates/dirTemp-myevent1.html', //rem. we can pass a function(elem, attr){} to the templateUrl prop option
			restrict: 'E',
			transclude: true,
            scope: {
                info: '=',
                close: '&onClose'
            }
			//link: function postLink(scope, element, attrs) {
			//	// Jevent directive logic
			//	// ...
            //
			//	element.text('this is the jevent directive');
			//}
		};
	}
]);
