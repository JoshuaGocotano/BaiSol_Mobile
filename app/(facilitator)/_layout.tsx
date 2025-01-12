import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { useColorScheme } from "react-native";
import { users } from "../../constants/SampleData";
import { useAuth } from "../auth-context";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => (
  <View
    className="items-center justify-center gap-2"
    style={{ width: 100, paddingTop: 30 }}
  >
    <Image
      source={icon}
      resizeMode="contain"
      style={{ tintColor: color }}
      className="w-6 h-6"
    />
    <Text
      style={{
        fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular",
        color: color,
      }}
      className="text-xs"
    >
      {name}
    </Text>
  </View>
);

const TabsLayout: React.FC = () => {
  const colorScheme = useColorScheme();
  const isLightMode = colorScheme === "light";

  const tabs = [
    { name: "facilitator-home", title: "Home", icon: icons.home },
    { name: "reports", title: "Reports", icon: icons.reports },
    { name: "supply", title: "Supply", icon: icons.supply },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF9C01",
        tabBarInactiveTintColor: isLightMode ? "#666666" : "#CDCDE0",
        tabBarStyle: {
          backgroundColor: isLightMode ? "#FFFFFF" : "#161622",
          borderTopWidth: 1,
          borderTopColor: isLightMode ? "#E0E0E0" : "#232533",
          height: 84,
          justifyContent: "center",
        },
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icon}
                color={color}
                name={title}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
