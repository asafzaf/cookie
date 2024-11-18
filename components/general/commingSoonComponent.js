import React, { useContext } from "react";
import { LanguageStringContext } from "../../store/language-context";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";

import styles from "../../styles/styles";

const ComingSoonComponent = () => {
  const { translations } = useContext(LanguageStringContext);
  return (
    <View style={styles.comingSoon}>
      <Text style={styles.comingSoonText}>
        {translations.general.coming_soon}
      </Text>
    </View>
  );
};

export default ComingSoonComponent;
