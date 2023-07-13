import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com/';
const Detail = (props: any) => {
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        setIsLoading(true)
        async function getData() {
            try {
                let id = props.route.params.id
                const response = await axios.get(`${baseUrl}posts/${id}`);
                setData([response.data]);
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false)

            }
        }
        getData();
    }, [])
    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={{ backgroundColor: "#FFF", borderRadius: 10, marginVertical: 10 }}>
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
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            onEndReachedThreshold={0.1}
                        />
                        : null
                }
            </View>
        </View>
    )
}

export default Detail