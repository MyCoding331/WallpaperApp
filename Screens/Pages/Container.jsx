import {
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "react-native-axios";
import { FlatGrid } from "react-native-super-grid";
import { Link, useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import HomeCard from "../Home/HomeCard";
import Feather from "react-native-vector-icons/Ionicons";
import Search from "../Components/Search"
import Drawer from "../Components/Drawer";
import ActivityLoader from "../Components/ActivityLoader";
import Logo from "../Components/Logo";


const Container = ({ categ }) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [currentTab, setCurrentTab] = useState("Home");

  
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    wallpapers();
  }, []);
  
  const Type =   "date";
  const pageCount = 30;
  const pageNo = Math.ceil(data.length / pageCount) + 1;
  async function wallpapers() {
    let res = await axios.get(
      `https://wallpaperapi.vercel.app/api/wallpaper/${categ}`
      // `https://wallpaperapi.vercel.app/api/latestWallpaper/latest/page=${pageNo}`
    );
    let Data = res.data.wallpapers;
    setLoading(false);
    setRefreshing(false);
    const merge = [...data, ...Data];
    setData(merge);
  }
  const fetchMoreData = async() => {
    let res = await axios.get(
      // `https://wallpaperapi.vercel.app/api/wallpaper/${categ}/page=${pageNo}`
      `https://wallpaperapi.vercel.app/api/latestWallpaper/latest/page=${pageNo}`
    );
    let Data = res.data.wallpapers;
    setLoading(false);
    setRefreshing(false);
    const merge = [...data, ...Data];
    setData(merge);
  };
  let newData = data.filter((obj) => !(obj && Object.keys(obj).length === 0));
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const navigate = useNavigate();

  const BackPress = () => {
    navigate(-1);
  };
  useBackHandler(
    useCallback(() => {
      if (BackPress() !== true) return true;
    }, [BackPress])
  );
  const styles = StyleSheet.create({
    container: {
      // flex: 5,
      backgroundColor: "#5359D1",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: ScreenHeight + 80,
    },
  });
  const handleSearch =()=> {
    setSearch(!search)
  }
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
                borderBottomColor:"#000",
                borderBottomWidth:0.5,
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
                   
                    toValue: showMenu ? 0 : ScreenWidth /1.8,
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
                    tintColor: "black",
                  }}
                />
              </TouchableOpacity>
             
              {/* <Text
                style={{
                  fontSize: 18,
                  marginRight: 18,
                  textTransform: "capitalize",
                  backgroundColor: "#5359D1",
                  paddingVertical:2,
                  paddingHorizontal:15,
                  borderRadius:400,
                  
                  color:"#fff"
                }}
              >
                {categ}
              </Text> */}
             <TouchableOpacity onPress={()=>handleSearch()} style={{marginRight:15,}} >

              <Feather
                  name={ search ? "close" :  "search"}
                  size={22}
                  color="#000"
                  style={{
                    width: 22,
                    height: 22,
                    margin: 15,
                    
                    tintColor: "black",
                  }}
                  
                />
             </TouchableOpacity>
              
            </Animated.View>
            {search && (
                <Search/>
              )}
            <View>
              <FlatGrid
                data={newData}
                itemDimension={ScreenWidth / 2.4}
                spacing={10}
                horizontal={false}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.1}
              
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <HomeCard item={item} index={index} />
                )}
                ListFooterComponent={<View style={{ height: 200 }}></View>}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={wallpapers}
                  />
                }
              />
            </View>
          </Animated.View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Container;
