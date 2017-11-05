angular
    .module('portfolio')
    .controller('PhotosCtrl', PhotosCtrl);
GalleryCtrl.$inject = ['PortfolioService', '$stateParams', '$state'];

function PhotosCtrl(PortfolioService, $stateParams, $state) {

    var vm = this;
    vm.album = [];
    vm.pht = '';
    vm.modal = false;
    vm.currentImg = '';
    vm.currentKey = 0;
    function activate() {
        displayPhoto()
    }

    activate();
    function displayPhoto() {
        console.log('state', $stateParams);
        PortfolioService.getPhotos($stateParams.id)
            .then(function (data) {
                vm.album = data;
                console.log(data);
                vm.pht = vm.album.photos;
                console.log(vm.pht);
                return vm.album;
            });
    };

    vm.displayModal = function (key) {
        console.log("click: ", key);
        vm.currentImg = vm.pht[key];
        vm.currentKey = key;
        vm.modal = !vm.modal;
    };

    vm.nextImg = function() {
        var total = vm.pht.length;
        console.log(total);
        if (total > 0) {
            console.log(total, vm.currentKey);
            vm.currentKey = (vm.currentKey == total - 1) ? 0 : vm.currentKey + 1;
            vm.currentImg = vm.pht[vm.currentKey];
            console.log(total, vm.currentKey);
        }
   };
   vm.prevImg = function() {
    var total = vm.pht.length;
    console.log(total);
    if (total > 0) {
        console.log(total, vm.currentKey);
        vm.currentKey = (vm.currentKey == 0) ? total - 1 : vm.currentKey - 1;
        vm.currentImg = vm.pht[vm.currentKey];
        console.log(total, vm.currentKey);
    }
};
}