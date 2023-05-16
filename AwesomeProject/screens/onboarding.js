import { View, Text, TouchableOpacity, Animated, StyleSheet, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Paginator from '../components/Paginator';
import OnboardingItem from '../components/onboardingItem';
import slides from '../slides';
import NextButton from '../components/NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            console.log('Last item.');
            navigation.navigate('Root', 'דף הבית',{
                screen: 'nestedH'
            });

            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true');
            } catch (err) {
                console.log('Error @setItem: ', err);
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* <Text>onboarding</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text>Hello</Text>
            </TouchableOpacity> */}
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})