(function(){
  "use strict";

  angular.module('frontend')
      .directive('fileInput', FileInput);

  FileInput.$inject = [];

  function FileInput(){
    return {
      restrict: 'A',
      scope: {
        itemFile: '=fileInput'
      },
      link: function(scope, elm, attrs){
        elm.bind('change', function(){
          scope.$apply(function(){
            scope.itemFile = elm[0].files[0];
          });
        });
      }
    };
  }

})();