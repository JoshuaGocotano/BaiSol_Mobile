import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Material from "./Materials"; // Ensure this is the correct path to the Materials component
import Equipment from "./Equipment"; // Ensure this is the correct path to the Equipment component

const Layout = () => {
  // State to track which section is clicked
  const [showMaterials, setShowMaterials] = useState(false);
  const [showEquipment, setShowEquipment] = useState(false);

  // Function to handle the click event for Material
  const handleMaterialClick = () => {
    setShowMaterials(true); // Show Material
    setShowEquipment(false); // Hide Equipment
    console.log("Material button clicked, showMaterials:", true);
  };

  const handleEquipmentClick = () => {
    setShowEquipment(true); // Show Equipment
    setShowMaterials(false); // Hide Material
    console.log("Equipment button clicked, showEquipment:", true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView to enable horizontal scrolling for navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.boxContainer}
      >
        {/* Material Button */}
        <TouchableOpacity
          style={styles.materialBox}
          onPress={handleMaterialClick}
        >
          <Text style={styles.text}>Material</Text>
        </TouchableOpacity>

        {/* Equipment Button */}
        <TouchableOpacity
          style={styles.equipmentBox}
          onPress={handleEquipmentClick}
        >
          <Text style={styles.text}>Equipment</Text>
        </TouchableOpacity>

        {/* Request Supply Button (this is optional and doesn't do anything in your current setup) */}
        <TouchableOpacity style={styles.supplyBox}>
          <Text style={styles.text}>Request Supply</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Conditional Rendering of Material or Equipment */}
      <View style={styles.contentContainer}>
        {showMaterials && <Material />}
        {showEquipment && <Equipment />}
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f5f5f5",
  },
  boxContainer: {
    flexDirection: "row", // Align items in a row (horizontally)
    padding: 16,
    borderRadius: 20,
    paddingBottom: 10, // Optional: Background color to give a better contrast
  },
  materialBox: {
    width: 120, // Adjusted width for horizontal alignment
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFA500",
    elevation: 4,
    marginRight: 15,
  },
  equipmentBox: {
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFA500",
    elevation: 4,
  },
  supplyBox: {
    width: 140,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFA500",
    elevation: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contentContainer: {
    marginTop: 30, // Adds space above the content
    paddingHorizontal: 20, // Optional: Add some padding around the content
  },
});
