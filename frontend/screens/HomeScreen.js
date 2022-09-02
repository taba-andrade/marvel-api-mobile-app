import React, { useState, useEffect } from "react";
import { View, 
         StyleSheet, 
         SafeAreaView, 
         FlatList, 
         TouchableOpacity, 
         Linking } from 'react-native';
import { Title, Paragraph, Searchbar, Card, DataTable } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import client from '../components/Client';



function HomeScreen ({ navigation }) {

    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState('');

    //const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setKeyword(query)

    const getList = async () => {

        if (keyword) {
            const response = await client.get(`api/character-search/${keyword}/`);
            setData(response.data);      
        } else {
            const response = await client.get('api/characters/');
            setData(response.data);
        }
        
    };

    useEffect(() => { 
        getList(keyword);        
    }, [keyword]);  

    const Item = (item, thumbnailPath, thumbnailExtension) => (
        <TouchableOpacity
            onPress={() => {
            navigation.navigate("Detail", {
                id:
                    item.id,
                attributionText:
                    data.attributionText,
            });
        }}
        >   
            <Animatable.View animation="flipInY">                     
                <Card mode="outlined" style={styles.container}>                                
                    <Card.Cover style={styles.image} source={{ uri: `${item.thumbnailPath}.${item.thumbnailExtension}` }} />                                
                    <Card.Content>                                            
                        <Title style={styles.title}>{item.name}</Title>
                        <DataTable.Header>
                            <DataTable.Title>OVERVIEW</DataTable.Title>
                        </DataTable.Header>
                        {item.description ? (<DataTable.Row>
                                                <View>
                                                    <Paragraph style={styles.description}>{item.description}</Paragraph>
                                                </View>
                                            </DataTable.Row>)
                                          : (<DataTable.Row>
                                                <Paragraph style={{color: '#b43550', fontWeight: 'bold'}}>NOT AVAILABLE</Paragraph>
                                            </DataTable.Row>)}
                        <Paragraph 
                            style={styles.attributionText}
                            onPress={() => Linking.openURL('http://marvel.com/')}
                        >
                            {data.attributionText}
                        </Paragraph>                              
                    </Card.Content>                                
                </Card>
            </Animatable.View>                       
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            <View style={{backgroundColor: '#f0ad4e', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5}}>
                <Searchbar 
                    styles={styles.position}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={keyword}
                    icon={()=><Icon name="database-search-outline" size={30} onPress={getList}/>}
                    onEndEditing={getList}
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View style={styles.flatListBackground}>
               <FlatList
                    data={data["characters"]}
                    initialNumToRender={20}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Item 
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        thumbnailPath={item['thumbnail']['path']}
                        thumbnailExtension={item['thumbnail']['extension']}
                    />} 
                />
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;


const styles = StyleSheet.create({
    position: {
        fontSize: 12,
        elevation: 0
    },
    flatListBackground: {
        backgroundColor: '#f0ad4e',
    },
    container: {
        marginTop: 20,
        backgroundColor: '#d6d4d4',
        overflow: 'hidden',
        marginLeft: '2%',
        marginRight: '2%',
        flex: 1,
        borderRadius: 5,
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#444444',
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: '#000000',
        paddingBottom: 2
    },
    paragraph: {
        fontSize: 14,
        fontWeight: 'normal',
        alignItems: 'center',
        color: '#444444'
    },
    description: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#444444'
    },
    attributionText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0260b3',
        paddingTop: 10
    },
})