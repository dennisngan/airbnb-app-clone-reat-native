import { places } from "@/assets/data/places";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
//@ts-ignore
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const Page = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(1);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const today = new Date().toISOString().substring(0, 10);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };

  return (
    <BlurView intensity={70} style={styles.headerContainer} tint="light">
      <View style={styles.card}>
        {/* Where */}
        {openCard !== 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="search" size={20} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destination"
                />
              </View>
            </Animated.View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 25,
                paddingLeft: 20,
                marginBottom: 30,
              }}
            >
              {places.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPlace(index)}
                >
                  <Image
                    source={item.img}
                    style={
                      selectedPlace === index
                        ? styles.placeSelected
                        : styles.place
                    }
                  />

                  <Text
                    style={
                      selectedPlace === index
                        ? styles.selectedPlaceTitle
                        : styles.placeTitle
                    }
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      <View style={styles.card}>
        {/* When */}
        {openCard !== 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any Week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                options={{
                  defaultFont: "mon",
                  headerFont: "mon-sb",
                  backgroundColor: "#FFF",
                  mainColor: Colors.primary,
                  borderColor: "transparent",
                }}
                current={today}
                selected={today}
                mode="calendar"
                style={{ borderRadius: 10 }}
              />
            </Animated.View>
          </>
        )}
      </View>

      <View style={styles.card}>
        {/* Who */}
        {openCard !== 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 2 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Who's coming?
            </Animated.Text>
            <Animated.View style={styles.cardBody}></Animated.View>
          </>
        )}
      </View>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={onClearAll}>
            <Text style={styles.footerText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, styles.footerBtn]}
          >
            <Ionicons name="search-outline" color={"#FFF"} size={24} />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: Platform.OS === "android" ? "#ffffffc7" : "",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    fontSize: 18,
    fontFamily: "mon-sb",
    textDecorationLine: "underline",
  },

  footerBtn: {
    paddingHorizontal: 20,
    gap: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },

  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },

  previewDate: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.dark,
  },

  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  cardHeader: {
    fontFamily: "mon-sb",
    fontSize: 24,
    padding: 20,
  },

  cardBody: {
    paddingHorizontal: 20,
  },

  searchSection: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ABABAB",
    backgroundColor: "#FFF",
    borderRadius: 8,
    height: 50,
    marginBottom: 16,
  },

  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
  },

  searchIcon: {
    padding: 10,
  },

  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },

  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  placeTitle: {
    fontFamily: "mon",
    paddingTop: 6,
  },

  selectedPlaceTitle: {
    fontFamily: "mon-sb",
    paddingTop: 6,
  },
});
