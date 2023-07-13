import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
const bootSplashLogo = require("../assets/ic_launcher.png");
const Stack = createStackNavigator();

const Router = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState<boolean>(false);
    const [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
    const opacity = useRef(new Animated.Value(1));
    const translateY = useRef(new Animated.Value(0));
    const init = async () => {
        // You can uncomment this line to add a delay on app startup
        // await fakeApiCallWithoutBadNetwork(3000);

        try {
            Animated.stagger(250, [
                Animated.spring(translateY.current, {
                    useNativeDriver: true,
                    toValue: -50,
                }),
                Animated.spring(translateY.current, {
                    useNativeDriver: true,
                    toValue: Dimensions.get("window").height,
                }),
            ]).start();

            Animated.timing(opacity.current, {
                useNativeDriver: true,
                toValue: 0,
                duration: 150,
                delay: 350,
            }).start(() => {
                setBootSplashIsVisible(false);
            });
        } catch (error) {
            setBootSplashIsVisible(false);
        }
    };
    useEffect(() => {
        bootSplashLogoIsLoaded && init();
    }, [bootSplashLogoIsLoaded])
    return (
        <>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="Detail" component={Detail} options={{
                    headerShown: true,
                }} />
            </Stack.Navigator>
            {bootSplashIsVisible && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        styles.bootsplash,
                        { opacity: opacity.current },
                    ]}
                >
                    <Animated.Image
                        source={bootSplashLogo}
                        fadeDuration={0}
                        resizeMode="contain"
                        onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
                        style={[
                            styles.logo,
                            { transform: [{ translateY: translateY.current }] },
                        ]}
                    />
                </Animated.View>
            )}
        </>
    );
}
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    text: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 30,
        color: "#333",
        textAlign: "center",
    },
    bootsplash: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    logo: {
        height: 89,
        width: 100,
    },
});

export default Router