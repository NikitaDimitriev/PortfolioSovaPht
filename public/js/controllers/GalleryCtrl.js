angular
	.module('portfolio')
    .controller('GalleryCtrl', GalleryCtrl);
GalleryCtrl.$inject = ['PortfolioService', '$state'];

function GalleryCtrl(PortfolioService, $state) {
    var vm = this;

    vm.albums = [];
    
    activate();

    function activate() {
        displayAlbums();
    }

    function displayAlbums() {
        PortfolioService.getAlbums()
            .then(function(data) {
                vm.albums = data.reverse();
                console.log('data', data);
                return vm.albums;
            });
    }
    
}