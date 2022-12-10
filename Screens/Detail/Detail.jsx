import { View, Text, FlatList, Dimensions,ActivityIndicator } from "react-native";
import React, { useState, useEffect,useCallback } from "react";
import axios from "react-native-axios";
import DetailCard from "./DetailCard";
import { Permissions, FileSystem } from "expo";
import * as NavigationBar from 'expo-navigation-bar';
import { useParams } from "react-router-native";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { StatusBar } from "expo-status-bar";
import ActivityLoader from "../Components/ActivityLoader";
const Detail = ({ route }) => {
  const Id = useParams().id;

  const [data, setData] = useState([]);
  const [resolution, setResolution] = useState("320x480");
  useEffect(() => {
    wallpapers();
  }, []);

  async function wallpapers() {
    let res = await axios.get(
      `https://wallpaperapi.vercel.app/api/wallpaper/detail/${Id}/${resolution}`
    );
    let Data = res.data.orignalImage;
    setLoading(false);
    setData(Data);
  }
  const navigate = useNavigate();

  const BackPress = () => {
    navigate(-1);
  }
  useBackHandler(useCallback(()=>{
    if (BackPress() !== true)
return true
  },
 
  [BackPress]
  
  ));
  
  // useEffect(() => {
  //   naviBar()
  
   
  // }, [])
  
  
  // async function naviBar() {
     
   
  //   await NavigationBar.setBehaviorAsync('overlay-swipe')
  //   await NavigationBar.setBackgroundColorAsync('#ffffff00')
  //   await NavigationBar.setVisibilityAsync("hidden")
  // }
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(true);
  return (
    <>
     {loading && ( <ActivityLoader/>
        )}
        {!loading && (

    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: ScreenHeight + 100,
        zIndex:-1,
        elevation:-2,
        // backgroundColor:"#808080",
        width:ScreenWidth,
        
        
      }}
    >
      <FlatList
        data={data}
        horizontal={false}
        // keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <DetailCard
            item={item}
            index={index}
            Id={Id}
            setResolution={setResolution}
            
          />
        )}
      />

      {/* {data.map((item,index) => {
        <View key={index}>
           <Image
              source={{ uri: `${item.Image[0]}` }}
              style={{ width: 180, height: 250,borderRadius:13, }}
            />
            <Text>{item.Image}</Text>
          </View>
      })} */}
    </View>
        )}
    
    </>
  );
};

export default Detail;
