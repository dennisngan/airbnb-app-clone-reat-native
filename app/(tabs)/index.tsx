import listingGeoData from "@/assets/data/airbnb-listings.geo.json";
import listingData from "@/assets/data/airbnb-listings.json";
import ExploreHeader, { categories } from "@/components/ExploreHeader";
import ListingBottomSheet from "@/components/ListingBottomSheet";
import ListingMap from "@/components/ListingMap";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

const Page = () => {
  const [category, setCategory] = useState<string>(categories[0].name);
  const items = useMemo(() => {
    return listingData as ListingData[];
  }, []);

  const geoItems = useMemo(() => {
    return listingGeoData as any;
  }, []);

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      {/* <Listing category={category} listings={items} /> */}
      <ListingMap listingGeoData={geoItems} />
      <ListingBottomSheet listingData={items} category={category} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 120,
  },
});

export default Page;
