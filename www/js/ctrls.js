//

angular.module( 'myApp' )



.controller( 'IndexCtrl', function ( $scope, $log, $q, $state, $mdToast, $mdDialog, $mdSidenav, $http, $store, $window ) {

	$scope.toggleSidenav = function ( menuId ) {
		$mdSidenav( menuId ).toggle();
	};

	$scope.href = function ( loc, parms ) {
		$state.go( loc, {
			id: parms || ""
		} )
	};











	$scope.restDev = function () {

		$http.get( g_ip + "dev" ).success( function ( data ) {
			log( data )
		} ).error( function ( data ) {
			log( data )
		} );
	}

	$scope.localDev = function () {

		// var keys = forge.pki.rsa.generateKeyPair( 1024 )

		// var md = forge.md.sha512.create();
		// md.update( 'poop' );
		// var signature = keys.privateKey.sign( md )
		// log( forge.util.encode64( signature ) )

		// var md = forge.md.sha512.create();
		// md.update( 'poop' );
		// var verified = keys.publicKey.verify( md.digest().bytes(), signature );
		// log( verified )


		// var data = forge.util.bytesToHex( forge.random.getBytesSync( 39 ) )

		// log( data )
		// log( data.length )
		// log( keys.publicKey.encrypt( data ).length )

		// var encrypted = keys.publicKey.encrypt( data );
		// var encrypted = keys.publicKey.encrypt( data, 'RSA-OAEP' );

		// var encrypted = keys.publicKey.encrypt( data, 'RSA-OAEP', {
		// 	md: forge.md.sha256.create()
		// } );

		// var encrypted = keys.publicKey.encrypt( data, 'RSA-OAEP', {
		// 	md: forge.md.sha512.create(),
		// 	mgf1: {
		// 		md: forge.md.sha256.create()
		// 	}
		// } );
		// log( encrypted )




		// log(byts.length)
		// var encr = forge.util.bytesToHex( keys.publicKey.encrypt( byts ) )
		// log( encr )
		// var decr = forge.util.encode64( keys.privateKey.decrypt( encr ) )
		// log( decr )


		// log( forge.util.encode64( forge.pki.publicKeyToPem( keys.publicKey ) ) )
		// log( forge.util.encode64( forge.pki.privateKeyToPem( keys.privateKey ) ) )
		// log( forge.util.encode64( keys.publicKey.encrypt( bytes ) ) )


		// log( $scope.data.user.key )









		// var hmac = forge.hmac.create();
		// hmac.start( 'sha1', 'wut' );
		// hmac.update( 'qwer1234' );
		// log( hmac.digest().toHex() );

		// log( forge.md.sha1.create().update( "qwer1234" ).digest().toHex() )






		// var now = _.now()
		// var md = forge.md.sha1.create();
		// md.update( 'gdergserdgh' );

		// var data = md.digest().toHex()
		// var later = _.now()

		// log( data );
		// log( later - now );









		// var bits = 256;
		// log("start")
		// forge.prime.generateProbablePrime( bits, function ( err, num ) {
		// 	log( num.toString( 16 ) );
		// } );
		// log("end")

		// log( keys )

		// $scope.data.user.key




		// var pkey = forge.pki.publicKeyFromPem( forge.util.decode64( $scope.data.user.publicKey ) )

		// var iv = forge.random.getBytesSync( 32 );
		// var cipher = forge.cipher.createCipher( 'AES-CBC', forge.util.decode64( $scope.data.user.key ) );
		// cipher.start( {
		// 	iv: iv
		// } );
		// cipher.update( forge.util.createBuffer( $scope.data.user.token + '.' + _.now() ) );
		// cipher.finish();

		// log( forge.util.encode64( cipher.output.getBytes() ) )





		// var message = 'poopface'
		// var salt = forge.random.getBytesSync( 128 );
		// var key = forge.pkcs5.pbkdf2( 'password', salt, 8192, 32 );
		// log( key )
		// log( forge.util.encode64( key ) )

		// var iv = forge.random.getBytesSync( 32 );
		// var cipher = forge.cipher.createCipher( 'AES-CBC', key );
		// cipher.start( {
		// 	iv: iv
		// } );
		// cipher.update( forge.util.createBuffer( message ) );
		// cipher.finish();

		// log( forge.util.encode64( cipher.output.getBytes() ) )


		// var data = {}
		// data.token = 

		// var pkey = forge.pki.publicKeyFromPem( forge.util.decode64( $scope.data.user.publicKey ) )
		// log( pkey )
		// var enc = pkey.encrypt( $scope.data.user.token + '.' + _.now() )
		// log( ( $scope.data.user.token + _.now() ).length )
		// log( enc )


		// log($scope.data.user.id)


		// var doc = {}
		// doc.sessions = []
		// 	// doc.sessions[0] = _.now()
		// doc.sessions[ _.now() ] = {}
		// doc.sessions[ _.now() ].id = 1
		// doc.sessions[ _.now() ].prime = "fweoitfrhyweoihfg"
		// log( doc )






		// var now = _.now()

		// var txt = "i love encryption" // this value can be infinite

		// var iv = forge.random.getBytesSync( 128 );
		// var salt = forge.random.getBytesSync( 128 )

		// var key = forge.pkcs5.pbkdf2( 'qwer1234', salt, 4096, 128 )
		// var cipher = forge.rc2.createEncryptionCipher( key );
		// cipher.start( iv );
		// cipher.update( forge.util.createBuffer( txt ) );
		// cipher.finish();
		// var encrypted = cipher.output;
		// console.log( encrypted.toHex() );
		// // encrypted hash

		// // var iv = forge.random.getBytesSync( 128 );
		// // var salt = forge.random.getBytesSync( 128 )

		// var key = forge.pkcs5.pbkdf2( 'qwer1234', salt, 4096, 128 )
		// var cipher = forge.rc2.createDecryptionCipher( key );
		// cipher.start( iv );
		// cipher.update( encrypted );
		// cipher.finish();
		// console.log( cipher.output.toHex() );
		// // decrypted hash
		// // run this again and encryped will be different but decrypted wont

		// log( _.now() - now )











		// log( "making oprime" )
		// var bytes = forge.random.getBytesSync( 1024 );
		// log( forge.util.bytesToHex( bytes ) );
		// log( "ok proceed" )

		// var md = forge.md.sha512.sha256.create();
		// var data = md.update( "quer1234" ).digest().toHex();
		// log( data )
		// log( data.length )

		// var msg = forge.util.bytesToHex( forge.random.getBytesSync( 37 ) )
		// log( msg.length )

		// var hmac = forge.hmac.create()
		// hmac.start( 'sha256', data )
		// hmac.update( msg )
		// var tok = hmac.digest().toHex()
		// log( tok )


		// var pkey = forge.pki.publicKeyFromPem( forge.util.decode64( doc.crypt.clientKey ) )
		// try {
		// 	log("encrypting")
		// 	tok = pkey.encrypt( tok, 'RSA-OAEP' )
		// 	log("encryptEDDDD")
		// } catch ( err ) {
		// 	return e.errz( 9, req, res, err )
		// }
		// 	log("sending token")



































		// var req = {
		// 	method: 'POST',
		// 	url: 'private',
		// 	data: {
		// 		token: 'wd8y934ytr9834t45376t9ftg='
		// 	}
		// }
		// $http( req ).success( function ( data, status, headers, config ) {

		// } ).error( function ( data, status, headers, config ) {

		// } );

		// log( $scope.data.user.remember )


		log( $scope.data.initKey )



	}

	$scope.clearDev = function () {
		localStorage.clear()
	}

} )



