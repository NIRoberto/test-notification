import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Notifications from "expo-notifications";

import { useEffect, useState } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const requestPermissions = async () => {
    try {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        alert("You need to enable permissions in settings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "dfa4cc7b-cd15-413b-bde8-6b4834773852",
      });
      setExpoPushToken(token.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestPermissions();
    getToken();
  }, []);

  const handlePress = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "My first local notification",
          body: "This is the body of the notification",
          data: { data: "goes here" },
        },
        trigger: {
          seconds: 1,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: "blue",
          padding: 20,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Click me
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
