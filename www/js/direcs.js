//

angular.module( 'myApp' )



/*==========  sidebar link  ==========*/

.directive( 'sidebarLink', function () {
	return {
		restrict: 'E',

		link: function ( scope, elem, attrs ) {
			if ( scope.info.state === scope.nowState ) {
				elem.children().addClass( 'sidenavactive' )
			}
		},

		controller: function ( $scope, $state, $element ) {
			$scope.nowState = $state.current.name

			$scope.$on( '$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
				$scope.nowState = toState.name
				if ( $scope.info.state === $scope.nowState ) {
					$element.children().addClass( 'sidenavactive' )
				} else {
					$element.children().removeClass( 'sidenavactive' )
				}
			} );

			$scope.click = function () {
				$scope.href( $scope.info.state )
			}

		},

		templateUrl: "./templates/sidebar.link.html"
	}
} )










.directive( 'unameBtn', function () {
	return {
		restrict: 'E',

		link: function ( scope, elem, attrs ) {
			scope.unameSelf = elem
			scope.toShow()
		},

		controller: function ( $scope ) {

			$scope.toShow = function () {

				// console.log( "obj" );

				if ( !$scope.unameSelf ) {
					return
				}

				if ( $scope.data.user.uname ) {
					$scope.unameSelf.removeClass( 'hide' )
				} else {
					$scope.unameSelf.addClass( 'hide' )
				}
			}

			$scope.logout = function () {
				$scope.data.user.authed = null
				$scope.data.user.uname = null
				$scope.data.user.type = null
				localStorage.clear()
				
				$scope.href( 'public.login' )
			}

			$scope.hreftoacct = function () {
				if ( $scope.data.user.type == "newb" ) {
					$scope.href( "newb.acct" )
				} else {
					$scope.href( "user.acct" )
				}
			}

			$scope.$on( '$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
				$scope.toShow()
			} );

		},

		templateUrl: "./templates/toolbar.uname.html"
	}
} )














/*==========  toolbar help  ==========*/

.directive( 'toolbarHelp', function () {
	return {
		restrict: 'E',

		link: function ( scope, elem, attrs ) {
			scope.helpSelf = elem
			scope.toShow()
		},

		controller: function ( $scope, $state, $help ) {
			$scope.helpData = []
			$scope.helpData[ 'public.register' ] = true
			$scope.helpData[ 'public.login' ] = true

			$scope.toShow = function () {
				if ( !$scope.helpSelf ) {
					return
				}

				if ( $scope.helpData[ $state.current.name ] ) {
					$scope.helpSelf.removeClass( 'hide' )
				} else {
					$scope.helpSelf.addClass( 'hide' )
				}
			}

			$scope.$on( '$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
				$scope.toShow()

			} );


			$scope.show = function () {
				// $mdDialog.show( {
				// 	clickOutsideToClose: true,
				// 	templateUrl: "./templates/help/" + $state.current.name + ".html",
				// 	controller: function ( $scope, $mdDialog ) {
				// 		$scope.closeHelp = function () {
				// 			$mdDialog.hide();
				// 		}
				// 	}
				// } );

				$help.show( $state.current.name )


			}

		},

		templateUrl: "./templates/toolbar.help.html"
	}
} )



/*==========  toolbar state  ==========*/

.directive( 'toolbarState', function () {
	return {
		restrict: 'A',
		scope: {},

		link: function ( scope, elem, attrs ) {
			scope.itself = elem
			scope.changeStateName()
		},

		controller: function ( $scope, $state ) {
			$scope.changeStateName = function () {
				$scope.itself.text( $state.current.data.stateToolName )
			}

			$scope.$on( '$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
				$scope.changeStateName()
			} );
		}

	}
} )





/*==========  input change  ==========*/

.directive( 'inputChange', function () {
	return {
		restrict: 'A',
		link: function ( scope, elem, attrs ) {
			// trim off the 'd.' part of the scope
			scope.thiz = attrs.ngModel.substring( 2, attrs.ngModel.length )
		},

		controller: function ( $scope ) {

			$scope.inpChange = function ( arr ) {
				if ( !$scope.d[ $scope.thiz ] ) {
					// log( "return" )
					return
				}

				var funcs = []
				funcs[ 'alphanum' ] = function () {
					$scope.d[ $scope.thiz ] = $scope.d[ $scope.thiz ].replace( /[^a-zA-Z0-9_-]/g, '' )
				}
				funcs[ 'spaces' ] = function () {
					$scope.d[ $scope.thiz ] = $scope.d[ $scope.thiz ].replace( / /g, "" )
				}
				funcs[ 'lower' ] = function () {
					$scope.d[ $scope.thiz ] = $scope.d[ $scope.thiz ].toLowerCase()
				}
				funcs[ 'upper' ] = function () {
					$scope.d[ $scope.thiz ] = $scope.d[ $scope.thiz ].toUpperCase()
				}

				for ( var i = 0; i < arr.length; i++ ) {
					funcs[ arr[ i ] ]()
				};
			}
		}

	}
} )



/*==========  focus me  ==========*/

.directive( 'focusMe', function () {
	return {
		restrict: 'A',
		link: function ( scope, elem, attrs ) {
			scope.focusMe = elem
				// elem.find( 'input' )[ 0 ].focus()
		}
	}
} )









/*==========  user register  ==========*/

.directive( 'userRegister', function () {
	return {
		restrict: 'E',
		link: function ( scope, elem, attrs ) {
			scope.focusMe = elem
				// elem.find( 'input' )[ 0 ].focus()
		}
	}
} )










































































/*==========  dev directive  ==========*/

.directive( 'dev', function () {
	return {
		restrict: 'AE',
		link: function ( scope, elem, attrs ) {
			log( "link" )
		},

		controller: function ( $scope ) {
			log( 'controller' )
		}

	}
} )
















































//

