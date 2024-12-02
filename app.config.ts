export default {
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES ?? "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/cookie-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.asafz.cookie",
      versionCode: 1
    },
    ios: {
      googleServicesFile: process.env.GOOGLE_SERVICE_INFO ?? "./GoogleService-Info.plist",
      supportsTablet: true,
      bundleIdentifier: "com.asafz.cookie",
      buildNumber: "1.0.0",
    },
  };
  