.controller( 'PublicCtrl', function ( $scope, $state, $captcha, $http ) {

	if ( !$scope.data.user.id ) {

		$scope.data.user.id = forge.md.sha1.create().update( _.now() ).digest().toHex()

		// $http.get( g_ip + "public/captcha" ).success( function ( data ) {
		// 	$scope.data.initKey = forge.pki.publicKeyFromPem( forge.util.decode64( data ) )
		// 	// log( $scope.data.initKey )
		// } ).error( function ( data ) {
		// 	log( data )
		// } );

		$captcha.show()
	}

	if ( $scope.data.user.id && $scope.data.user.authed ) {
		// $scope.href("user.dash")
		log( "going to dash" )
	}

	// this dynamically loads the sidebar links from state defined links
	$scope.links = $state.current.data.links // DO NOT REMOVE

	$scope.d = {}
	$scope.d.email = "roblav96@gmx.com"
	$scope.d.uname = "roblav96"
	$scope.d.pass = "qwer1234"
	$scope.d.pass2 = "qwer1234"
	$scope.d.remember = false
} )






.controller( 'RegisterCtrl', function ( $scope, $log, $mdToast, $mdDialog, $state, $http, $store, $timeout ) {

	$scope.disableSubmit = true
	$scope.capSuccess = function () {
		$scope.disableSubmit = false
		if ( $scope.focusMe ) {
			$timeout( function () {
				$scope.focusMe[ 0 ].focus()
			}, 100 );
		}
	}



	$scope.submit = function () {
		if ( $scope.d.pass != $scope.d.pass2 ) {
			$mdToast.show( $mdToast.simple().content( 'Passwords do not match!' ) );
			return
		}

		var d = _.omit( $scope.d, [ 'pass2', 'captcha', 'incaptcha', 'remember' ] )
		d.uname = d.uname.replace( /[^a-zA-Z0-9_-]/, '' ).replace( / /g, '' ).toLowerCase()

		$http.post( g_ip + "public/register", {
			data: d
		} ).success( function ( data ) {

			$scope.data.user.authed = true
			if ( $scope.data.user.remember == true ) {
				$store.set( 'data.user.id', $scope.data.user.id )
			}
			$scope.href( "user.dash" )

		} ).error( function ( data ) {
			if ( data.num == 8 ) {
				$timeout( function () {
					$window.location.reload()
				}, 3000 )
			} else {
				return
			}
		} );

	}

} )









