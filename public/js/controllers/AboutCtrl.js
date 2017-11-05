angular
    .module('portfolio')
    .controller('AboutCtrl', AboutCtrl);
MainCtrl.$inject = ['PortfolioService', '$state', '$scope'];

function AboutCtrl(PortfolioService, $state, $scope) {

    activate();

    function activate() {

    }
}