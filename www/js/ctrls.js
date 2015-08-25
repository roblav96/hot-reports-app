//

angular.module( 'myApp' )


/*========================================
=            INDEX CONTROLLER            =
========================================*/
.controller( 'IndexCtrl', function ( $scope, $log, $q, $state, $mdToast, $mdDialog, $mdSidenav, $http, $store, $window ) {

	$scope.toggleSidenav = function ( menuId ) {
		$mdSidenav( menuId ).toggle()
	}

	$scope.href = function ( loc, parms ) {
		$state.go( loc, {
			id: parms || ""
		} )
	}


	/*=====  define scope.d with chance vars  ======*/
	$scope.d = {}
	$scope._chance = function () {
		// $scope.d.name = ""
		// $scope.d.title = ""

		$scope.d.fname = chance.first()
		$scope.d.lname = chance.last()
		$scope.d.wphone = chance.phone()
		$scope.d.pphone = chance.phone()

		$scope.d.address = chance.address()
		$scope.d.city = chance.city()
		$scope.d.state = chance.state()
		$scope.d.zip = chance.zip()
		$scope.d.phone = chance.phone()
		$scope.d.fax = chance.phone()
		$scope.d.email = chance.email()

		$scope.d.firealarm = true
		$scope.d.sprinkler = chance.bool( {
			likelihood: 75
		} )
		$scope.d.firepump = chance.bool( {
			likelihood: 50
		} )
		$scope.d.emergexits = chance.bool( {
			likelihood: 50
		} )
		$scope.d.hoodsys = chance.bool( {
			likelihood: 25
		} )
		$scope.d.fireexting = chance.bool( {
			likelihood: 50
		} )
	}
	$scope._chance()



	$scope.clearDev = function () {
		localStorage.clear()
	}



} )




/*=========================================
=            PUBLIC CONTROLLER            =
=========================================*/
.controller( 'PublicCtrl', function ( $scope, $state, $http ) {

	// this dynamically loads the sidebar links from state defined links
	$scope.links = $state.current.data.links // DO NOT REMOVE

	// $scope.d = {}
	// $scope.d.fname = "Robert"
	// $scope.d.lname = "Laverty"
	// $scope.d.wphone = "6177894488"
	// $scope.d.email = "roblav96@gmx.com"
	$scope.d.uname = "roblav96"
	$scope.d.pass = "qwer1234"
	$scope.d.pass2 = "qwer1234"
	$scope.d.remember = false

} )








/*===========================================
=            REGISTER CONTROLLER            =
===========================================*/
.controller( 'RegisterCtrl', function ( $scope, $log, $mdToast, $mdDialog, $state, $http, $store, $timeout ) {

	$scope.submit = function () {

		$scope.d = _.pick( $scope.d, 'fname', 'lname', 'wphone', 'email', 'uname', 'pass', 'pass2', 'bday', 'pphone' )


		if ( $scope.d.pass != $scope.d.pass2 ) {
			$mdToast.show( $mdToast.simple().content( 'Passwords do not match!' ) )
			return
		}

		$scope.d.uname = $scope.d.uname.replace( /[^a-zA-Z0-9_-]/, '' ).replace( / /g, '' ).toLowerCase()

		$http.post( g_ip + "public/register", {
			data: $scope.d
		} ).success( function ( data ) {

			if ( data == "true" ) {
				$mdToast.show( $mdToast.simple().content( 'Registration success!' ) )
				$scope.href( "public.login" )
			}


		} ).error( function ( err ) {
			console.log( err );
			$mdToast.show( $mdToast.simple().content( err ) )
		} )

	}

} )








/*========================================
=            LOGIN CONTROLLER            =
========================================*/
.controller( 'LoginCtrl', function ( $scope, $mdToast, $window, $http, $store, $state, $timeout ) {

	$scope.submit = function () {

		$scope.d.uname = $scope.d.uname.replace( /[^a-zA-Z0-9_-]/, '' ).replace( / /g, '' ).toLowerCase()

		$http.post( g_ip + "public/login", {
			data: {
				uname: $scope.d.uname,
				pass: $scope.d.pass
			}
		} ).success( function ( data ) {

			$mdToast.show( $mdToast.simple().content( 'Login success!' ) )

			// console.log( JSON.stringify( $scope.d, true, 4 ) )

			$scope.data.user.authed = true
			$scope.data.user.uname = $scope.d.uname
			$store.set( 'data.user.authed', true )
			$store.set( 'data.user.xid', $scope.data.user.xid )
			$store.set( 'data.user.uname', $scope.d.uname )

			if ( data == true ) {
				$scope.data.user.isNewb = data
				$store.set( 'data.user.isNewb', data )

				$scope.href( "newb.join" )
			} else {
				$scope.href( "user.dash" )
			}


		} ).error( function ( data ) {
			$mdToast.show( $mdToast.simple().content( data ) )
			log( data )
		} )
	}


} )







/*=========================================
=            INVITE CONTROLLER            =
=========================================*/
.controller( 'InviteCtrl', function ( $scope, $state, $http, $mdToast, $store ) {
	$scope.myCompanies = []
	$scope.rowCollection = []

	$http.get( g_ip + "newb/invite" ).then( function ( data ) {
		var data = data.data.rows

		$scope.rowCollection = _.filter( data, function ( doc ) {
			if ( doc.doc._id.substring( 0, 1 ) == "_" ) {
				return false
			} else {
				return true
			}
		} )

	}, function ( err ) {
		console.log( err )
	} )

} )












