import { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "cookie", // Replace with your app's name
  slug: "cookie", // Replace with your app's slug
  version: "1.0.0", // Match the version in your `app.json`
  sdkVersion: "52.0.0", // Replace with the correct Expo SDK version
  platforms: ["ios", "android"],
  orientation: "portrait",

  android: {
    permissions: ["INTERNET"],
    googleServicesFile: process.env.GOOGLE_SERVICES ?? "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/images/cookie-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.asafz.cookie",
    versionCode: 1,
  },
  ios: {
    googleServicesFile:
      process.env.GOOGLE_SERVICE_INFO ?? "./GoogleService-Info.plist",
    supportsTablet: true,
    bundleIdentifier: "com.asafz.cookie",
    buildNumber: "1.0.0",
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
    icon: "./assets/images/cookie-icon.png",
    splash: {
      image: "./assets/images/cookie-icon.png",
      backgroundColor: "#ffffff",
    },
  },

  extra: {
    eas: {
      projectId: "64319bd5-21a7-4b8b-ba82-58b357d33b6c", // Add your EAS project ID
    },
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
  ],
});

export default defineConfig;
