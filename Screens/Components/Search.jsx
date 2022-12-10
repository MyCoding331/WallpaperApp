import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Searchbar } from "react-native-paper";
const Seach = ({redirect}) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const searchEnter = () => {
    if (title !== "") {
      // setIsActive(false);
      navigate( redirect ? "/search2/" + title :  "/search/" + title);
    }
  };
  const handleClose = () => {
    // setIsActive(false);
    allowScroll();
  };
  return (
    <View className="main">
      <View style={styles.inputContainer}>
        <Searchbar
          type="text"
          required
          placeholder={"Enter the name of the anime"}
          value={title}
          autoFocus={true}
          onChangeText={(text) => {
            setTitle(text);
          }}
          onSubmitEditing={() => {
            searchEnter();
          }}
          
          blurOnSubmit={true}
          enablesReturnKeyAutomatically={true}
          returnKeyType="search"
          style={styles.input}
          loading={true}
        
        />
      </View>
      <View>
        {title !== "" && (
          <View>
            <Link
              to={"/search/" + title}
              // onPress={() => {
              //   setIsActive(false);
              // }}
            >
              {/* <Text>

        <Icon name={ "close"} size={24} color="#000"  />
        </Text> */}
              <View></View>
            </Link>
          </View>
        )}
        {/* {title === "" &&   <Icon name={ "search1"} size={24} color="#000"  />} */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 25,
  },

  input: {
    height: 40,
    marginHorizontal: 22,
    marginVertical:10,

    padding: 2,
  },
});

export default Seach;
