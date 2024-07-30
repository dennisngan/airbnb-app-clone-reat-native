import { defaultStyles } from "@/constants/styles";
import type { ListingGeo } from "@/interface/listingGeo";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

interface Props {
  listingGeoData: any;
}

const INITIAL_REGION = {
  latitude: 52.520008,
  longitude: 13.404954,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
const ListingMap = memo(({ listingGeoData }: Props) => {
  const router = useRouter();

  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <Text style={styles.cluster}>{points}</Text>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        // animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#FFF"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listingGeoData.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>$ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default ListingMap;

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "#FFF",
    padding: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 1 },
  },

  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },

  cluster: {
    backgroundColor: "orange",
    textAlign: "center",
    fontFamily: "mon-sb",
    padding: 5,
    borderRadius: 30,
  },
});
