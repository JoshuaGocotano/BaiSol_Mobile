import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { Appbar, DataTable, TextInput, IconButton } from "react-native-paper";

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const data = [
    {
      id: 1,
      MatN: "Photovoltaic Panels",
      qty: 25,
      status: "Sambag 1, Cebu City",
    },
    { id: 2, MatN: "Solar Inverters", qty: 30, status: "Sambag 1, Cebu City" },
    {
      id: 3,
      MatN: "Panel Mounting Systems",
      qty: 35,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 4,
      MatN: "Energy Storage Batteries",
      qty: 20,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 5,
      MatN: "MPPT Charge Controllers",
      qty: 40,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 6,
      MatN: "DC/AC Wiring Cables",
      qty: 50,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 7,
      MatN: "Solar Combiner Boxes",
      qty: 15,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 8,
      MatN: "Grounding Rods & Accessories",
      qty: 60,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 9,
      MatN: "Solar Thermal Water Heaters",
      qty: 10,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 10,
      MatN: "Backup Battery Chargers",
      qty: 45,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 11,
      MatN: "Backup Battery Chargers",
      qty: 45,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 12,
      MatN: "Backup Battery Chargers",
      qty: 45,
      status: "Sambag 1, Cebu City",
    },
  ];

  const filteredData = data.filter((item) =>
    item.MatN.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView>
      {/* Scrollable Data Table */}
      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header style={styles.dataTableHeader}>
            <DataTable.Title style={styles.columnHeader}>ID</DataTable.Title>
            <DataTable.Title style={styles.columnHeader}>
              Materials Name
            </DataTable.Title>
            <DataTable.Title style={styles.columnHeader}>Qty</DataTable.Title>
            <DataTable.Title style={styles.columnHeader}>
              Assign
            </DataTable.Title>
          </DataTable.Header>

          {filteredData.map((item) => (
            <DataTable.Row key={item.id} style={styles.tableRow}>
              <DataTable.Cell style={styles.tableCell}>
                {item.id}
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>
                {item.MatN}
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>
                {item.qty}
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>
                {item.status}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Materials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background color
    padding: 10,
  },
  header: {
    backgroundColor: "#FFB74D", // Warm orange color
  },
  dataTable: {
    backgroundColor: "#fff", // White background for the table
    borderRadius: 8,
    elevation: 3, // Adds subtle shadow for a card-like effect
  },
  dataTableHeader: {
    backgroundColor: "#FF9800", // A more vibrant shade of orange for the header
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  columnHeader: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Light gray border for row separation
    paddingVertical: 10, // Vertical padding for better row spacing
  },
  tableCell: {
    fontSize: 14,
    color: "#333", // Dark text color for readability
    paddingVertical: 10, // Vertical padding for cell content
    paddingHorizontal: 15, // Horizontal padding for better cell separation
  },
});
