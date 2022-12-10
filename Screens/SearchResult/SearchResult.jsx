import {
  Button,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "react-native-axios";
import { FlatGrid } from "react-native-super-grid";
import { useAppContext } from "../../Helper/Context";
import HomeCard from "../Home/HomeCard";
import { useParams } from "react-router-native";
import Feather from "react-native-vector-icons/Ionicons";

import Drawer from "../Components/Drawer";
import ActivityLoader from "../Components/ActivityLoader";
import Logo from "../Components/Logo";
import Ionicons from "react-native-vector-icons/Ionicons"
// import LoadingIndicator from "../Components/LoadingIndicator";
import Search from "../Components/Search"
const SearchResult = ({ navigation }) => {
  // const [data, setData] = useState([]);
  const title = useParams().name;
  const [refresh, setRefresh] = useState(true);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  // const { data, setData } = useAppContext();
  // const [currentTab, setCurrentTab] = useState("Home");

  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    wallpapers();
  }, []);

  // const categories = "superheroes";

  const Type = "date";
  const pageCount = 30;
  const pageNo = Math.ceil(results.length / pageCount) + 1;
  async function wallpapers() {
    let res = await axios.get(
      // `https://wallpaperapi.vercel.app/api/wallpaper/latest/${Type}/page=${pageNo}`
      `https://wallpaperapi.vercel.app/api/searchWallpaper/keyword=${title}`
    );
    let Data = res.data.wallpapers;
    setLoading(false);
    setRefresh(false);
    const merge = [...results, ...Data];
    setResults(merge);
  }
  const fetchMoreData = async () => {
    let res = await axios.get(
      // `https://wallpaperapi.vercel.app/api/wallpaper/latest/${Type}/page=${pageNo}`
      `https://wallpaperapi.vercel.app/api/searchWallpaper/keyword=${title}/page=${pageNo}`
    );
    let Data = res.data.wallpapers;
    setLoading(false);
    setRefresh(false);
    const merge = [...results, ...Data];
    setResults(merge);
  };
  const newData = results.filter((obj) => !(obj && Object.keys(obj).length === 0));
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to  Exit App?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
            <Logo color={"#fff"} margin={30} />


            <View style={{ flexGrow: 1, marginTop: 50 }}>
              {
                // Tab Bar Buttons....
              }

              {/* <Text>HOME</Text>
          <Text>HOME</Text>
          <Text>HOME</Text>
          <Text>HOME</Text>
          <Text>HOME</Text>
          <Text>HOME</Text> */}
              <Drawer
                menu={showMenu}
                setMenu={setShowMenu}

              />
            </View>

            {/* <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
        </View> */}
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
              // paddingHorizontal: 15,
              // paddingVertical: 20,
              borderRadius: showMenu ? 15 : 0,
              overflow: "hidden",

              // Transforming View...
              transform: [{ scale: scaleValue }, { translateX: offsetValue }],
            }}
          >
            {/* <Text>Home screen</Text> */}
            {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('detail')}
      /> */}
            <Animated.View
              style={{
                marginTop: 18,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomColor: "#000",
                borderBottomWidth: 0.5,
                marginRight: 20,
                transform: [
                  {
                    translateY: closeButtonOffset,
                  },
                ],
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // Do Actions Here....
                  // Scaling the view...
                  Animated.timing(scaleValue, {
                    toValue: showMenu ? 1 : 0.88,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(offsetValue, {
                    // YOur Random Value...
                    toValue: showMenu ? 0 : 230,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(closeButtonOffset, {
                    // YOur Random Value...
                    toValue: !showMenu ? -0 : 0,
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

                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSearch()}>

                {/* <Logo color={'#000'} margin={10} marginRight={18} /> */}
                <Feather name={searchOpen ? "close" : "search"} size={22} color='#000' />
                {/* <Search /> */}
              </TouchableOpacity>
            </Animated.View>
            <View>
              {searchOpen && (

                <Search refresh={refresh} setRefresh={setRefresh} redirect={"redirect"} />
              )}
            </View>

            {results.length !== 0 ? (

              <View>
                <FlatGrid
                  data={results}
                  itemDimension={ScreenWidth / 2.26}
                  spacing={10}
                  horizontal={false}
                  onEndReached={fetchMoreData}
                  onEndReachedThreshold={0.1}
                  // keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <HomeCard item={item} index={index} />
                  )}
                  ListFooterComponent={<View style={{ height: 150 }}></View>}
                  onRefresh={wallpapers}
                  refreshing={refresh}

                />
              </View>
            ) : (
              <View style={{ width: ScreenWidth, height: ScreenHeight, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25 }}>No Result Found</Text>
              </View>
            )}
          </Animated.View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SearchResult;
