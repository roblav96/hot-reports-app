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

		$scope.d.street = chance.address()
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

		$scope.d.uname = formatUname( $scope.d.fname, $scope.d.mname, $scope.d.lname, $scope.d.phone )
	}

	// $scope._chance()

	$scope.d.fname = "Robert"
	$scope.d.mname = "G"
	$scope.d.lname = "Laverty"
	$scope.d.phone = "(401) 864-3464"
	$scope.d.email = "roblav96@gmx.com"
	$scope.d.uname = formatUname( $scope.d.fname, $scope.d.mname, $scope.d.lname, $scope.d.phone )


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
	// $scope.d.uname = "roblav96"
	$scope.d.pass = "qwer1234"
	$scope.d.pass2 = "qwer1234"
	$scope.d.remember = false
} )








/*===========================================
=            REGISTER CONTROLLER            =
===========================================*/
.controller( 'RegisterCtrl', function ( $scope, $log, $mdToast, $mdDialog, $state, $http, $store, $timeout ) {

	$scope.submit = function () {

		// $scope.d.uname = $scope.d.fname + '_' + $scope.d.mname + '_' + $scope.d.lname + $scope.d.phone.substring( $scope.d.phone.length - 4, $scope.d.phone.length )
		$scope.d.uname = formatUname( $scope.d.fname, $scope.d.mname, $scope.d.lname, $scope.d.phone )
		var data = _.pick( $scope.d, 'fname', 'mname', 'lname', 'phone', 'email', 'pass', 'uname' )

		if ( data.pass != $scope.d.pass2 ) {
			$mdToast.show( $mdToast.simple().content( 'Passwords do not match!' ) )
			return
		}

		$http.post( g_ip + "public/register", data ).success( function ( res ) {
			if ( res == "true" ) {
				$mdToast.show( $mdToast.simple().content( 'Registration of ' + data.uname + ' success!' ) )
				$scope.href( "public.login" )
			}
		} ).error( function ( err ) {
			console.log( err )
			$mdToast.show( $mdToast.simple().content( err ) )
		} )

	}

} )









/*========================================
=            LOGIN CONTROLLER            =
========================================*/
.controller( 'LoginCtrl', function ( $scope, $mdToast, $window, $http, $store, $state, $timeout ) {

	$scope.submit = function () {

		var data = _.pick( $scope.d, 'pass', 'uname' )

		$http.post( g_ip + "public/login", data ).success( function ( res ) {

			$mdToast.show( $mdToast.simple().content( 'Login success!' ) )

			$scope.data.user.authed = true
			$scope.data.user.uname = $scope.d.uname
			$store.set( 'data.user.authed', true )
			$store.set( 'data.user.xid', $scope.data.user.xid )
			$store.set( 'data.user.uname', $scope.d.uname )

			console.log( res )

			if ( res == true ) {
				$scope.data.user.newb = res
				$store.set( 'data.user.newb', res )
				$scope.href( "newb.intro" )
			} else {
				if ( res == 'vend' ) {
					$scope.data.user.vendor = true
					$store.set( 'data.user.vendor', true )
				}
				$scope.href( "user.dash" )
			}

		} ).error( function ( err ) {
			console.error( err )
			$mdToast.show( $mdToast.simple().content( err ) )
		} )
	}


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

} )



/*=======================================
=            JOIN CONTROLLER            =
=======================================*/
.controller( 'JoinCtrl', function ( $scope, $state, $http, $mdToast, $store ) {
	$scope.myCompanies = []
	$scope.rowCollection = []

	/*=====  get all companies  ======*/
	$http.get( g_ip + "newb/invite" ).then( function ( data ) {
		var data = data.data.rows

		data = _.filter( data, function ( doc ) {
			if ( doc.doc._id.substring( 0, 1 ) == "_" ) {
				return false
			} else {
				return true
			}
		} )

		for ( var i = 0; i < data.length; i++ ) {
			data[ i ].doc = _.pick( data[ i ].doc, 'type', 'name', 'street', 'city', 'state', 'zip', '_id' )
		}

		$scope.rowCollection = data

		console.log( $scope.rowCollection )
	}, function ( err ) {
		console.log( err )
	} )


	/*=====  click on company item  ======*/
	$scope.join = function ( type, name ) {
		/**
			TODO:
			- PICK UP HERE FOR JOINING
		 */
		console.log( type )
		console.log( name )
	}




} )



