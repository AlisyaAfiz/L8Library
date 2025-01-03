import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation, route}) => {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

  const[title,setTitle] = useState(route.params.key);
    const[isbn,setISBN] = useState(route.params.isbn);
    const[copies,setCopies] = useState(route.params.copies);
    const[cover,setCover] = useState(route.params.cover);

    const setData = async(value) => {
        AsyncStorage.setItem("booklist", value);
        navigation.navigate("Home");
    }

    return (
    <View>
      <Text>Title:</Text>
      <TextInput value={title} style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
        <Text>ISBN:</Text>
        <TextInput value={isbn} style={{borderWidth:1}} onChangeText={(text)=>setISBN(text)}/>
        <Text>Copies Owned:</Text>
        <TextInput value={copies} style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>
        <Text>Image URL:</Text>
        <TextInput value={cover} style={{borderWidth:1}} onChangeText={(text)=>setCover(text)}/>
      <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Fiction") {
              indexnum = 0;
            }
            mydata[indexnum].data[myindex].key=title;
              mydata[indexnum].data[myindex].isbn=isbn;
              mydata[indexnum].data[myindex].copies=copies;
              mydata[indexnum].data[myindex].cover=cover;
              let stringdata = JSON.stringify(mydata);
              setData(stringdata);
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Fiction") {
              indexnum = 0;
            }
            Alert.alert("Are you sure?",'', 
              [{text:'Yes', onPress:()=>{
                mydata[indexnum].data.splice(myindex,1);
                let stringdata = JSON.stringify(mydata);
                setData(stringdata);
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;