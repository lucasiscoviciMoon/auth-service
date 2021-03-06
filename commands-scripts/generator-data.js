 module.exports ={
    fb : [
            {
                filename: "{{ios_appDelegate}}",
                description: "configure AppDelegate.m",
                pattern: ['#import <React/RCTRootView.h>'],
                text: `#import <FBSDKCoreKit/FBSDKCoreKit.h>`,
                placement: "after",
            },
            {
                filename: "{{ios_appDelegate}}",
                pattern: [
                    "- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions",
                    "  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];",
                ],
                text: `  [[FBSDKApplicationDelegate sharedInstance] application:application
                                       didFinishLaunchingWithOptions:launchOptions];`
            },
            {
                filename: "{{ios_appDelegate}}",
                antipattern: [
                    "- (BOOL)application:(UIApplication *)application", 
                    "openURL:(NSURL *)url",
                    "options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options",
                ],
                pattern: ["@end"],
                text: `- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return YES;
}`,
            },
            {
                filename: "{{ios_appDelegate}}",
                pattern: [
                    "- (BOOL)application:(UIApplication *)application", 
                    "openURL:(NSURL *)url",
                    "options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options",
                    "return YES;"
                ],
                text: `    [[FBSDKApplicationDelegate sharedInstance] application:application
                                                 openURL:url
                                                 options:options]`,

            },
                        {
                filename: "{{ios_info}}",
                description: "configure Info.plist",
                antipattern: [
                    '<key>CFBundleURLTypes</key>'
                ],
                way: "bottom",
                pattern: ["</dict>"],
                text:`<key>CFBundleURLTypes</key>
<array>
</array>`,
                prepro: (text) => `<!--  AUTO GENERATED by auth-service -->\n${text}\n<!-- END AUTO GENERATED -->`,
            },
            {
                filename: "{{ios_info}}",
                pattern: [
                    '<key>CFBundleURLTypes</key>',
                    '<array>'
                ],
                ask:{appID:{message: "Please write your appCode from facebook", type:"text"}},
                text:`<dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fb{{appID}}</string>
    </array>
</dict>`,
            error:{checkErrorMessage: "fb CFBundleURLSchemes already exists"},
            stopIfCheckError: false,
            prepro: (text) => `<!--  AUTO GENERATED by auth-service -->\n${text}\n<!-- END AUTO GENERATED -->`,
            placement: "after",
            },{
                 filename: "{{ios_info}}",
                 antipattern: ["<key>FacebookAppID</key>"],
                 pattern:["</dict>"],
                 way: "bottom",
                 ask:{appID:{message: "Please write your appCode from facebook", type:"text"}},
                 error:{antiPatternMessage: "FacebookAppID already exists"},
                 stopIfAntiPatternError: false,
                text:`<key>FacebookAppID</key>
<string>{{appID}}</string>`,
            prepro: (text) => `<!--  AUTO GENERATED by auth-service -->\n${text}\n<!-- END AUTO GENERATED -->`,
            },{
                 filename: "{{ios_info}}",
                 antipattern: ["<key>FacebookDisplayName</key>"],
                 pattern:["</dict>"],
                 way: "bottom",
                 ask:{appName:{message: "Please write your Display Name from facebook", type:"text"}},
                 error:{antiPatternMessage: "FacebookDisplayName already exists"},
                text:`<key>FacebookDisplayName</key>
<string>{{appName}}</string>`,
            prepro: (text) => `<!--  AUTO GENERATED by auth-service -->\n${text}\n<!-- END AUTO GENERATED -->`,
            },{
                 filename: "{{ios_info}}",
                 antipattern: ["<key>LSApplicationQueriesSchemes</key>"],
                 pattern:["</dict>"],
                 way: "bottom",
                text:`<key>LSApplicationQueriesSchemes</key>
<array>
</array>`,
            prepro: (text) => `<!--  AUTO GENERATED by auth-service -->\n${text}\n<!-- END AUTO GENERATED -->`,
            },{
                 filename: "{{ios_info}}",
                 pattern:["<key>LSApplicationQueriesSchemes</key>",
                          "<array>"],
                text:`  <string>fbapi</string>
  <string>fb-messenger-share-api</string>
  <string>fbauth2</string>
  <string>fbshareextension</string>`,
            prepro: (text) => `<!--  AUTO GENERATED by auth-service -->\n${text}\n<!-- END AUTO GENERATED -->`,
            placement: "after",
            },
            {
                 filename: "{{android_strings}}",
                 antipattern:["^<string name='facebook_app_id'>.+<\/string>$"],
                 pattern:["</resources>"],
                 text:`<string name='facebook_app_id'>{{appID}}</string>`,
                 way: "bottom",
                 ask:{appID:{message: "Please write your appCode from facebook", type:"text"}},
                 error:{antiPatternMessage: "FacebookAppID already exists"},
            prepro: (text) => `<!--  AUTO GENERATED by auth-service -->\n${text}\n<!-- END AUTO GENERATED -->`,
            },
            {
                description: "Please add 'react-native-fbsdk' package: yarn add react-native-fbsdk",
                description_color: "blueBright"
            },
            {
                description: "Please install pods: npx pod-install",
                description_color: "blueBright"
            }
    ]
}
