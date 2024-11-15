import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Appbar } from "react-native-paper";

const Report = () => {
  const [image, setImage] = useState<string | null>(null);

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri); // Save the image URI
      }
    }
  };

  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Facilitator Submit Report" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {/* Container with border */}
        <View style={styles.card}>
          {/* Header */}
          <Text style={styles.headerText}>Facilitator Submit Report</Text>

          {/* Image Upload Section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Images</Text>

            <TextInput
              placeholder="Duration (e.g., 2 hours)"
              style={styles.input}
            />

            {/* Image Preview */}
            <View style={styles.imagePreview}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Text style={styles.noImageText}>No image selected</Text>
              )}
            </View>

            {/* Button to pick image */}
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Final Images</Text>

            <TextInput
              placeholder="Duration (e.g., 2 hours)"
              style={styles.input}
            />

            <View style={styles.imagePreview}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Text style={styles.noImageText}>No image selected</Text>
              )}
            </View>

            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ee9f27",
    borderEndWidth: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3c",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  imagePreview: {
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  noImageText: {
    color: "#9ca3af",
  },
  button: {
    backgroundColor: "#ee9f27",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#f1b04c",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default Report;
