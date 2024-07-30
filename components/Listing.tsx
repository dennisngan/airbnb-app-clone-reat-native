import { defaultStyles } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  category: string;
  listings: any[];
  refresh: number;
}
const Listing = ({ category, listings: items, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null); 

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [category]);

  const renderRow: ListRenderItem<ListingData> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity style={styles.heart}>
            <Ionicons name="heart-outline" color={"#000"} size={24} />
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameText, { fontSize: 16 }]}>{item.name}</Text>
            <View style={styles.star}>
              <Ionicons name="star" size={16} />
              <Text style={styles.nameText}>
                {item.review_scores_rating
                  ? item.review_scores_rating / 20
                  : ""}
              </Text>
            </View>
          </View>
          <Text style={styles.smallText}>{item.room_type}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.nameText}>${item.price} </Text>
            <Text style={styles.smallText}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
        ListHeaderComponent={
          <Text style={styles.info}>{items.length} homes</Text>
        }
      />
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 20,
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },

  heart: {
    position: "absolute",
    right: 30,
    top: 30,
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  star: {
    flexDirection: "row",
    gap: 4,
  },

  nameText: {
    fontFamily: "mon-sb",
  },

  smallText: {
    fontFamily: "mon",
  },

  priceContainer: {
    flexDirection: "row",
  },

  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
});
