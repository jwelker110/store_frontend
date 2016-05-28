(function(){
  "use strict";

  angular.module('frontend')
      .directive('fileInput', FileInput);

  FileInput.$inject = [];

  function FileInput(){
    /**
     * This directive assigns the file to the controller on
     * the var it is passed
     */
    return {
      restrict: 'A',
      scope: {
        itemFile: '=fileInput'
      },
      link: function(scope, elm){
        elm.bind('change', function(){
          scope.$apply(function(){
            scope.itemFile = elm[0].files[0];
          });
        });
      }
    };
  }

})();