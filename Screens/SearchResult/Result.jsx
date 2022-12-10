import { View, Text, Image,Dimensions,Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'react-router-native'

const Result = ({item}) => {
  let ScreenWidth = Dimensions.get("window").width;
  const AnimatedLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);
  return (
    <>
    <View style={{ objectFit: "cover",justifyContent:"center",alignItems:"center",marginBottom:10 }}>
    
      <Link to={`${item.link}`} underlayColor={"none"} >
        <View  style={{ height: 260, position: "relative" }}>

        <View style={{ maxWidth: 180, height: 260 }}>
        

        <Image source={{uri: `${item.image}`}}   style={{ width: 180, height: 260, borderRadius: 5,elevation: -5,borderWidth:1,borderColor:"black" }}/>
            
        </View>
        <Text  style={{
                marginLeft: 3,
                color: "#fff",
                position: "absolute",
                bottom: 10,
                left:5,
                width:170,
              }}>{item.title}</Text>
        </View>


      </Link>
      
    </View>
    </>
  )
}

export default Result