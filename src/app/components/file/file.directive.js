(function(){
  "use strict";

  angular.module('frontend')
      .directive('fileInput', FileInput);

  FileInput.$inject = ['$parse'];

  function FileInput($parse){
    return {
      restrict: 'A',
      link: function(scope, elm, attrs){
        var model = $parse(attrs.fileInput);
        var modelSetter = model.assign;
        elm.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope.createCtrl, elm[0].files[0]);
          })
        })
      }
    };
  }

})();