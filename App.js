import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Stack = createStackNavigator();

const BookListScreen = ({ navigation }) => {
  const [Books, setBooks] = useState([]);

  useEffect(async () => {

    const firebaseConfig = {
      apiKey: "AIzaSyB4MzW8uIBXi_r0wpveIJ0W0HPWJXcV6J0",
      authDomain: "testproducts-5d60a.firebaseapp.com",
      projectId: "testproducts-5d60a",
      storageBucket: "testproducts-5d60a.appspot.com",
      messagingSenderId: "462878656702",
      appId: "1:462878656702:web:3edefa1f8c6f303cc176ef"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "products"));
      const booksList = [];
  
      querySnapshot.forEach((doc) => {
        booksList.push({ ...doc.data(), id: doc.id });
      });
  
      setBooks(booksList);
    }

    fetchData();

  }, []);

  const handlePress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const styles = StyleSheet.create({
    row: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#fafafa',
      flexDirection: 'row',
    },
    bookName : {
      fontSize: 15,
      fontWeight: 'light',
      color: 'gray',
      marginRight: 100

    },
    bookNote : {
      fontSize: 12,
      fontWeight: 'light',
      color: 'gray',
      marginRight: 100
    },
    bookImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={() => handlePress(item)}>
      <Image style={styles.bookImage} source={{ uri: item.image }} />
      <View>
        <Text style={styles.bookName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={Books} renderItem={renderItem} keyExtractor={(book) => book.id} />
    </View>
  );
};


const BookDetailScreen = ({ route }) => {
  const { book } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      // paddingTop: 10,
      paddingHorizontal: 10,
    },
    bookImage: {
      width: '100%',
      height: '40%',
      flex: 1,
      marginBottom: 5,
      borderRadius: 7,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    bookName: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'gray',
      marginRight: 10,
      marginBottom: 5
    },
    bookDescription:{
      fontSize: 15,
      fontWeight: 'light',
      color: 'gray',
      marginRight: 10,
      marginBottom: 5
    },
    bookPrice: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'Black',
    },
    scrollContainer: {
      flexGrow: 1
    }
  });

  return (
    <ScrollView contentContainerStyle={{flex:1}}>
      <View style={styles.container}>
        <Image style={styles.bookImage} source={{ uri: book.image }} />
        <View style={styles.bookDetails}>
          <Text style={styles.bookName}>{book.name}</Text>
          <Text style={styles.bookPrice}>${book.price}</Text>
          <Text style={styles.bookDescription}>{book.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BooksList">
        <Stack.Screen name="BooksList" component={BookListScreen} options={{ title: 'Book List' }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Book Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;