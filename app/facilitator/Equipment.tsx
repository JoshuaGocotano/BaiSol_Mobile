import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
      MatN: "Solar Mounting Racks",
      qty: 35,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 4,
      MatN: "Battery Storage Systems",
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
      MatN: "Solar Cables (DC/AC)",
      qty: 50,
      status: "Sambag 1, Cebu City",
    },
    { id: 7, MatN: "Combiner Boxes", qty: 15, status: "Sambag 1, Cebu City" },
    {
      id: 8,
      MatN: "Grounding Kits & Accessories",
      qty: 60,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 9,
      MatN: "Solar Thermal Collectors",
      qty: 10,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 10,
      MatN: "Backup Inverters",
      qty: 45,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 11,
      MatN: "Backup Inverters",
      qty: 45,
      status: "Sambag 1, Cebu City",
    },
    {
      id: 12,
      MatN: "Backup Inverters",
      qty: 45,
      status: "Sambag 1, Cebu City",
    },
  ];

  const filteredData = data.filter((item) =>
    item.MatN.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.dataTableHeader}>
              <DataTable.Title style={styles.columnHeader}>ID</DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>
                Equipment Name
              </DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>
                Quantity
              </DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>
                Assigned
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
      </View>
    </SafeAreaView>
  );
};

export default Equipment;

const styles = StyleSheet.create({
  dataTable: {
    backgroundColor: "#fff", // White background for the table
    borderRadius: 8,
    elevation: 3, // Adds subtle shadow for a card-like effect
  },
  dataTableHeader: {
    backgroundColor: "#FF9800", // A more vibrant shade of orange for the header
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontSize: 14,
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
