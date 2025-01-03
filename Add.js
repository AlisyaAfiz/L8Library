import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation, route}) => {
  const[title,setTitle] = useState("");
    const[isbn,setISBN] = useState("");
    const[copies,setCopies] = useState("");
    const[cover,setCover] = useState("");
  const[type,setType] = useState("Fiction");

  const setData = async(value) => {
      AsyncStorage.setItem("booklist", value);
      navigation.navigate("Home");
    }

  return (
    <View style={{backgroundColor:'#fffdf3', paddingBottom: 500, padding: 10}}>
      <StatusBar/>
      <Text>Title:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
        <Text>ISBN:</Text>
        <TextInput style={{borderWidth:1}} onChangeText={(text)=>setISBN(text)}/>
        <Text>Copies Owned:</Text>
        <TextInput style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>
        <Text>Image URL:</Text>
        <TextInput style={{borderWidth:1}} onChangeText={(text)=>setCover(text)}/>
      <RNPickerSelect
        default={{label:"Fiction", value:"Fiction"}}
        onValueChange={(value)=>setType(value)}
        items={[
          {label:"Fiction", value:"Fiction"},
          {label:"Non-Fiction", value:"Non-Fiction"}
        ]}
      />
      <Button title='Submit' color='#614444'
      onPress={()=>{
          let mydata = JSON.parse(route.params.datastring);
          let item = {key:title, isbn:isbn, copies:copies, cover:cover};
          let indexnum = 1;
          if(type=="Fiction") {
            indexnum = 0;
          }
          mydata[indexnum].data.push(item);
          let stringdata = JSON.stringify(mydata);
          setData(stringdata);
        }
      }
      />
    </View>
  );
};

export default Add;