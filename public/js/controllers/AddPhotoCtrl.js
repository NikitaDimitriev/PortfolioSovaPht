angular
	.module('portfolio')
    .controller('AddPhotoCtrl', AddPhotoCtrl);
AddPhotoCtrl.$inject = ['AdminService', '$state', '$stateParams'];

function AddPhotoCtrl(AdminService, $state, $stateParams) {

	var vm = this;
	vm.upload = uploadImg;
    console.log('$stateParams', $stateParams.id);
    vm.id = $stateParams.id;

    activate();

    function activate() {
        getCurrentAlbum();
    }

    function getCurrentAlbum() {
        return AdminService.currentAlbum(vm.id);
    }

	

   function uploadImg() {
        var file = vm.photos;
        var id = vm.id;
 		AdminService.postPhotos(file, id)
        .then(function(data) {
                    console.log('test2', file);
                    $state.go('admin');
        });
       
    }
}