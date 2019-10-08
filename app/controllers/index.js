$.win.open();
var Admob = require("ti.admob");

if (OS_ANDROID) {
  // then create an adMob view
  var adMobView = Admob.createBannerView({
    adUnitId: "ca-app-pub-3940256099942544/6300978111",
    testing: true, // default is false
    //top: 10, //optional
    //left: 0, // optional
    //right: 0, // optional
    bottom: 0, // optional
    width: "100%",
    height: 50,
    adBackgroundColor: "FF8855", // optional
    backgroundColorTop: "738000", //optional - Gradient background color at top
    borderColor: "#000000", // optional - Border color
    textColor: "#000000", // optional - Text color
    urlColor: "#00FF00", // optional - URL color
    linkColor: "#0000FF" //optional -  Link text color
    //primaryTextColor: "blue", // deprecated -- now maps to textColor
    //secondaryTextColor: "green" // deprecated -- now maps to linkColor
  });

  //listener for adReceived
  adMobView.addEventListener(Admob.AD_RECEIVED, function() {
    // alert("ad received");
    Ti.API.info("ad received");
  });

  //listener for adNotReceived
  adMobView.addEventListener(Admob.AD_NOT_RECEIVED, function() {
    //alert("ad not received");
    Ti.API.info("ad not received");
  });

  var adRequestBtn = Ti.UI.createButton({
    title: "Request an ad",
    top: "10%",
    height: "10%",
    width: "80%"
  });

  adRequestBtn.addEventListener("click", function() {
    adMobView.load({
      extras: {
        adBackgroundColor: "FF8855", // optional
        backgroundColorTop: "738000", //optional - Gradient background color at top
        borderColor: "#000000", // optional - Border color
        textColor: "#000000", // optional - Text color
        urlColor: "#00FF00", // optional - URL color
        linkColor: "#0000FF" //optional -  Link text color
      }
    });
  });

  var adRequestBtn2 = Ti.UI.createButton({
    title: "Request a test ad",
    top: "25%",
    height: "10%",
    width: "80%"
  });

  adRequestBtn2.addEventListener("click", function() {
    adMobView.requestTestAd();
  });

  var getAAID = Ti.UI.createButton({
    title: "Get AAID",
    top: "40%",
    height: "10%",
    width: "80%"
  });

  var getIsAdTrackingLimited = Ti.UI.createButton({
    title: "Is Ad tracking limited",
    top: "55%",
    height: "10%",
    width: "80%"
  });

  getAAID.addEventListener("click", function() {
    Admob.getAndroidAdId(function(data) {
      Ti.API.info("AAID is " + data.aaID);
    });
  });

  getIsAdTrackingLimited.addEventListener("click", function() {
    Admob.isLimitAdTrackingEnabled(function(data) {
      Ti.API.info("Ad tracking is limited: " + data.isLimitAdTrackingEnabled);
    });
  });

  // check if google play services are available
  var code = Admob.isGooglePlayServicesAvailable();
  if (code != Admob.SUCCESS) {
    alert("Google Play Services is not installed/updated/available");
  }

  // Create an Interstitial ad with a testing AdUnitId
  var interstitialAd = Admob.createInterstitialAd({
    adUnitId: "ca-app-pub-3940256099942544/1033173712"
  });

  // Add all listeners for the add.
  interstitialAd.addEventListener(Admob.AD_CLOSED, function() {
    Ti.API.info("Interstitial Ad closed!");
    // Once the Interstitial ad is closed disable the button
    // until another add is successfully loaded.
    showInterstitialAdButton.enabled = false;
    showInterstitialAdButton.touchEnabled = false;
    interstitialAd.load();
  });
  interstitialAd.addEventListener(Admob.AD_RECEIVED, function() {
    // When a new Interstitial ad is loaded, enabled the button.
    Ti.API.info("Interstitial Ad loaded!");
    showInterstitialAdButton.enabled = true;
    showInterstitialAdButton.touchEnabled = true;
  });
  interstitialAd.addEventListener(Admob.AD_CLICKED, function() {
    Ti.API.info("Interstitial Ad clicked!");
  });
  interstitialAd.addEventListener(Admob.AD_NOT_RECEIVED, function(e) {
    Ti.API.info("Interstitial Ad not received! Error code = " + e.errorCode);
  });
  interstitialAd.addEventListener(Admob.AD_OPENED, function() {
    Ti.API.info("Interstitial Ad opened!");
  });
  interstitialAd.addEventListener(Admob.AD_LEFT_APPLICATION, function() {
    Ti.API.info("Interstitial Ad left application!");
  });
  interstitialAd.load();

  var showInterstitialAdButton = Ti.UI.createButton({
    title: "Show Interstitial",
    top: "70%",
    height: "10%",
    width: "80%"
  });

  showInterstitialAdButton.addEventListener("click", function() {
    interstitialAd.show();
  });

  $.win.add(adMobView);
  $.win.add(adRequestBtn);
  $.win.add(adRequestBtn2);
  $.win.add(getAAID);
  $.win.add(getIsAdTrackingLimited);
  $.win.add(showInterstitialAdButton);
}

