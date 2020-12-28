#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <GoogleMaps/GoogleMaps.h> 
#import "RNSplashScreen.h"



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [GMSServices provideAPIKey:@"AIzaSyDhXP7hv5dj-HwKfkBn3a1cpDX_nlUg4kw"]; 
  
  
      NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

    [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
    [RNSplashScreen show];

   

    return YES;
}

@end
