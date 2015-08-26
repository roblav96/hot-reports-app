//

angular.module( 'myApp', [
	'ngMaterial',
	'ui.router',
	'pouchdb',
	'angular-storage',
	'smart-table'
	// 'ui.calendar'
	// 'vcRecaptcha'
] )

.factory( '$store', function ( store ) {
	return store.getNamespacedStore( 'auth0' )
} )



.run( function ( $rootScope, $store ) {
	$rootScope.data = {}
	$rootScope.data.initKey = null
	$rootScope.data.state = ""
	$rootScope.data.user = {}

	$rootScope.data.user.xid = $store.get( 'data.user.xid' ) || forge.md.sha1.create().update( _.now() ).digest().toHex()
	$rootScope.data.user.authed = $store.get( 'data.user.authed' ) || null
	$rootScope.data.user.uname = $store.get( 'data.user.uname' ) || null
	$rootScope.data.user.isNewb = $store.get( 'data.user.isNewb' ) || null

} )

.config( function ( $stateProvider, $urlRouterProvider, $httpProvider, $mdIconProvider, $mdThemingProvider ) {

	$stateProvider.state( 'public', {
		url: '/public',
		abstract: true,
		controller: 'PublicCtrl',
		templateUrl: 'htmls/index.html',
		data: {
			links: [ {
				name: "Login",
				state: "public.login",
				icon: "person"
			}, {
				name: "Register",
				state: "public.register",
				icon: "person_add"
			}, {
				name: "About",
				state: "public.about",
				icon: "info"
			} ]
		}
	} )

	.state( 'public.login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'htmls/public/login.html',
		data: {
			stateToolName: "Login"
		}
	} )

	.state( 'public.register', {
		url: '/register',
		controller: 'RegisterCtrl',
		templateUrl: 'htmls/public/register.html',
		data: {
			stateToolName: "Register"
		}
	} )

	.state( 'public.about', {
		url: '/about',
		templateUrl: 'htmls/public/about.html',
		data: {
			stateToolName: "About"
		}
	} )








	.state( 'newb', {
		url: '/newb',
		abstract: true,
		controller: 'NewbCtrl',
		templateUrl: 'htmls/index.html',
		data: {
			links: [ {
				name: "Join Company",
				state: "newb.join",
				icon: "input"
			}, {
				name: "Enroll New Company",
				state: "newb.enroll",
				icon: "add_circle_outline"
			} ]
		}
	} )

	.state( 'newb.acct', {
		url: '/acct',
		templateUrl: 'htmls/acct.html',
		data: {
			stateToolName: "My Account"
		}
	} )

	.state( 'newb.join', {
		url: '/join',
		templateUrl: 'htmls/newb/join.html',
		data: {
			stateToolName: "Join Company"
		},
		controller: 'JoinCtrl'
	} )

	.state( 'newb.enroll', {
		url: '/enroll',
		templateUrl: 'htmls/newb/enroll.html',
		data: {
			stateToolName: "Enroll New Company"
		},
		controller: 'EnrollCtrl'
	} )

	.state( 'newb.inv_propmgr', {
		url: '/inv_propmgr',
		templateUrl: 'htmls/newb/inv_propmgr.html',
		data: {
			stateToolName: "Request Property Invite"
		}
	} )

	.state( 'newb.inv_vendor', {
		url: '/inv_vendor',
		templateUrl: 'htmls/newb/inv_vendor.html',
		data: {
			stateToolName: "Request Vendor Invite"
		}
	} )

	.state( 'newb.enr_propmgt', {
		url: '/enr_propmgt',
		templateUrl: 'htmls/newb/enr_propmgt.html',
		data: {
			stateToolName: "Enroll New Property Management Company"
		}
	} )

	.state( 'newb.enr_vendor', {
		url: '/enr_vendor',
		templateUrl: 'htmls/newb/enr_vendor.html',
		data: {
			stateToolName: "Enroll New Service Company"
		}
	} )













	.state( 'user', {
		url: '/user',
		abstract: true,
		controller: 'UserCtrl',
		templateUrl: 'htmls/index.html',
		data: {
			links: [ {
				name: "Dashboard",
				state: "user.dash",
				icon: "dashboard"
			}, {
				name: "Schedule",
				state: "user.schedule",
				icon: "today"
			}, {
				name: "Properties",
				state: "user.properties",
				icon: "location_city"
			}, {
				name: "Users",
				state: "user.users",
				icon: "people"
			} ]
		}
	} )

	.state( 'user.acct', {
		url: '/acct',
		templateUrl: 'htmls/acct.html',
		data: {
			stateToolName: "My Account"
		}
	} )

	.state( 'user.dash', {
		url: '/dash',
		templateUrl: 'htmls/user/dash.html',
		data: {
			stateToolName: "Dashboard"
		}
	} )

	.state( 'user.schedule', {
		url: '/schedule',
		templateUrl: 'htmls/user/schedule.html',
		data: {
			stateToolName: "Schedule"
		}
	} )

	.state( 'user.properties', {
		url: '/properties',
		templateUrl: 'htmls/user/properties.html',
		data: {
			stateToolName: "Properties"
		},
		controller: 'propertiesCtrl'
	} )

	.state( 'user.users', {
		url: '/users',
		templateUrl: 'htmls/user/users.html',
		data: {
			stateToolName: "Users"
		}
	} )


	.state( 'user.new_property', {
		url: '/new_property',
		templateUrl: 'htmls/user/new_property.html',
		data: {
			stateToolName: "Enroll New Property"
		}
	} )

	.state( 'user.property', {
		url: "/property/:propertyID",
		templateUrl: 'htmls/user/property.html',
		data: {
			stateToolName: "View Property"
		},
		controller: 'propertyCtrl'
	} )
























	$urlRouterProvider.otherwise( '/public/login' )

	$httpProvider.interceptors.push( 'HeadersInterceptor' )

} )


























//

