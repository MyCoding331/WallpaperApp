import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import drawer from "react-native-drawer";
import { Link } from "react-router-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { current } from "@reduxjs/toolkit";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
const Drawer = ({ menu, setMenu }) => {
  const [currentTab, setCurrentTab] = useState(false);
  
  
  
  const Sidebar = [
    // { display: "Home", to: "/", icon: "home" },
    { display: "Animals", to: "/animals", icon: "paw" },
    { display: "Nature", to: "/nature", icon: "leaf" },
    { display: "Games", to: "/games", icon: "gamepad" },
    { display: "Celebraties", to: "/celebraties", icon: "grin-stars" },
    { display: "Artist", to: "/artist", icon: "highlighter" },
    { display: "Movies", to: "/movies", icon: "video" },
    { display: "SuperHero", to: "/superhero", icon: "heartbeat" },
    { display: "Abstract", to: "/abstract", icon: "layer-group" },
    { display: "TvSeries", to: "/tv-series", icon: "tv" },
    { display: "Anime", to: "/anime", icon: "fire" },
    { display: "Fantasy", to: "/fantacy", icon: "hat-wizard" },
    { display: "Sports", to: "/sports", icon: "football-ball" },
    { display: "Minimalist", to: "/minimalist", icon: "star-of-life" },
    { display: "IndianCelebrities", to: "/indian-celeb", icon: "users" },
    { display: "3D", to: "/3d", icon: "cube" },
    { display: "HiTech", to: "/hi-tech", icon: "circle-notch" },
    { display: "Space", to: "/space", icon: "map-pin" },
    { display: "City", to: "/city", icon: "shield-alt" },
    { display: "Cars", to: "/cars", icon: "car" },
    { display: "Brands", to: "/brands", icon: "fill" },
    { display: "Man", to: "/man", icon: "male" },
    { display: "Quotes", to: "/quotes", icon: "quote-left" },
    { display: "Vector", to: "/vector", icon: "pencil-alt" },
    { display: "Other", to: "/other", icon: "mask" },
    { display: "Music", to: "/music", icon: "music" },
    { display: "Macro", to: "/macro", icon: "spa" },
    { display: "Holidays", to: "/holidays", icon: "cloud-moon" },
    { display: "Girls", to: "/girls", icon: "female" },
    { display: "Food", to: "/food", icon: "utensils" },
    { display: "Flowers", to: "/flowers", icon: "tree" },
  ];
  const [categories, setCategories] = useState(false);
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const handleCategoreis = () => {
    setCategories(!categories);
  };
  return (
    <>
      {menu && (
        <>
          <View>
            <ScrollView
              automaticallyAdjustContentInsets={true}
              persistentScrollbar={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <TouchableOpacity>
                  <Link to={"/"} underlayColor={"none"}>
                    <Text style={{ fontSize: 17,fontWeight:"500", marginVertical: 12,color:"#fff" }}>
                      Home
                    </Text>
                  </Link>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Link to={"/favourites"} underlayColor={"none"}>
                    <Text style={{ fontSize: 17,fontWeight:"500", marginVertical: 12,color:"#fff" }}>
                      Favorites
                    </Text>
                  </Link>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <Link to={"/searchBox"} underlayColor={"none"}>
                    <Text style={{ fontSize: 17,fontWeight:"500", marginVertical: 8,color:"#fff" }}>
                      search
                    </Text>
                  </Link>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => handleCategoreis()}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 17,fontWeight:"500", marginVertical: 12,color:categories ? "#000":"#fff", }}>
                    Categories
                  </Text>
                  <Text>
                    <MaterialIcons
                      name={categories ? "arrow-drop-up" : "arrow-drop-down"}
                      size={28}
                      color={ categories ? "#000":"#fff"}
                    />
                  </Text>
                </TouchableOpacity>
              </View>

              {categories && (
                <>
                  {Sidebar.map((item, index) => (
                    <TouchableOpacity key={index} onPress={()=> setCurrentTab(!currentTab)}>
                      <Link
                        to={item.to}
                     
                        underlayColor={"none"}
                        key={index}
                        
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 11,
                            backgroundColor:currentTab ? "white": "transparent",
                             borderRadius: 8,
                            marginTop: 15,
                          }}
                        >
                          <View
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              
                              color:   "#5359D1" ,
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={{
                                width: 25,
                                height: 25,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FontAwesome
                                name={item.icon}
                                size={18}
                                color="#303030"
                              />
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginLeft: 5,
                                color:  "white",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {item.display}
                            </Text>
                          </View>
                        </View>
                      </Link>
                    </TouchableOpacity>
                  ))}
                </>
              )}
              <View style={{ height: 250 }}></View>
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

export default Drawer;
