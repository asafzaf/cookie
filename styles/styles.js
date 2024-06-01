import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  colors: {
    primary: "#8C8C8CE2",
    black: "#0D0D0D",
  },
  text: {
    size: {
      small: 18,
      medium: 20,
      large: 24,
    },
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  item: {
    flexDirection: "row",
    gap: "25%",
    padding: 10,
    fontSize: 18,
    width: "100%",
    height: "15%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#8C8C8CE2",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  recipeItem: {
    flexDirection: "col",
    paddingTop: 10,
    width: "100%",
    // height: "25rem",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#8C8C8CE2",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  recipeItemInner: {
    flexDirection: "row",
    gap: "25%",
    padding: 20,
    fontSize: 18,
    width: "100%",
    borderColor: "#8C8C8CE2",
    alignItems: "center",
    justifyContent: "center",
  },
  recipeImageItem: {
    width: "80%",
    height: "100%",
    borderRadius: 15,
  },
});
