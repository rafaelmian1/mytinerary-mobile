import React, { useEffect, useRef } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Carousel from "react-native-snap-carousel";
import carouselActions from "../redux/actions/carouselActions";
import Slide from "./Slide";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

const Home = (props) => {
  const [loaded] = useFonts({
    Lato: require("../assets/Lato-Light.ttf"),
  });

  const carouselRef = useRef(null);

  useEffect(() => {
    props.slides.length === 0 && props.getSlides(props);
    // return () => props.navigation.reset();
  }, []);

  if (!loaded) {
    return <AppLoading />;
  }

  const data =
    props.slides.length !== 0
      ? [...props.slides[0], ...props.slides[1], ...props.slides[2]]
      : [];

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("../assets/fondo.jpg")}
          style={styles.ImageBackground}
          resizeMode="cover"
        >
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>
              My
              <Text style={styles.brand}>Tinerary</Text>
            </Text>
            <View style={styles.sloganContainer}>
              <Text style={{ ...styles.brand, fontSize: 25.0 }}>
                Find your perfect trip, designed by insiders who know and love
                their cities!
              </Text>
            </View>

            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="white"
              style={styles.buttonContainer}
              onPress={() => {
                props.navigation.push("citiesStack", { bool: true });
              }}
            >
              <Text style={styles.button}>Explore</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>

        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text style={{ ...styles.brand, fontSize: 40 }}>
            Popular MyTineraries
          </Text>
        </View>
        {props.slides.length !== 0 && (
          <View style={styles.container}>
            <Carousel
              ref={carouselRef}
              layout={"default"}
              layoutCardOffset={18}
              hasParallaxImages={true}
              data={data}
              renderItem={({ item, index }, parallaxProps) => {
                return (
                  <Slide
                    item={item}
                    index={index}
                    parallaxProps={parallaxProps}
                  />
                );
              }}
              sliderHeight={Dimensions.get("window").width}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width - 60}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    slides: state.carousel.slides,
  };
};
const mapDispatchToProps = {
  getSlides: carouselActions.getSlides,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  ImageBackground: {
    height: Dimensions.get("window").height - 80,
    width: Dimensions.get("window").width,
  },
  brandContainer: {
    width: "100%",
    marginTop: "25%",
    paddingHorizontal: 5,
  },
  sloganContainer: {
    width: "75%",
    paddingLeft: 10,
  },
  brand: {
    fontFamily: "Lato",
    fontSize: 75,
    color: "#e6e1dd",
    textShadowColor: "black",
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 5,
  },
  container: {
    flex: 1,
    marginVertical: 30,
  },
  buttonContainer: {
    width: 200,
    padding: 10,
    marginLeft: "15%",
    marginTop: 30,
    backgroundColor: "#e6e1dd",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    color: "black",
    fontFamily: "Lato",
    fontSize: 40,
    textAlign: "center",
  },
});
