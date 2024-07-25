import listingData from "@/assets/data/airbnb-listings.json";
import ExploreHeader, { categories } from "@/components/ExploreHeader";
import Listing from "@/components/Listing";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

const Page = () => {
  const [category, setCategory] = useState<string>(categories[0].name);
  const items = useMemo(() => {
    return listingData as any;
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
      <Listing category={category} listings={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 130,
  },
});

export default Page;
