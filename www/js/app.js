//

angular.module( 'myApp', [
	'ngMaterial',
	'ui.router',
	'angular-storage',
	'vcRecaptcha'
	// 'smart-table'
	// 'ui.calendar'
] )

.factory( '$store', function ( store ) {
	return store.getNamespacedStore( 'auth0' );
} )

.run( function ( $rootScope, $store ) {
	$rootScope.data = {}
	$rootScope.data.initKey = null
	$rootScope.data.state = ""
	$rootScope.data.user = {}

	$rootScope.data.user.id = $store.get( 'data.user.id' ) || null
	$rootScope.data.user.remember = false
	$rootScope.data.user.authed = false



} )

.config( function ( $stateProvider, $urlRouterProvider, $httpProvider, $mdIconProvider, $mdThemingProvider ) {

	// $mdIconProvider
	// 	.icon( "elevator1", "./css/svgs/elevator1.svg", 24 )
	// 	.icon( "elevator2", "./css/svgs/elevator2.svg", 24 )

	// $mdThemingProvider.theme( 'tool', 'default' )
	// 	.primaryPalette( 'grey', {
	// 		'default': '50', // by default use shade 400 from the pink palette for primary intentions
	// 	} )

	// $mdThemingProvider.theme( 'docs-dark', 'default' )
	// 	.primaryPalette( 'grey', {
	// 		'default': '900', // by default use shade 400 from the pink palette for primary intentions
	// 	} )
	// 	.accentPalette('orange')

	// 	// .dark();

	// $mdThemingProvider.theme( 'docs-dark', 'default' )
	// 	.primaryPalette( 'yellow' )
	// 	.dark();



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
		// controller: 'RegisterCtrl',
		templateUrl: 'htmls/public/about.html',
		data: {
			stateToolName: "About"
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
			} ]
		}
	} )

	.state( 'user.dash', {
		url: '/dash',
		controller: 'DashCtrl',
		templateUrl: 'htmls/user/dash.html',
		data: {
			stateToolName: "Dashboard"
		}
	} )

	$urlRouterProvider.otherwise( '/public/login' )

	$httpProvider.interceptors.push( 'HeadersInterceptor' );


} )


























//

