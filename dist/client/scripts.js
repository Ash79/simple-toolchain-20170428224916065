"use strict";var app=angular.module("Soju",["auth0.lock","angular-jwt","ngRoute","ngMaterial","ngMessages","chart.js","ui.knob"]);app.config(["$routeProvider","$locationProvider","$mdThemingProvider","$httpProvider","lockProvider","jwtOptionsProvider",function(e,t,o,n,r,l){r.init({clientID:"**clientid**",domain:"**mydomain**.auth0.com",options:{auth:{redirectUrl:location.href+"home",responseType:"token"},theme:{logo:"images/logo.png",primaryColor:"#b81b1c"},languageDictionary:{title:"CodeSoju"}}}),l.config({tokenGetter:function(){return localStorage.getItem("id_token")},whiteListedDomains:["localhost"],unauthenticatedRedirectPath:"/"}),n.interceptors.push("jwtInterceptor"),e.when("/",{templateUrl:"landing/landing.html",controller:"LandingController"}).when("/home",{templateUrl:"home/home.html",controller:"HomeController"}).when("/newsfeed",{templateUrl:"newsfeed/newsfeed.html",controller:"NewsfeedController"}).when("/user_profile",{templateUrl:"user_profile/user_profile.html",controller:"UserProfileController"}).when("/cms_content",{templateUrl:"cms_content/cms_content.html",controller:"CmsContentController"}).when("/feed",{templateUrl:"feed/feed.html",controller:"FeedController",resolve:{nytFeed:["Feed",function(e){return e.getNews()}]}}),t.html5Mode(!0),o.theme("default");var a=o.extendPalette("red",{500:"#eee",contrastDefaultColor:"dark"});o.definePalette("lightGrey",a),o.theme("default").primaryPalette("lightGrey")}]),function(){function e(e,t){e.authService=t}angular.module("Soju").controller("loginController",e),e.$inject=["$scope","authService"]}(),function(){angular.module("Soju").run(["$rootScope","$location","authService","authManager","jwtHelper","featureToggle",function(e,t,o,n,r,l){l.features.auth&&(e.authService=o,o.registerAuthenticationListener(),n.checkAuthOnRefresh(),n.redirectWhenUnauthenticated(),e.$on("$routeChangeStart",function(e){o.isAuthenticated()||t.path("/")}),e.$on("userProfileSet",function(t,o){e.userProfile=o}))}])}(),function(){function e(e,t,o,n){function r(){o.show()}function l(){localStorage.removeItem("id_token"),localStorage.removeItem("profile"),n.unauthenticate(),e.userProfile={},window.location="/"}function a(){o.on("authenticated",function(t){localStorage.setItem("id_token",t.idToken),n.authenticate(),o.getProfile(t.idToken,function(t,o){t&&console.log(t),localStorage.setItem("profile",JSON.stringify(o)),e.$broadcast("userProfileSet",o)})})}function i(){var e=localStorage.getItem("id_token")||null;return null!==e}return e.userProfile=JSON.parse(localStorage.getItem("profile"))||{},{login:r,logout:l,registerAuthenticationListener:a,isAuthenticated:i}}angular.module("Soju").service("authService",e),e.$inject=["$rootScope","$location","lock","authManager"]}(),angular.module("Soju").controller("CmsContentController",["$scope","CmsContentService","$mdSidenav","featureToggle",function(e,t,o,n){e.toggleList=function(){o("left").toggle()},e.cms_content_feature_toggle=n.features.cms_content,n.features.cms_content&&t.getContent().then(function(t){e.cms_content=t})}]),angular.module("Soju").factory("CmsContentService",["$http",function(e){return{getContent:function(){return e.get("/api/content").then(function(e){return e.data})}}}]),angular.module("Soju").controller("FeedController",["$scope","nytFeed","$mdSidenav",function(e,t,o){e.techNews=t.results,e.toggleList=function(){o("left").toggle()}}]),angular.module("Soju").factory("Feed",["$http",function(e){return{getNews:function(){return e.get("/api/feed").then(function(e){return e.data})}}}]),angular.module("Soju").controller("HomeController",["$scope","$location","$mdSidenav","$log","$interval",function(e,t,o,n,r){function l(){e.bubble_series=[],e.bubble_data=[];for(var t=0;t<50;t++)e.bubble_series.push("Series ${i}"),e.bubble_data.push([{x:a(),y:a(),r:i()}])}function a(){return(Math.random()>.5?1:-1)*Math.round(100*Math.random())}function i(){return Math.abs(a())/4}Chart.defaults.global.responsive=!0,Chart.defaults.global.maintainAspectRatio=!1,e.radar_labels=["Objects","Functions","Modules","Reusability","Duplication","Comments","Documentation"],e.radar_data=[[65,59,90,81,56,55,40],[28,48,40,19,96,27,100]],e.bubble_options={scales:{xAxes:[{display:!1,ticks:{max:125,min:-125,stepSize:10}}],yAxes:[{display:!1,ticks:{max:125,min:-125,stepSize:10}}]}},l(),r(l,2e3),e.bar_colors=["#2d87b2","#fc5b6c","#f1f1f1"],e.bar_labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.bar_data=[[32,20,44,38,19,43,12],[28,24,33,22,37,27,38]],e.datasetOverride=[{label:"Bar chart",borderWidth:1,type:"bar"},{label:"Line chart",borderWidth:3,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",type:"line"}],e.first_knob_value=65,e.first_knob_options={size:125,unit:"%",subText:{enabled:!0,text:"CPU used",color:"grey",font:"auto"},trackWidth:20,barWidth:10,trackColor:"#2d87b2",barColor:"#a0efdd"},e.second_knob_value=35,e.second_knob_options={size:125,unit:"%",subText:{enabled:!0,text:"Memory used",color:"grey",font:"auto"},trackWidth:20,barWidth:10,trackColor:"#2d87b2",barColor:"#a0efdd"},e.third_knob_value=88,e.third_knob_options={size:125,unit:"%",subText:{enabled:!0,text:"Storage used",color:"grey",font:"auto"},trackWidth:20,barWidth:10,trackColor:"#2d87b2",barColor:"#a0efdd"},e.close=function(){o("left").close().then(function(){n.debug("close LEFT is done")})},e.toggleList=function(){o("left").toggle()}}]),angular.module("Soju").controller("LandingController",["$scope","$anchorScroll","$location","$mdSidenav",function(e,t,o,n){e.isLandingStyle=!0,e.gotoAnchor=function(e){var r=o.hash();o.hash(e),t(),n("left").close(),o.hash(r)},e.toggleList=function(){n("left").toggle()}}]),angular.module("Soju").controller("MainController",["$location","$scope","featureToggle",function(e,t,o){o.init(),t.selectedMenu=function(t){return t===e.path()},t.navigateHome=function(){e.url("/")}}]),angular.module("Soju").controller("NewsfeedController",["$scope","Newsfeed","$mdSidenav",function(e,t,o){function n(){t.getArticles().then(function(t){e.articles=t})}e.toggleList=function(){o("left").toggle()},n()}]),angular.module("Soju").factory("Newsfeed",["$http",function(e){return{getArticles:function(){return e.get("/api/newsfeed").then(function(e){return e.data})}}}]),angular.module("Soju").controller("UserProfileController",["$scope","$location","$mdSidenav","$log",function(e,t,o,n){e.close=function(){o("left").close().then(function(){n.debug("close LEFT is done")})},e.toggleList=function(){o("left").toggle()},e.user={email:"",firstName:"",lastName:"",company:"Cedrus",addressLine1:"",addressLine2:"",city:"",state:"",postalCode:""},e.states="AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ").map(function(e){return{abbrev:e}})}]),angular.module("Soju").filter("trusted",["$sce",function(e){return function(t){return e.trustAsResourceUrl(t)}}]),angular.module("Soju").factory("featureToggle",["$rootScope",function(e){return{features:{auth:!1,cms_content:!1},init:function(){e.features=this.features}}}]);