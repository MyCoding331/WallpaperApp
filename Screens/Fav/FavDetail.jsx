import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-native";
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
import { useBackHandler } from "@react-native-community/hooks";
import { useNavigate } from "react-router-native";
import Logo from "../Components/Logo";
const FavDetail = () => {
  const image = useParams().id;
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const [Add, setAdd] = useState(true);
  const [options, setOptions] = useState(true);
  const [menu, setMenu] = useState(true);
  const [resize, setResize] = useState(true);
  const [resImage, setResImage] = useState(true);
  const [visible, setVisible] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const Library = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const FavImage = `https://images.wallpapersden.com/image/download/${image}`;
  const handleAdd = (FavImage) => {
    setAdd(!Add);
    dispatch(add(FavImage));
  };
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, []);
  const handleOptions = () => {
    setTimeout(() => {
      setOptions(!options);
      setVisible(true);
    }, 1000);
    Download();
  };
  
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleSize = () => {
    setResize(!resize);
  };

  const handleRemove = (FavImage) => {
    dispatch(remove(FavImage));
  };

  const isExit = (FavImage) => {
    if (Library.filter((index) => index === FavImage).length > 0) {
      return true;
    }
  };
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    // TODO - Request CAMERA and CAMERA_ROLL permissions https://docs.expo.io/versions/latest/sdk/media-library/
    (async () => {
      const { status } = await requestPermission(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
      );

      setHasPermission(status === "granted");
    })();
  }, []);
  // console.log(item.Image.slice(0,-36))
  const Download = async () => {
    const downloadInstance = FileSystem.createDownloadResumable(
      `https://images.wallpapersden.com/image/download/${image}`,
      FileSystem.documentDirectory + `${image}`
    );

    const result = await downloadInstance.downloadAsync();
    // console.log(result.uri)

    const asset = await MediaLibrary.createAssetAsync(result.uri);

    MediaLibrary.createAlbumAsync("WallpaperApp", asset, false)
      .then(() => console.log("File Saved Successfully"))
      .catch(() => console.log("Error in saving file"));
  };
  const navigate = useNavigate();

  const BackPress = () => {
    navigate(-1);
  };
  useBackHandler(
    useCallback(() => {
      if (BackPress() !== true) return true;
    }, [BackPress])
  );

  return (
    <>
      <View style={{ position: "relative" }}>
        <View style={{ position: "absolute", marginTop: 35,marginLeft:35, }}>
        <Image
        style={{height:40,width:40,}}
        source={require("../../assets/logo.png")}
      />
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
            source={{
              uri: `https://images.wallpapersden.com/image/download/${image}`,
            }}
          
            
            style={{
              // width: ScreenWidth,
              // height: ScreenHeight + 100,
              width: resize ? ScreenWidth / 1.2 : ScreenWidth,
              height: resize ? ScreenHeight / 1.1 : ScreenHeight + 100,
              objectFit: resize ? "contain" : "cover",
              borderRadius: 12,
            }}
          />

          {/* <Text>{item.title}</Text> */}
          {/* <Text>{image}</Text> */}
          <View
            style={
              {
                // position: "absolute",
                // bottom: 60,
                // right: ScreenWidth / 3.5,
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
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
                  bottom: resize ? 100 : 200,
                  left: resize ? ScreenWidth / 1.8 : ScreenWidth / 1.5,
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
            }}
          >
            {isExit(FavImage) ? (
              <TouchableOpacity
                onPress={() => handleRemove(FavImage)}
                // style={{ position: "absolute", bottom: 100, left: ScreenWidth / 3.5 }}
              >
                <Icon name={"heart"} size={25} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleAdd(FavImage)}
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
            <View
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: "absolute",
                bottom: 230,
                left: ScreenWidth / 5.2,
                
                
                

              }}
            >
              {visible ? (
                <Text
                  style={{
                    backgroundColor: "#808080",
                    paddingVertical: 12,
                    paddingHorizontal: 25,
                    borderRadius: 100,
                    fontSize: 14,
                    color: "#fff",
                    opacity: 0.9,
                    alignSelf:"center"
                  }}
                >
                  downloading....
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default FavDetail;
