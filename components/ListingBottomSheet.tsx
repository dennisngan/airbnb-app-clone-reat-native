import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Listing from "./Listing";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  listingData: ListingData[];
  category: string;
}

const ListingBottomSheet = ({ listingData, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["8%", "100%"], []);
  const [refresh, setRefresh] = useState(0);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh+1)
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.handlerStyle}
    >
      <BottomSheetView style={styles.sheetContainer}>
        <Listing listings={listingData} category={category} refresh={refresh}/>
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={styles.btnText}>Map</Text>
            <Ionicons name="map" size={20} color={"#FFF"} />
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ListingBottomSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },

  handlerStyle: {
    backgroundColor: Colors.grey,
  },

  absoluteBtn: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },

  btn: {
    flexDirection: "row",
    backgroundColor: Colors.dark,
    borderRadius: 30,
    padding: 15,
    gap: 5,
    alignItems: "center",
  },

  btnText: {
    color: "#FFF",
    fontFamily: "mon-sb",
  },
});
