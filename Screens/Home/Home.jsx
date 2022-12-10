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
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "react-native-axios";
import { FlatGrid } from "react-native-super-grid";
import { useAppContext } from "../../Helper/Context";
import HomeCard from "./HomeCard";
import { Link } from "react-router-native";
import Feather from "react-native-vector-icons/Ionicons";

import Drawer from "../Components/Drawer";
import ActivityLoader from "../Components/ActivityLoader";
import Logo from "../Components/Logo";
import Ionicons from "react-native-vector-icons/Ionicons"
// import LoadingIndicator from "../Components/LoadingIndicator";
import Search from "../Components/Search"
const Home = ({ navigation }) => {
  // const [data, setData] = useState([]);

  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data, setData } = useAppContext();
  const [currentTab, setCurrentTab] = useState("Home");

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
  const pageNo = Math.ceil(data.length / pageCount) + 1;
  async function wallpapers() {
    let res = await axios.get(
      // `https://wallpaperapi.vercel.app/api/wallpaper/latest/${Type}/page=${pageNo}`
      // `https://wallpaperapi.vercel.app/api/latestWallpaper/latest/page=${pageNo}`
      `https://wallpaperapi.vercel.app/api/wallpaper/latest`
    );
    let Data = res.data.wallpapers;
    setLoading(false);
    const merge = [...data, ...Data];
    setData(merge);
  }
  const fetchMoreData = async() => {
    let res = await axios.get(
      // `https://wallpaperapi.vercel.app/api/wallpaper/latest/${Type}/page=${pageNo}`
      `https://wallpaperapi.vercel.app/api/latestWallpaper/latest/page=${pageNo}`
      // `https://wallpaperapi.vercel.app/api/wallpaper/latest`
    );
    let Data = res.data.wallpapers;
    setLoading(false);
    const merge = [...data, ...Data];
    setData(merge);
  };
  let newData = data.filter((obj) => !(obj && Object.keys(obj).length === 0));
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
      {loading && (


          <ActivityLoader />


      )
      }
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
                marginTop: 18,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomColor:"#000",
                borderBottomWidth:0.5,
                marginRight:20,
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
              {/* <TouchableOpacity onPress={()=>handleSearch()}>


              <Ionicons name={searchOpen ? "close": "search"} size={22} color='#000' />

              </TouchableOpacity> */}
              <Logo  margin={4}/>
            </Animated.View>
            <View>
              {searchOpen && (

              <Search/>
              )}
            </View>

            <View>
              <FlatGrid
                data={newData}
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
                ListFooterComponent={<View style={{ height: 200 }}></View>}
              />
            </View>
          </Animated.View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Home;
