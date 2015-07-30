// 

angular.module( 'myApp' )

.service( 'HeadersInterceptor', function ( $q, $rootScope, $window, $store, $errz, $timeout ) {

	// this timeout stuff is so the keys and such cant be toyed with during startup
	var timedOut = true
	$timeout( function () {
		timedOut = null
	}, 500 )

	var token = $store.get( "token" ) || null
	var pubKey = $store.get( "pubKey" ) || null
	var mypubKey = $store.get( "mypubKey" ) || null
	var myprivKey = $store.get( "myprivKey" ) || null


	if ( token ) {
		$store.remove( "token" )
	}

	if ( pubKey ) {
		pubKey = forge.pki.publicKeyFromPem( forge.util.decode64( pubKey ) )
		$store.remove( "pubKey" )
	}

	if ( token && pubKey ) {
		$rootScope.data.user.remember = true
		$rootScope.data.user.authed = true
	}

	if ( mypubKey && myprivKey ) {
		mypubKey = forge.pki.publicKeyFromPem( forge.util.decode64( mypubKey ) )
		myprivKey = forge.pki.privateKeyFromPem( forge.util.decode64( myprivKey ) )
		$store.remove( "mypubKey" )
		$store.remove( "myprivKey" )
	} else {
		var keys = forge.pki.rsa.generateKeyPair( 1024 )
		mypubKey = keys.publicKey
		myprivKey = keys.privateKey
	}


	$rootScope.$on( '$stateChangeStart', function ( event, next, current ) {
		timedOut = true
		$timeout( function () {
			timedOut = null
		}, 500 )
	} );


	$window.onunload = function ( e ) {
		mypubKey = forge.util.encode64( forge.pki.publicKeyToPem( mypubKey ) )
		$store.set( "mypubKey", mypubKey )
		myprivKey = forge.util.encode64( forge.pki.privateKeyToPem( myprivKey ) )
		$store.set( "myprivKey", myprivKey )

		if ( $rootScope.data.user.remember == true ) {
			if ( token ) {
				$store.set( "token", token )
			}

			if ( pubKey ) {
				pubKey = forge.util.encode64( forge.pki.publicKeyToPem( pubKey ) )
				$store.set( "pubKey", pubKey )
			}
		}
	}



	this.request = function ( config ) {
		config.headers[ 'x-id' ] = $rootScope.data.user.id

		if ( timedOut ) {
			return config
		}

		if ( config.method == "POST" && config.url == "private" ) {
			log( token )
			log( pubKey )
			log( mypubKey )
			log( myprivKey )
				// token = null
				// pubKey = null
				// mypubKey = null
				// myprivKey = null
			return $q.reject( config )
		}


		if ( config.method == "POST" && config.url == g_ip + "public/captcha" ) {
			config.data.data.publicKey = forge.util.encode64( forge.pki.publicKeyToPem( mypubKey ) )
		}

		if ( config.method == "POST" && config.url == g_ip + "public/register" ) {
			try {
				config.data.data.email = forge.util.encode64( pubKey.encrypt( config.data.data.email, 'RSA-OAEP' ) )
				config.data.data.uname = forge.util.encode64( pubKey.encrypt( config.data.data.uname, 'RSA-OAEP' ) )
				config.data.data.pass = forge.util.encode64( pubKey.encrypt( config.data.data.pass, 'RSA-OAEP' ) )
			} catch ( err ) {
				$errz.toast( 'Invalid length!' )
				log( "ENCRYPTION ERROR" )
				log( err )
				return $q.reject( config )
			}
		}

		if ( config.method == "POST" && config.url == g_ip + "public/login" ) {
			try {
				config.data.data.uname = forge.util.encode64( pubKey.encrypt( config.data.data.uname, 'RSA-OAEP' ) )
				config.data.data.pass = forge.util.encode64( pubKey.encrypt( config.data.data.pass, 'RSA-OAEP' ) )
			} catch ( err ) {
				$errz.toast( 'Invalid length!' )
				log( "ENCRYPTION ERROR" )
				log( err )
				return $q.reject( config )
			}
		}

		if ( token && pubKey ) {
			config.headers[ 'x-token' ] = forge.util.encode64( pubKey.encrypt( token + '.' + _.now(), 'RSA-OAEP' ) )
		}



		// if ( $rootScope.data.user.publicKey && $rootScope.data.user.token && $rootScope.data.user.key ) {

		// 	var pkey = forge.pki.publicKeyFromPem( forge.util.decode64( $rootScope.data.user.publicKey ) )

		// 	config.headers[ 'x-token' ] = forge.util.encode64( pkey.encrypt( $rootScope.data.user.token + '.' + _.now(), 'RSA-OAEP' ) )

		// 	// config.headers[ 'x-uname' ] = forge.util.encode64( pkey.encrypt( $rootScope.data.user.uname ) )
		// 	// config.headers[ 'x-token' ] = forge.util.encode64( pkey.encrypt( ":poop" ) )
		// 	// log($rootScope.data.user.token.length)

		// 	// var iv = forge.random.getBytesSync( 32 );
		// 	// var cipher = forge.cipher.createCipher( 'AES-CBC', forge.util.decode64( $rootScope.data.user.key ) );
		// 	// cipher.start( {
		// 	// 	iv: iv
		// 	// } );
		// 	// cipher.update( forge.util.createBuffer( $rootScope.data.user.token + '.' + _.now() ) );
		// 	// cipher.finish();
		// 	// var stamp = forge.util.encode64( cipher.output.getBytes() )
		// 	// config.headers[ 'x-stamp' ] = stamp
		// }

		// config.headers[ 'x-crypttoken' ] = $rootScope.data.user.cryptToken
		// config.headers[ 'x-pass' ] = $rootScope.data.user.pass
		// log(config)
		return config
	}

	this.requestError = function ( rej ) {
		log( '/*==========  ???????REQUEST ERROR???????  ==========*/' )
		log( rej )
		return $q.reject( rejection )
	}



	this.response = function ( data ) {
		if ( timedOut ) {
			return data
		}

		if ( data.config.method == "POST" && data.config.url == g_ip + "public/captcha" ) {
			pubKey = forge.pki.publicKeyFromPem( forge.util.decode64( data.data ) )
		}

		if ( data.config.method == "POST" && data.config.url == g_ip + "public/register" ) {
			token = myprivKey.decrypt( forge.util.decode64( data.data ), 'RSA-OAEP' )
		}

		return data
	}

	this.responseError = function ( rej ) {
		if ( rej.status == 400 ) {
			$errz.toast( rej.data.msg )
		} else if ( rej.status == 500 ) {
			$errz.toast( "ERROR CODE: " + rej.data.num + " @ " + rej.data.method + " - " + rej.data.path )
		}

		return $q.reject( rej )
	}

} )



