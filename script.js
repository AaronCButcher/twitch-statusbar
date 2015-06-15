var app = angular.module('twitch', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'AllCtrl',
      templateUrl: 'temp1.html'
    })
    .when('/online', {
      controller: 'OnlineCtrl',
      templateUrl: 'temp2.html'
    })
    .when('/offline', {
      controller: 'OfflineCtrl',
      templateUrl: 'temp3.html'
    })
    .otherwise({
      redirectTo: "/"
    });
});
var test = (function() {
  var status = [];
  var users = ["freecodecamp", "storbeck", "terakilobyte",
      "habathcx", "RobotCaleb", "comster404", "brunofin",
      "thomasballinger", "noobs2ninjas", "beohoff", "medrybw", "sing_sing", "screwattack"
    ],
    addr = "https://api.twitch.tv/kraken/streams/",
    imgUrl = "https://api.twitch.tv/kraken/users/";
  users.forEach(function(user) {
    $.getJSON(addr + user + "?callback=?").success(function(data) {
      var userInfo = {};
      userInfo.name = user;
      $.getJSON(imgUrl + user + "?callback=?").success(function(data) {
        if (data.logo == null) {
          userInfo.img = 'http://www.enviroscent.com/c.1222543/shopflow-1-04-0/img/no_image_available.jpeg';
        } else {
          userInfo.img = data.logo;
        }
      });
      if (data.stream !== null) {
        userInfo.streamInfo = data.stream.channel.status;
        userInfo.avail = true;
      } else {
        userInfo.avail = false;
        userInfo.streamInfo = '';
      }
      status.push(userInfo);
    });
  });
  return status;
})();
app.controller('AllCtrl', function($scope) {
  $scope.allUsers = test;
  setTimeout(function() {
    $scope.$apply();
  }, 2000);

});
app.controller('OnlineCtrl', function($scope) {
  var filterOnline = [];
  test.forEach(function(Obj) {
    if (Obj.avail) {
      filterOnline.push(Obj);
    }
  });
  $scope.onlineUsers = filterOnline;
});
app.controller('OfflineCtrl', function($scope) {
  var filterOffline = [];
  test.forEach(function(Obj) {
    if (!Obj.avail) {
      filterOffline.push(Obj);
    }
  });
  $scope.offlineUsers = filterOffline;
});
$("#navbar li a").click(function(event) {
  $("#navbar").removeClass("in").addClass("collapse");
});