import * as React from 'react';
import { View, 
         Text, 
         StyleSheet, 
         Image, 
         Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Slider from 'react-native-slide-to-unlock';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const SplashScreen = ({ navigation }) => {

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Animatable.Image
                animation="fadeInDownBig"
                duration={1500}
                source={require('../assets/images/marvel-cover.jpg')}
                style={styles.backgroundImage}
                resizeMode="stretch"
            />
        </View>
        <Animatable.Image
            animation="fadeInRight"
            duration={2500}
            delay={2000}
            source={require('../assets/images/techkno-logo.png')}
            style={styles.techknoLogo}                        
        />
        <Animatable.View style={styles.sliderContainer} 
            animation="fadeInLeft" //fadeInLeftBig
            duration={2000}
            delay={3000}
        >
            <Slider
                //childrenContainer={{ backgroundColor: '#444444' }}
                onEndReached={() => navigation.navigate('Home')}
                containerStyle={{
                    margin: -300,
                    backgroundColor: '#d8e7eb',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#444444',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 250,
                    height: 50
                }}
                sliderElement={
                    <MaterialIcons
                        name="arrow-forward-ios"  
                        color="#000000"
                        size={50}                                           
                        style={{backgroundColor: '#b43550'}}
                    />
                }>
                <Text style={styles.sliderText}>Explore</Text>
            </Slider>
        </Animatable.View>
        <Animatable.View
            style={[styles.footer, {
                backgroundColor: '#f0ad4e'
            }]}
            animation="fadeInUpBig"
            duration={1500}
        >
            <Image
                source={require('../assets/images/ironman.png')}
                style={styles.ironmanImage}
                resizeMode="stretch"            
            />            
            <Image
                source={require('../assets/images/marvel-logo.png')}
                style={styles.marvelLogo}
                resizeMode="stretch"            
            />
            <Text style={styles.attributionText}>Data provided by Marvel. ⓒ 2022 MARVEL</Text>
        </Animatable.View>
    </View>
    );
}

export default SplashScreen;

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: .55,
        backgroundColor: '#fff',
        borderTopLeftRadius: 900,
        borderTopRightRadius: 900,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    ironmanImage: {
        alignItems: 'center',
        width: '100%',
        height: 260,
        marginTop: -190
    },
    techknoLogo: {
        alignSelf: 'center',
        width: 250,
        height: 170,
        position: 'absolute',
        marginTop: 100,
    },
    marvelLogo: {
        alignSelf: 'center'
    },
    backgroundImage: {
        width: width,
        height: height,  
    },
    sliderContainer: {        
        alignItems: 'center',
        marginTop: 30
    },
    sliderText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignItems: 'right',
        marginLeft: 120
    },
    attributionText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0260b3',
        paddingTop: 10
    }
});