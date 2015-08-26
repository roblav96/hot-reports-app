// 

angular.module( 'myApp' )




.service( 'HeadersInterceptor', function ( $rootScope, $window, $store, $errz, $timeout ) {

	this.request = function ( config ) {
		config.headers[ 'x-id' ] = $rootScope.data.user.xid

		if ( $rootScope.data.user.uname ) {
			config.headers[ 'x-uname' ] = $rootScope.data.user.uname
		}

		return config
	}

} )




.factory( '$errz', function ( $injector ) {
	var dis = {}

	dis.$mdToast

	dis.toast = function ( _content ) {
		if ( !dis.$mdToast ) {
			dis.$mdToast = $injector.get( "$mdToast" )
		}
		dis.$mdToast.show( dis.$mdToast.simple().content( _content ) )
	}

	return dis
} )


.factory( '$help', function ( $mdDialog ) {
	var dis = {}

	dis.show = function ( _content ) {
		$mdDialog.show( {
			clickOutsideToClose: true,
			templateUrl: "./templates/help/" + _content + ".html",
			controller: function ( $scope, $mdDialog ) {
				$scope.closeHelp = function () {
					$mdDialog.hide()
				}
			}
		} )
	}

	return dis
} )



















//

