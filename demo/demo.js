angular.module('demo', ['solutionCenter.feedback'])
    .controller('demoController', [
      function () {
        var vm = this;

        vm.module = {
          name: 'Solution Center'
        };
      }
    ]);
