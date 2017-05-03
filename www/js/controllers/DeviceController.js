(function(){
  angular.module('starter')
  .controller('DeviceController', ['$scope', '$state', '$stateParams', 'DeviceFactory', DeviceController]);

  function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  function DeviceController($scope, $state, $stateParams, DeviceFactory){

    var device = this;

    var service_id = 'FFE0';
    var characteristic_id = 'FFE1';

    device.light = {code: ''}

    $scope.init = function(){
      $scope.device = DeviceFactory.getDevice($stateParams.id);
    }

    $scope.attend = function(){
      alert(JSON.stringify(device.light.code));
      ble.write(
        $stateParams.id,
        service_id,
        characteristic_id,
        //btoa(JSON.stringify(me.attendee)),
        stringToBytes(device.light.code),
        function(response){
          if(response == 'OK'){
            alert("Your attendance is recorded!");
            ble.disconnect($stateParams.id);
            $state.go('home');
          }
          else{
            alert(bytesToString(response));
          }
        },
        function(err){
          alert(err);
        }
      );
    }

    $scope.backToHome = function(){
      $state.go('home');
      ble.disconnect($stateParams.id);
    }

  }

})();
