 angular
    .module('portfolio')
    .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            console.log('ITS WORK');
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    if (element[0].files.length > 1) {
                        modelSetter(scope, element[0].files);
                    }
                    else {
                        modelSetter(scope, element[0].files[0]);
                    }
                });
            });
        }
    };
}]);