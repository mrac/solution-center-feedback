import IRootScopeService = angular.IRootScopeService;
import ICompileService = angular.ICompileService;

export class ComponentTest<TController> {
  private $rootScope: ng.IScope;
  private $compile: ng.ICompileService;
  public $scope: ng.IScope;
  public element: ng.IAugmentedJQuery;

  constructor(private template: string, private registerName: string) {
    angular.mock.inject(($rootScope: IRootScopeService, $compile: ICompileService) => {
      this.$rootScope = $rootScope;
      this.$compile = $compile;
    });
  }

  public createComponent(attributes: any): TController {
    this.$scope = this.$rootScope.$new();
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        this.$scope[key] = attributes[key];
      }
    }
    this.element = this.$compile(this.template)(this.$scope);
    this.$scope.$digest();
    return this.element.controller(this.registerName);
  }
}