.controller( 'LoginCtrl', function ( $scope, $mdToast, $window, $http, $store, $state, $timeout ) {

	$scope.disableSubmit = true
	$scope.capSuccess = function () {
		$scope.disableSubmit = false
		log( $scope.focusMe )
		if ( $scope.focusMe ) {
			$timeout( function () {
				$scope.focusMe[ 0 ].focus()
			}, 100 );
		}
	}


	$scope.submit = function () {
		var d = _.pick( $scope.d, [ 'uname', 'pass' ] )
		d.uname = d.uname.replace( /[^a-zA-Z0-9_-]/, '' ).replace( / /g, '' ).toLowerCase()

		$http.post( g_ip + "public/login", {
			data: d
		} ).success( function ( data ) {

			$scope.data.user.authed = true
			if ( $scope.data.user.remember == true ) {
				$store.set( 'data.user.id', $scope.data.user.id )
			}
			// $scope.href( "user.dash" )

			$mdToast.show( $mdToast.simple().content( "Great success :D" ) )

		} ).error( function ( data ) {
			// if ( _.indexOf( [ 8, 12 ], data.num ) > -1 ) {
			if ( data.num == 8 ) {
				$timeout( function () {
					$window.location.reload()
				}, 3000 )
			} else {
				return
			}
		} );
	}


} )



/**
 *
 * WORK ON LOGIN SHIT
 *
 **/




.controller( 'UserCtrl', function ( $scope, $state ) {
	// this dynamically loads the sidebar links from state defined links
	$scope.links = $state.current.data.links // DO NOT REMOVE
} )

.controller( 'DashCtrl', function ( $scope, $state, $http ) {
	$scope.dev = function () {
		$http.get( g_ip + "user/dash" ).success( function ( data ) {
			log( data )
		} ).error( function ( data ) {
			// log( data )
		} );
	}
} )












//

