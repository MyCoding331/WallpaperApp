import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Link } from 'react-router-native';
import React from 'react'

const HomeCard = ({ item, index }) => {
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  return (
    <>
      


        <View >
          <Link to={'/detail' + `${item.id}`} underlayColor={"none"} >

            <View
              style={{
                marginTop: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${item.image}` }}
                style={{
                  width: ScreenWidth / 2.2,
                  height: ScreenHeight / 2.7,
                  backgroundColor: "#979af3",


                  borderRadius: 13,
                }}
                resizeMode="cover"
              />
              {/* <Text>{item.title}</Text> */}
              {/* <Text>{item.id}</Text> */}
            </View>

          </Link>


        </View>
      
       
     
    </>
  )
}

export default HomeCard