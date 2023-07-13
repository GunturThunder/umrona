import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import axios from 'axios';
import { NavigationProp } from "@react-navigation/native";
const baseUrl = 'https://jsonplaceholder.typicode.com/';
const Home = ({ navigation }: any) => {
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const fade = useState(new Animated.Value(0))[0]
    const animation = () => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }
    useEffect(() => {
        setIsLoading(true)
        async function getData() {
            try {
                const response = await axios.get(`${baseUrl}posts`);
                setData(response.data);
                setIsLoading(false)
                animation();
            } catch (error) {
                console.error(error);
                setIsLoading(false)
                animation();
            }
        }
        getData();
    }, [])
    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ backgroundColor: "#FFF", borderRadius: 10, marginVertical: 10 }} onPress={() => navigation.navigate('Detail', { id: item.id })}>
                <View style={{ padding: 10, paddingVertical: 20 }}>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ color: '#000' }}>Id: {item.id}</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', color: '#000', marginBottom: 10 }}>{item.title}</Text>
                    <Text style={{ color: '#000' }}>{item.body}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#ECF1FA' }}>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                {isLoading ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    :
                    data !== undefined ?
                        <Animated.View
                            style={[
                                {
                                    opacity: fade
                                }
                            ]}
                        >
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                                onEndReachedThreshold={0.1}
                            />
                        </Animated.View>
                        : null
                }
            </View>
        </View>
    )
}

export default Home