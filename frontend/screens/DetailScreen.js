import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Linking,
    TouchableOpacity
} from "react-native";
import { Title, Paragraph, Card, DataTable } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import client from '../components/Client';
import moment from 'moment';

const DetailScreen = ({ route }) => {

    const [data, setData] = useState([]);
    const id = route.params.id
    const attributionText = route.params.attributionText

    const getComics = async (id) => {
        try {

            const response = await client.get(`api/comics/${id}/`);
            setData(response.data['comics'])

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        getComics(id)
    }, []);

    const EmptyList = (item) => (
        <Animatable.View style={{ alignItems: 'center', backgroundColor: '#d8e7eb'}}
            animation="bounceInDown"
            duration={500}
            delay={4000}
        >
            <Title>No comics found for this character</Title>
        </Animatable.View>   
    )

    const Item = (item) => (
        <View>
        <TouchableOpacity onPress={() => Linking.openURL(`${item.url}`)}>                           
            <Animatable.View animation="bounceInDown" duration={1500}>                     
                <Card mode="outlined" style={styles.container}>                                
                    <Card.Cover style={styles.image} source={{ uri: `${item.thumbnailPath}.${item.thumbnailExtension}` }} />                                
                    <Card.Content>
                        <Title style={styles.title}>{item.title}</Title>
                            <DataTable.Header>
                                <DataTable.Title><Paragraph style={{ fontSize: 14, fontWeight: 'bold', color: '#014507' }}><Paragraph style={{color: '#000000'}}>Format: </Paragraph>{`${item.format}`.toUpperCase()}</Paragraph></DataTable.Title>
                            </DataTable.Header>                                       
                        <View style={{ paddingBottom: 20 }}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>ONSALE</DataTable.Title>
                                    <DataTable.Title numeric>     ISSUE#</DataTable.Title>                                                                           
                                    <DataTable.Title numeric>PAGES</DataTable.Title>
                                    <DataTable.Title numeric>PRICE</DataTable.Title>                                                        
                                </DataTable.Header>
                                <DataTable.Row style={{ borderBottomWidth: 0 }}>
                                    <DataTable.Cell>{moment(`${item.date}`).format('MMM. YYYY')}</DataTable.Cell> 
                                    {item.issueNumber ? (<DataTable.Cell numeric>{item.issueNumber}</DataTable.Cell>)
                                                    : (<DataTable.Cell numeric>N/A</DataTable.Cell>)}
                                    
                                    {item.pageCount ? (<DataTable.Cell numeric>    {item.pageCount}</DataTable.Cell>)
                                                    : (<DataTable.Cell numeric>    N/A</DataTable.Cell>)}                                                        
                                    {item.price ? (<DataTable.Cell numeric>${item.price}</DataTable.Cell>)
                                                                : (<DataTable.Cell numeric>N/A</DataTable.Cell>)}                                                                                                         
                                </DataTable.Row>
                            </DataTable>
                        </View>
                        <View>                                        
                            <DataTable.Title>DESCRIPTION</DataTable.Title>
                        </View>
                        <View>                                    
                            {item.description ? (<View>
                                                    <Paragraph style={{textAlign: 'justify'}}>{item.description}</Paragraph>
                                                </View>)
                                              : (<View>
                                                    <Paragraph style={{color: '#b43550',
                                                               fontSize: 16,  
                                                               fontWeight: 'bold', 
                                                               textAlign: "center"}}>NOT AVAILABLE</Paragraph>
                                                </View>)}                                                
                        </View>
                        <View>
                            <Paragraph 
                                style={styles.attributionText}
                                onPress={() => Linking.openURL('http://marvel.com/')}
                            >{attributionText}</Paragraph>
                        </View>                                                                                                
                    </Card.Content>                                
                </Card>
            </Animatable.View>
            </TouchableOpacity>                      
        </View>
    )
    
    return (
        <SafeAreaView>   
            <View style={styles.flatListBackground}>
            {/*} {hidden ? null
            : (<Spinner />)} */}
               <FlatList
                    data={data}
                    initialNumToRender={20}  
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={EmptyList}
                    renderItem={({ item }) => <Item 
                        title={item.title}
                        issueNumber={item.itemissueNumber}
                        description={item.description}
                        format={item.format}
                        pageCount={item.pageCount}
                        thumbnailPath={item['thumbnail']['path']}
                        thumbnailExtension={item['thumbnail']['extension']}
                        date={item['dates']['date']}
                        price={item['prices']['price']}
                        url={item['urls']['url']}
                    />}               
                />
            </View>
        </SafeAreaView>
    );
}

export default DetailScreen;

const styles = StyleSheet.create({
    position: {
        fontSize: 12,
        elevation: 0
    },
    flatListBackground: {
        backgroundColor: '#f0ad4e',
    },
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#d8e7eb',
        overflow: 'hidden',
        marginLeft: '2%',
        marginRight: '2%',
        borderRadius: 5,
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#444444',
    },
    image: {
        width: '100%',
        height: 620,
        resizeMode: 'cover',
    },
    title: {
        marginBottom: 15,
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#000000',
        paddingTop: 5,
    },
    paragraph: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#003d17' //#6f7070
    },
    attributionText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0260b3',
        paddingTop: 20
    },
})