/*=======================================
=            NEWB CONTROLLER            =
=======================================*/
.controller( 'NewbCtrl', function ( $scope, $state, $http, $mdToast, $store ) {
	// this dynamically loads the sidebar links from state defined links
	$scope.links = $state.current.data.links // DO NOT REMOVE

	if ( !$scope.data.user.authed ) {
		$scope.href( "public.login" )
	}

	$scope.d.name = ""

	// $scope.d.address = "39 Brighton Ave"
	// $scope.d.city = "Allston"
	// $scope.d.state = "MA"
	// $scope.d.zip = "02134"
	// $scope.d.phone = "6171234567"
	// $scope.d.fax = "6171238765"
	// $scope.d.email = "hamilton@hamiltonco.com"

	// $scope.d.firealarm = false
	// $scope.d.sprinkler = false
	// $scope.d.firepump = false
	// $scope.d.emergexits = false
	// $scope.d.hoodsys = false
	// $scope.d.fireexting = false

	$scope.submit = function ( typ ) {

		$scope.d = _.pick( $scope.d, 'name', 'address', 'city', 'state', 'zip', 'phone', 'fax', 'email', 'firealarm', 'hoodsys', 'emergexits', 'firepump', 'sprinkler' )


		$http.post( g_ip + "newb/enroll", {
			data: $scope.d,
			typ: typ
		} ).success( function ( data ) {

			if ( data == "true" ) {
				$mdToast.show( $mdToast.simple().content( 'Enrollment success!' ) )

				$scope.data.user.isNewb = null
				$store.remove( 'data.user.isNewb' )

				$scope.data.user.ucompany = $scope.d.name
				$store.set( 'data.user.ucompany', $scope.d.name )

				$scope.href( "user.dash" )
			}

		} ).error( function ( data ) {
			log( data )
			$mdToast.show( $mdToast.simple().content( data ) )
		} )

	}

} )







/*=======================================
=            USER CONTROLLER            =
=======================================*/
.controller( 'UserCtrl', function ( $scope, $state, $http, $mdToast ) {
	// this dynamically loads the sidebar links from state defined links
	$scope.links = $state.current.data.links // DO NOT REMOVE

	if ( !$scope.data.user.authed ) {
		$scope.href( "public.login" )
	}

	// $scope.d = {}
	// $scope.d.name = chance.word() + " " + chance.word() + " " + chance.word()
	// $scope.d.title = chance.word() + " " + chance.word()
	$scope.d.name = "10 Milk"
	$scope.d.title = "Property Manager"

	$scope.d.address = "10 Milk St"
	$scope.d.city = "Boston"
	$scope.d.state = "MA"
		// $scope.d.zip = "02532"
		// $scope.d.phone = "5346656456"
		// $scope.d.fax = "0923478205"
		// $scope.d.email = "user@westboro.com"

	// $scope.d.firealarm = false
	// $scope.d.sprinkler = false
	// $scope.d.firepump = false
	// $scope.d.emergexits = false
	// $scope.d.hoodsys = false
	// $scope.d.fireexting = false



	/*=====  add new property  ======*/
	$scope.submitProperty = function () {

		$http.post( g_ip + "user/new_property", {
			data: $scope.d
		} ).success( function ( data ) {
			console.log( data )
			$state.go( 'user.property', {
				propertyID: data
			} )
		} ).error( function ( err ) {
			console.log( err );
			$mdToast.show( $mdToast.simple().content( err ) )
		} )

	}

} )







/*=============================================
=            PROPERTIES CONTROLLER            =
=============================================*/
.controller( 'propertiesCtrl', function ( $scope, $http, $state ) {

	$scope.myProps

	/*=====  get list of properties by uname  ======*/
	$http.get( g_ip + "user/properties" ).then( function ( data ) {
		var data = data.data.rows

		console.log( JSON.stringify( data, true, 4 ) )

		$scope.myProps = _.filter( data, function ( doc ) {
			if ( doc.doc._id.substring( 0, 1 ) == "_" ) {
				return false
			}
		} )

		// console.log( $scope.myProps )
	}, function ( err ) {
		console.log( err )
	} )



	/*=====  href to property user clicked on  ======*/
	$scope.hrefProperty = function ( propertyID ) {
		console.log( propertyID );
		$state.go( 'user.property', {
			propertyID: propertyID
		} )
	}

} )






/*===========================================
=            PROPERTY CONTROLLER            =
===========================================*/
.controller( 'propertyCtrl', function ( $scope, $http, $stateParams, $window ) {
	if ( $stateParams.propertyID == "" ) {
		$scope.href( 'user.properties' )
	}

	$scope.p = {}
	$scope.propSites


	$http.get( g_ip + "user/property/" + $stateParams.propertyID ).then( function ( data ) {

		console.log( JSON.stringify( data.data, true, 4 ) )
		$scope.p = data.data



	}, function ( err ) {

	} )

	$scope.hrefAddSite = function ( propertyID ) {
		console.log( propertyID );
		$state.go( 'user.add_site', {
			propertyID: propertyID
		} )
	}


	// $http.get( g_ip + "user/property/" + $stateParams.propertyID ).then( function ( data ) {
	// 	var data = data.data.docs

	// 	// console.log( data );

	// 	for ( var i = 0; i < data.length; i++ ) {
	// 		if ( data[ i ].main ) {
	// 			$scope.p = data[ i ]
	// 		};
	// 	};

	// 	$scope.propSites = data

	// 	console.log( $scope.propSites );





	// 	// console.log( data );
	// }, function ( err ) {
	// 	console.log( err );
	// } )



} )






























//

