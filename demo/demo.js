angular.module('demo', ['solutioncenter.feedback'])
    .controller('DemoController', [
      function () {
        var vm = this;

        vm.module = {
          name: 'Solution Center'
        };
      }
    ]);
