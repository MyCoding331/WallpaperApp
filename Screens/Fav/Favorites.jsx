import {
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Feather from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { FlatGrid } from "react-native-super-grid";

import FavCard from "./FavCard";

import Drawer from "../Components/Drawer";
import { useBackHandler } from "@react-native-community/hooks";
import { Link, useNavigate } from "react-router-native";
import * as NavigationBar from "expo-navigation-bar";
import ActivityLoader from "../Components/ActivityLoader";
import Logo from "../Components/Logo";
const Favorites = ({ navigation }) => {
  const items = useSelector((state) => state.cart);
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const [menu, setMenu] = useState(false);

  const [currentTab, setCurrentTab] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigate();

  const BackPress = () => {
    navigate(-1);
  };
  useBackHandler(
    useCallback(() => {
      if (BackPress() !== true) return true;
    }, [BackPress])
  );
  useEffect(() => {
    naviBar();
    setLoading(false);
  }, []);

  async function naviBar() {
    await NavigationBar.setBackgroundColorAsync("#ffffff00");
  }
  const styles = StyleSheet.create({
    container: {
      // flex: 5,
      backgroundColor: "#5359D1",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: ScreenHeight + 80,
    },
  });
  return (
    <>
      {loading && <ActivityLoader />}
      {!loading && (
        <SafeAreaView style={styles.container}>
          <View style={{ justifyContent: "flex-start", padding: 15 }}>
          <Link to={"/"} underlayColor={"none"}>
            <Logo color={"#fff"} marginTop={35} fontSize={25}/>
            </Link>

            <View style={{ flexGrow: 1, marginTop: 50 }}>
              <Drawer
                menu={showMenu}
                setMenu={setShowMenu}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
            </View>
          </View>

          <Animated.View
            style={{
              flexGrow: 1,
              backgroundColor: "white",
              position: "absolute",
              top: 0,
              bottom: -40,
              left: 0,
              right: 0,

              borderRadius: showMenu ? 15 : 0,
              overflow: "hidden",

              transform: [{ scale: scaleValue }, { translateX: offsetValue }],
            }}
          >
            <Animated.View
              style={{
                marginTop: 28,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomColor: "#000",
                borderBottomWidth: 0.5,
                transform: [
                  {
                    translateY: closeButtonOffset,
                  },
                ],
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(scaleValue, {
                    toValue: showMenu ? 1 : 0.88,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(offsetValue, {
                    toValue: showMenu ? 0 : 230,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(closeButtonOffset, {
                    toValue: !showMenu ? 0 : 0,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  setShowMenu(!showMenu);
                }}
              >
                <Feather
                  name={showMenu ? "close" : "menu"}
                  size={25}
                  color="#000"
                  style={{
                    width: 20,
                    height: 20,
                    margin: 15,
                    tintColor: "black",
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  marginRight: 18,
                  textTransform: "capitalize",
                  backgroundColor: "#5359D1",
                  paddingVertical: 2,
                  paddingHorizontal: 18,
                  borderRadius: 400,
                  
                  color: "#fff",
                }}
              >
                Favorites
              </Text>
            </Animated.View>
            {items.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  width: ScreenWidth,
                  height: ScreenHeight,
                  position: "relative",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: ScreenWidth / 4.8,
                    color: "#999999",
                  }}
                >
                  <Text style={{ color: "#999999", fontSize: 30 }}>
                    Add To Favorites
                  </Text>

                  <TouchableOpacity>
                    <Link to={"/"} underlayColor={"none"}>
                      <View
                        style={{
                          position: "absolute",
                          left: ScreenWidth / 7,
                          top: ScreenHeight / 50,
                          fontSize: 20,
                          padding: 12,
                          borderColor: "#999999",
                          borderWidth: 1,
                          borderRadius: 5,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Text>
                          <Feather
                            name={"home"}
                            size={20}
                            color="#000"
                            style={{
                              width: 20,
                              height: 20,
                              margin: 15,
                              tintColor: "black",
                            }}
                          />
                        </Text>
                        <Text style={{ marginLeft: 5, fontSize: 18 }}>
                          Browse
                        </Text>
                      </View>
                    </Link>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <FlatGrid
                  data={items}
                  itemDimension={ScreenWidth / 2.4}
                  spacing={10}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <FavCard image={item} index={index} />
                  )}
                  ListFooterComponent={<View style={{ height: 150 }}></View>}
                />
              </View>
            )}
          </Animated.View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Favorites;