.factory( '$captcha', function ( $mdDialog ) {
	var dis = {}

	dis.show = function ( _content ) {
		$mdDialog.show( {
			clickOutsideToClose: false,
			templateUrl: "./templates/captcha.html",
			controller: function ( $rootScope, $scope, $mdDialog, $http ) {

				$scope.disableCapSubmit = true
				$scope.gRecaptchaResponse = ''

				var listener = $scope.$watch( 'gRecaptchaResponse', function () {
					if ( $scope.gRecaptchaResponse.length != 0 ) {
						log( $scope.gRecaptchaResponse )
						$scope.disableCapSubmit = false
						listener()
					}
				} )



				/*============================
				=            WIP            =
				============================*/

				$scope.submitCaptcha = function () {
					var toka = $rootScope.data.user.id + "." + _.now()
					var tokb = forge.util.encode64( $rootScope.data.initKey.encrypt( toka ) )

					$http.post( g_ip + "public/captcha", {
						data: {
							tok: tokb,
							incap: $scope.gRecaptchaResponse
						}
					} ).success( function ( data ) {

						$mdToast.show( $mdToast.simple().content( "Captcha success!" ) )
							// $mdDialog.hide();

					} ).error( function ( data ) {
						log( "bad" )
						log( data )
					} );

				}

				/*-----  End of WIP  ------*/



				$scope.dev = function () {
					log( $rootScope.data.initKey )
				}
			}
		} );
	}

	return dis
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
					$mdDialog.hide();
				}
			}
		} );
	}

	return dis
} )























//

