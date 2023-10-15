import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions} from "react-native";
import { Icon } from "@rneui/base";
import colors from "../constants/colors";

export default function BottomTabCustom({ state, descriptors, navigation }) {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={styles.container}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Icon name={options.iconName} size={width > 600 ? 24 : 16} color={isFocused ? colors.PRIMARY : "#222"} /> 
            <Text style={{ color: isFocused ? colors.PRIMARY : "#222", textAlign: "center", 
              fontSize: width > 600 ? 16 : 12,
              marginTop: width > 600 ? 8 : 4,
          }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 100,
        backgroundColor: "#fff",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.05,
    },  
});

