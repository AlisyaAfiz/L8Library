import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
   opacityStyle: {
      borderWidth: 1,
   },
   headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight:'bold',
    fontFamily:'impact'
  },
});

const Home = ({navigation}) => {

    const [mydata, setMyData] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem("booksdata");
        if(datastr!=null) {
            jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        else {
            setMyData(datasource);
        }
    };

    getData();

  const renderItem = ({item, index, section}) => {
    return (
    <TouchableOpacity style={styles.opacityStyle}
    onPress={()=>
      {
          let datastr = JSON.stringify(mydata);
        navigation.navigate("Edit",{index:index, type:section.type, key:item.key, isbn:item.isbn, copies:item.copies, cover:item.cover, datastring:datastr})
      }
    }
    >
        <View style={{flexDirection:'row', padding: 20}}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 22, fontWeight: 'bold', padding: 10}}>{item.key}</Text>
                <Text style={{padding: 10}}>ISBN: {item.isbn}</Text>
                <Text style={{padding: 10}}>Copies Owned: {item.copies}</Text>
            </View>
            <View style={{alignSelf:'right'}}>
                <Image source={{uri: item.cover}} style={{width: 140, height: 200}}/>
            </View>
        </View>
    </TouchableOpacity>
    );
  };

   return (
    <View style={{marginBottom: 30, backgroundColor:'#fffbec'}}>
      <StatusBar/>
	  <Button title='Add New Book'
              onPress={()=>{
                  let datastr = JSON.stringify(mydata);
                  navigation.navigate("Add", {datastring: datastr});
              }
      }
      />
      <SectionList sections={mydata} renderItem={renderItem}
      renderSectionHeader={({section:{type,bgcolor}})=>(
      <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
        {type}
      </Text>
      )}/>
    </View>
  );
};

export default Home;