import React, { useEffect } from "react";
import { Text, View } from "react-native";

interface Props {
  category: string;
  listings: any[];
}
const Listing = ({ category, listings }: Props) => {
  useEffect(() => {
    console.log("reload listing", category, listings.length);
  }, [category]);

  return (
    <View>
      <Text>Listing</Text>
    </View>
  );
};

export default Listing;
