import React, { useState } from "react";
import { View } from "react-native";
import * as Device from "expo-device";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const iosAdMobBanner = "ca-app-pub-4302889545264887~1872723594";
const androidAdMobBanner = "ca-app-pub-4302889545264887~7768032196";

const ProductionID =
  Device.osName === "Android" ? androidAdMobBanner : iosAdMobBanner;

const BottomAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  return (
    <View style={{ height: isAdLoaded ? "auto" : 0, alignItems: "center" }}>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : ProductionID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log("Advert loaded");
          setIsAdLoaded(true);
        }}
      />
    </View>
  );
};

export default BottomAd;