/*=========================================
=            ENROLL CONTROLLER            =
=========================================*/
.controller( 'EnrollCtrl', function ( $scope, $state, $http, $mdToast, $store ) {
	// $scope.d.name = "Hamilton Co"
	$scope.d.type = null

	$scope.selected = false
	$scope.vendor = false

	$scope.enroll = function ( type ) {
		if ( type == 'vend' ) {
			$scope.vendor = true
		}
		$scope.d.type = type
		$scope.selected = true
	}

	$scope.goback = function () {
		$scope.d.type = null
		$scope.vendor = false
		$scope.selected = false
	}






	$scope.submit = function () {
		var sendit = _.pick( $scope.d, 'name', 'type', 'street', 'city', 'state', 'zip', 'phone', 'fax', 'email', 'firealarm', 'sprinkler', 'firepump', 'emergexits', 'hoodsys', 'fireexting' )

		if ( $scope.d.type == 'prop' ) {
			sendit = _.omit( sendit, [ 'firealarm', 'sprinkler', 'firepump', 'emergexits', 'hoodsys', 'fireexting' ] )
		}

		$http.post( g_ip + "newb/enroll", sendit ).success( function ( res ) {

			var data = res

			if ( data == true ) {
				$scope.data.user.newb = null
				$store.remove( 'data.user.newb' )
				$mdToast.show( $mdToast.simple().content( 'Enrollment of ' + $scope.d.name + ' completed!' ) )

				$scope.href( "user.dash" )
			}
			console.log( data )

		} ).error( function ( err ) {
			console.error( err )
		} )

		// $http.post( g_ip + "newb/enroll", sendit ).success( function ( data ) {

		// 	cld

		// 	if ( data == "true" ) {
		// 		$mdToast.show( $mdToast.simple().content( 'Enrollment success!' ) )

		// 		$scope.data.user.newb = null
		// 		$store.remove( 'data.user.newb' )

		// 		$scope.data.user.ucompany = $scope.d.name
		// 		$store.set( 'data.user.ucompany', $scope.d.name )

		// 		$scope.href( "user.dash" )
		// 	}

		// } ).error( function ( data ) {
		// 	console.log( data )
		// 	$mdToast.show( $mdToast.simple().content( data ) )
		// } )
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
	$scope.d.name = "Wellington Place"
	$scope.d.title = "Property Manager"

	$scope.d.street = "34 Brainard Ave"
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

} )






/*=============================================
=            PROPERTIES CONTROLLER            =
=============================================*/
.controller( 'propertiesCtrl', function ( $scope, $http, $state ) {

	var db = new PouchDB( 'http://admin:admin@127.0.0.1:15984/report_sites' )
	$scope.myProperties = []
	$scope.myPropertiesCollection = []

	$http.get( g_ip + '/user/properties' ).success( function ( res ) {

		res = _.filter( res.rows, function ( doc ) {
			if ( doc.doc._id.substring( 0, 1 ) == "_" ) {
				return false
			} else {
				return true
			}
		} )

		res = _.filter( res, function ( doc ) {
			if ( doc.doc.main == true ) {
				return true
			} else {
				return false
			}
		} )

		console.log( res )

		$scope.myProperties = res

	} ).error( function ( err ) {
		console.error( err )
	} )


	console.log( $scope.data )



	/*=====  href to property user clicked on  ======*/
	$scope.hrefProperty = function ( propertyID ) {
		console.log( propertyID );
		$state.go( 'user.property', {
			propertyID: propertyID
		} )
	}

} )




/*===================================================
=            ADD NEW PROPERTY CONTROLLER            =
===================================================*/
.controller( 'addPropertyCtrl', function ( $scope, $state, $http, $mdToast ) {

	/*=====  add new property  ======*/
	$scope.submitProperty = function () {
		var sendData = _.omit( $scope.d, [ 'fname', 'mname', 'lname', 'wphone', 'pphone', 'bday' ] )

		$http.post( g_ip + "user/add_property", sendData ).success( function ( data ) {
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





/*===========================================
=            PROPERTY CONTROLLER            =
===========================================*/
.controller( 'propertyCtrl', function ( $scope, $http, $stateParams, $window ) {
	if ( $stateParams.propertyID == "" ) {
		$scope.href( 'user.properties' )
	}

	$scope.p = {}
	$scope.propStaff = []
	$scope.propStaffCollection = []
	$scope.propSites = []
	$scope.propSitesCollection = []


	$http.get( g_ip + "user/property/" + $stateParams.propertyID ).then( function ( data ) {
		data = data.data.docs
		console.log( data )

		$scope.propSitesCollection = data
		$scope.p = data[ 0 ]
	}, function ( err ) {
		console.log( err )
	} )



	/*=====  get all companies  ======*/
	// $http.get( g_ip + "newb/invite" ).then( function ( data ) {
	// 	var data = data.data.rows

	// 	data = _.filter( data, function ( doc ) {
	// 		if ( doc.doc._id.substring( 0, 1 ) == "_" ) {
	// 			return false
	// 		} else {
	// 			return true
	// 		}
	// 	} )

	// 	for ( var i = 0; i < data.length; i++ ) {
	// 		data[ i ].doc = _.pick( data[ i ].doc, 'type', 'name', 'address', 'city', 'state', 'zip', '_id' )
	// 	}

	// 	$scope.rowCollection = data

	// 	console.log( $scope.rowCollection )
	// }, function ( err ) {
	// 	console.log( err )
	// } )









	// $scope.hrefAddSite = function ( propertyID ) {
	// 	console.log( propertyID );
	// 	$state.go( 'user.add_site', {
	// 		propertyID: propertyID
	// 	} )
	// }


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

