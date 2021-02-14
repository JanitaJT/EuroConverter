import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [rates, setRates] = useState({});
  const [toConvert, setToConvert] = useState("");
  const [currency, setCurrency] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    let url = "https://api.exchangeratesapi.io/latest";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
        console.log(data.rates);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }, []);

  const convert = () => {
    let result = toConvert * rates[currency];
    setResult(result);
  };
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        value={toConvert}
        placeholder="Amount"
        onChangeText={(toConvert) => setToConvert(toConvert)}
      ></TextInput>
      <Button title="Convert" onPress={() => convert()}></Button>
      <View>
        <Picker
          selectedValue={currency}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => {
            setCurrency(itemValue);
          }}
        >
          <Picker.Item label="-" value="" />
          {Object.keys(rates).map((rate) => {
            return <Picker.Item label={rate} value={rate} />;
          })}
        </Picker>
      </View>
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
  input: {
    width: 200,
    borderColor: "grey",
    borderWidth: 1,
    textAlign: "center",
    margin: 5,
    height: 40,
  },
});
