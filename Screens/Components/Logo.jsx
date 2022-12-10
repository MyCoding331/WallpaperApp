import { View, Text, Image } from "react-native";
import React from "react";
import logo from "../../assets/logo.png";

const Logo = ({ color, margin, marginRight,marginTop,fontSize,width,height }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        
        justifyContent: "center",
        alignItems: "center",
        marginRight: marginRight,
        marginTop:marginTop || 12,
      }}
    >
      <Image
        style={{ height:height|| 50, width:width || 50 }}
        source={require("../../assets/logo.png")}
      />
      <Text
        style={{
          fontSize: fontSize || 22,
          fontWeight: "500",
          color:  color || "#5359D1",
          marginTop: 10,
          letterSpacing: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        ANI
      </Text>
      <Text
        style={{
          marginLeft: 2,
          fontSize: fontSize || 22,
          fontWeight: "500",
          color: '#000',
          marginTop: 10,
          letterSpacing: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Wall
      </Text>
    </View>
  );
};

export default Logo;
