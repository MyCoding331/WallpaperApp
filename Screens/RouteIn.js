import { View, Text, SafeAreaView, Dimensions } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from "react"
import { NativeRouter, Route, Routes,MemoryRouter } from "react-router-native";

import Detail from "./Detail/Detail";

import Favourite from "./Fav/Favorites";
import Home from "./Home/Home";
import { Abstract, Animals, Anime, Artist, Brands, Cars, City, Clebrities, Fantasy, Flowers, Food, Games, Girls, HiTech, Holidays, IndianCelebrities, Man, Marco, Minimalist, Movies, Music, Nature, Other, Quotes, Space, Sports, SuperHero, ThreeD, TvSeries, Vector } from "./Pages/Categories";

import FavDetail from "./Fav/FavDetail";
import SearchResult from "./SearchResult/SearchResult";
import Search from "./Components/Search";
import SearchResult2 from "./SearchResult/SearchResult2";
// import * as Font from 'expo-font';


const RouteIn = () => {

  let ScreenHeight = Dimensions.get("window").height;
  useEffect(() => {
    naviBar()


  }, [])
  async function naviBar() {

    // await Font.loadAsync({
    //   'Font1': require('../assets/fonts/LouisGeorgeCafe.ttf'),
    // });

    await NavigationBar.setButtonStyleAsync("dark"),
    await NavigationBar.setBackgroundColorAsync("#ffffff")
    // await NavigationBar.setVisibilityAsync("hidden")
  }
  return (

    <View style={{
      height: ScreenHeight, zIndex: -1,
      elevation: -1,

    }}>

      <MemoryRouter>



        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/favDetail/:id" element={<FavDetail />} />
          <Route exact path="/searchBox" element={<Search />} />
          <Route exact path="/search/:name" element={<SearchResult />} />
          <Route exact path="/search2/:name" element={<SearchResult2 />} />
          <Route exact path="/favourites" element={<Favourite />} />
          <Route exact path="/animals" element={<Animals />} />
          <Route exact path="/nature" element={<Nature />} />
          <Route exact path="/games" element={<Games />} />
          <Route exact path="/celebraties" element={<Clebrities />} />
          <Route exact path="/artist" element={<Artist />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/superhero" element={<SuperHero />} />
          <Route exact path="/abstract" element={<Abstract />} />
          <Route exact path="/tv-series" element={<TvSeries />} />
          <Route exact path="/anime" element={<Anime />} />
          <Route exact path="/fantacy" element={<Fantasy />} />
          <Route exact path="/sports" element={<Sports />} />
          <Route exact path="/minimalist" element={<Minimalist />} />
          <Route exact path="/indian-celeb" element={<IndianCelebrities />} />
          <Route exact path="/3d" element={<ThreeD />} />
          <Route exact path="/hi-tech" element={<HiTech />} />
          <Route exact path="/space" element={<Space />} />
          <Route exact path="/city" element={<City />} />
          <Route exact path="/cars" element={<Cars />} />
          <Route exact path="/brands" element={<Brands />} />
          <Route exact path="/man" element={<Man />} />
          <Route exact path="/quotes" element={<Quotes />} />
          <Route exact path="/vector" element={<Vector />} />
          <Route exact path="/other" element={<Other />} />
          <Route exact path="/music" element={<Music />} />
          <Route exact path="/macro" element={<Marco />} />
          <Route exact path="/holidays" element={<Holidays />} />
          <Route exact path="/girls" element={<Girls />} />
          <Route exact path="/food" element={<Food />} />
          <Route exact path="/flowers" element={<Flowers />} />
        </Routes>


      </MemoryRouter>
    </View>

  );
};

export default RouteIn;
