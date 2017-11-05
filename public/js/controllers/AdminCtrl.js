angular
	.module('portfolio')
    .controller('AdminCtrl', AdminCtrl);
AdminCtrl.$inject = ['AdminService', '$state'];


function AdminCtrl(AdminService, $state) {
    console.log('here: in serv');
    var vm = this;
    vm.upload = upload;
    vm.newAlbum = {
        title: '',
        category: '',
        discription: '',
    };
    vm.categories = [
        {name: "Портретная съёмка", id: 0},
        {name: "Семейная съёмка", id: 1},
        {name: "Love-story", id: 2},
        {name: "Архитектурная съёмка", id: 3}
    ]
    vm.id = "id";

   function upload() {
        console.log('upload');
        var image = vm.image;
        console.log('file is ', image);
        console.log(vm.newAlbum);
        AdminService.uploadImg(vm.newAlbum, image)
        .then(function(data) {
                    console.log('test2', data._id);
                    vm.id = data._id;
                    $state.go('addPhoto', {id: vm.id});
        });
       
    }
};