if (OS_IOS) {
  /*
 We'll make two ads. This first one doesn't care about where the user is located.
 */
  var ad1 = Admob.createView({
    height: 50,
    bottom: 0,
    debugEnabled: false, // SI à TRUE la pub de démo ne s'affiche pas If enabled, a dummy value for `adUnitId` will be used to test
    adType: Admob.AD_TYPE_BANNER,
    adUnitId: "ca-app-pub-3940256099942544/2934735716", // You can get your own at http: //www.admob.com/
    adBackgroundColor: "black",
    testDevices: [Admob.SIMULATOR_ID] // You can get your device's id by looking in the console log
    //dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
    //gender: Admob.GENDER_MALE, // GENDER_MALE, GENDER_FEMALE or GENDER_UNKNOWN, default: GENDER_UNKNOWN
    //contentURL: "https://admob.com", // URL string for a webpage whose content matches the app content.
    //requestAgent: "Titanium Mobile App", // String that identifies the ad request's origin.
    /*extras: {
    version: 1.0,
    name: "My App"
  }, // Object of additional infos
  tagForChildDirectedTreatment: false, // http:///business.ftc.gov/privacy-and-security/childrens-privacy for more infos
  keywords: ["keyword1", "keyword2"]*/
  });
  $.win.add(ad1);

  ad1.addEventListener("didReceiveAd", function(e) {
    Ti.API.info("Did receive ad: " + e.adUnitId + "!");
  });
  ad1.addEventListener("didFailToReceiveAd", function(e) {
    Ti.API.error("Failed to receive ad: " + e.error);
  });
  ad1.addEventListener("willPresentScreen", function() {
    Ti.API.info("Presenting screen!");
  });
  ad1.addEventListener("willDismissScreen", function() {
    Ti.API.info("Dismissing screen!");
  });
  ad1.addEventListener("didDismissScreen", function() {
    Ti.API.info("Dismissed screen!");
  });
  ad1.addEventListener("willLeaveApplication", function() {
    Ti.API.info("Leaving the app!");
  });

  var btn = Ti.UI.createButton({
    title: "Show interstitial"
  });

  btn.addEventListener("click", function() {
    var ad2 = Admob.createView({
      debugEnabled: false, // If enabled, a dummy value for `adUnitId` will be used to test
      adType: Admob.AD_TYPE_INTERSTITIAL,
      adUnitId: "ca-app-pub-3940256099942544/4411468910", // You can get your own at http: //www.admob.com/
      testDevices: [Admob.SIMULATOR_ID] // You can get your device's id by looking in the console log
      //dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
      //gender: Admob.GENDER_MALE, // GENDER_MALE or GENDER_FEMALE, default: undefined
      //keywords: ["keyword1", "keyword2"]
    });

    ad2.addEventListener("didReceiveAd", function(e) {
      Ti.API.info("Did receive ad!");
    });

    ad2.addEventListener("willDismissScreen", function(e) {
      Ti.API.info("Did willDismissScreen ad!");
    });

    ad2.addEventListener("didDismissScreen", function(e) {
      Ti.API.info("Did didDismissScreen ad!");
    });

    ad2.addEventListener("didFailToReceiveAd", function(e) {
      Ti.API.error("Failed to receive ad: " + e.error);
    });

    ad2.receive();
  });

  $.win.add(btn);
}

var admobrewarded = require("net.birdirbir.admobrewarded");

var instance = admobrewarded.createAd({
  adUnitID: OS_IOS
    ? "ca-app-pub-3940256099942544/1712485313"
    : "ca-app-pub-3940256099942544/5224354917"
});

// Add listeners. Note that you need to show the ad after the
// AD_REWARDED_VIDEO_AD_LOADED event.
instance.addEventListener(admobrewarded.AD_REWARDED, function(e) {
  Ti.API.warn("reward amount: ", e.rewardAmount);
  Ti.API.warn("reward type: ", e.rewardType);
});
instance.addEventListener(
  admobrewarded.AD_REWARDED_VIDEO_LEFT_APPLICATION,
  function() {
    Ti.API.warn("left application");
  }
);
instance.addEventListener(
  admobrewarded.AD_REWARDED_VIDEO_AD_CLOSED,
  function() {
    Ti.API.warn("ad closed");
  }
);
instance.addEventListener(
  admobrewarded.AD_REWARDED_VIDEO_FAILED_TO_LOAD,
  function(e) {
    Ti.API.warn("ad failed to load: ", e.errorCode);
  }
);
instance.addEventListener(
  admobrewarded.AD_REWARDED_VIDEO_AD_LOADED,
  function() {
    Ti.API.warn("video ad loaded");
    instance.show();
  }
);
instance.addEventListener(
  admobrewarded.AD_REWARDED_VIDEO_AD_OPENED,
  function() {
    Ti.API.warn("video ad opened");
  }
);
instance.addEventListener(admobrewarded.AD_REWARDED_VIDEO_STARTED, function() {
  Ti.API.warn("video ad started");
});

// Load the ad.
instance.loadAd();
