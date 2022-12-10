import {
  View,
  Dimensions,

  Modal,
  Image,
  Animated,
  Easing
} from "react-native";
import React from "react";

const ActivityLoader = () => {
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const spinValue = new Animated.Value(0)


  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start()


  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (

      <View
        style={{
          alignItems: "center",
          marginTop: ScreenHeight / 2.2,
          justifyContent: "center",
          position:"relative",
        }}
      >

        <Animated.Image
          source={require("../../assets/loader.png")}
          style={{ width: 75, height: 75, transform: [{ rotate: spin }],}}
        />


      </View>

  );
};

export default ActivityLoader;
