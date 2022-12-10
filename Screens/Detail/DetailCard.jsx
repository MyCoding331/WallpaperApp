import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add, remove } from "../../Helper/redux/cartSlice";
import { useAppContext } from "../../Helper/Context";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import Logo from "../Components/Logo";
import ActivityLoader from "../Components/ActivityLoader";
import { Link } from "react-router-native";

const DetailCard = ({ item, index, Id, setResolution }) => {
  const [Add, setAdd] = useState(true);
  const [options, setOptions] = useState(true);
  const [menu, setMenu] = useState(true);
  const [resize, setResize] = useState(true);
  const [resImage, setResImage] = useState(true);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [visible, setVisible] = useState(false);
  const Library = useSelector((state) => state.cart);
  const { data, setData } = useAppContext();
  const SetAspect1 = () => {
    setResolution("320x480");
  };
  const image =
    `https://images.wallpapersden.com/image/download/` + `${item.Image}`;
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();

  const handleAdd = () => {
    setAdd(!Add);
    dispatch(add(image));
  };
  const handleRemove = (image) => {
    dispatch(remove(image));
  };
  

  const handleOptions = () => {
    setOptions(!options);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);

    Download();
  };
  
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleSize = () => {
    setResize(!resize);
  };
  const isExit = () => {
    if (Library.filter((index) => index === image).length > 0) {
      return true;
    }
  };

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
      );

      setHasPermission(status === "granted");
    })();
  }, []);

  const Download = async () => {
    const downloadInstance = FileSystem.createDownloadResumable(
      image,
      FileSystem.documentDirectory + `${item.Image}`
    );

    const result = await downloadInstance.downloadAsync();

    const asset = await MediaLibrary.createAssetAsync(result.uri);

    MediaLibrary.createAlbumAsync("AniWall", asset, false)
      .then(() => console.log("File Saved Successfully"))
      .then(
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        )
      )
      .then(visible ? "downloading" : "")
      .catch(() => console.log("Error in saving file"));
  };

  return (
    <>
      <View style={{ position: "relative" }}>
        <View style={{ position: "absolute", marginTop: 35 }}>
          <Link to={"/"} underlayColor={"none"}>
        <Image
        style={{height:45,width:45,}}
        source={require("../../assets/logo.png")}
      />
          </Link>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            height: ScreenHeight + 100,
            postion: "relative",
          }}
        >
          <Image
            source={{ uri: `${image}` }}
            resizeMode={resize ? "contain" : "cover" }
           
            style={{
              

                width:  ScreenWidth ,
                height: resize ? ScreenHeight / 2.5 : ScreenHeight + 100 , 
              alignSelf: "center",
              backgroundColor:"#f5f5f5"
            }}
           
          />

          <View
          
          >
            {!menu && (
              <View
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  width:resize? 75: 85,
                  height:30,
                  zindex: 50,
                  position: "absolute",
                  bottom: resize ? -100 : 200,
                  left: resize ? ScreenWidth / 1.55 : ScreenWidth / 1.5,
                  // left: ScreenWidth / 1.5,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  borderTopEndRadius:5,
                  borderBottomStartRadius:5,

                }}
              >
                <TouchableOpacity
                  onPress={() => handleSize()}
                  style={{
                    // position: "absolute",
                    // left: resize ? ScreenWidth / 3.2 : ScreenWidth / 2.4,
                    width: 70,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 120,
                    elevation: 120,
                  }}
                >
                  {resize ? (
                    <Text
                      style={{
                        color: "#000",
                        fontWeight:"500",
                        // borderBottomColor: "#000",
                        // borderBottomWidth: 1,
                        fontSize:12,
                      }}
                    >
                      CONTAIN
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#000",
                        fontWeight:"500",
                        // borderBottomColor: "#000",
                        // borderBottomWidth: 1,
                      }}
                    >
                      COVER
                    </Text>
                  )}
                 

                  {/* <View style={{borderColor: "black",
                  borderWidth: 1,
                  width: 40,
                  height:50,
                  zindex: 50,
                  position: "absolute",
                  bottom:  -10 ,
                  right:10,
                  backgroundColor: "#000",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100%",}}>

                </View>
                  <View style={{borderColor: "black",
                  borderWidth: 1,
                  width: 40,
                  height:50,
                  zindex: 50,
                  position: "absolute",
                  bottom:  -10 ,
                  right:-10,
                  
                  backgroundColor: "#000",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100%",}}>

                </View> */}
                 
                </TouchableOpacity>
                
              </View>
            )}
          </View>
         
            <View
              style={{
                position: "absolute",
                bottom: 120,
                justifyContent: "space-evenly",
                alignItems: "center",
               
                alignSelf:"center",
                width: resize ? ScreenWidth / 1.25 : ScreenWidth - 20,
                flexDirection: "row",
                zIndex: 100,
                // elevation: 100,
                backgroundColor: "#303030",
                borderRadius: 10000,
                // paddingHorizontal:15,
              }}
            >
              {isExit(image) ? (
                <TouchableOpacity
                  onPress={() => handleRemove(image)}
                  // style={{ position: "absolute", bottom: 100, left: ScreenWidth / 3.5 }}
                >
                  <Icon name={"heart"} size={25} color="red" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAdd()}
                  // style={{ position: "absolute", bottom: 100, left: ScreenWidth / 3.5 }}
                >
                  <Icon name={"heart-o"} size={25} color="#fff" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{
                  padding: 4,
                  height: 45,
                  width: 45,
                  marginVertical:3,
                  backgroundColor: "#404040",

                  borderRadius: 2000,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 12,
                }}
                onPress={() => handleOptions()}
              >
                <MaterialIcons
                  name={options ? "file-download" : "file-download-done"}
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleMenu()}
                // style={{ position: "absolute",
                //   bottom: 36,}}
              >
                <Ionicons
                  name={menu ? "md-menu" : "close"}
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
    
          <View
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              bottom: 230,
              left: ScreenWidth / 4.2,
            }}
          >
            {visible ? (
              <View style={{backgroundColor: "#808080",
              paddingVertical: 5,
              paddingHorizontal: 25,
              borderRadius: 100}}>
              <Text
                style={{
                  
                  fontSize: 16,
                  color: "#fff",
                  opacity: 1,
                  
                }}
              >
                downloading image....
              </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      {/* <StatusBar style={resize ? "dark" : "light"} backgroundColor={"transparent"} /> */}
    </>
  );
};

export default DetailCard;
