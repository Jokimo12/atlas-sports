import React, { useState } from 'react';
import { FlatList, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import MonthView from '../MonthView';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { addMonths, subMonths } from 'date-fns';

const { height } = Dimensions.get('window');

const Calendar = () => {
  const [baseDate, setBaseDate] = useState(new Date());

  const months = Array.from({ length: 36 }, (_, i) => addMonths(baseDate, i - 18)); 

  const router = useRouter();

  return (
    <View style={styles.container}>
                <Text style={styles.title}>Calendar</Text>
                {/*makes icon interactable in order to navigate to schedule page*/}
                <TouchableOpacity
                style={styles.scheduleIcon} 
                onPress={() =>{router.push('../schedule')}} /*navigates to schedule page*/>
                    <FontAwesome5 name="clipboard-list" size={24} color="black" />
                </TouchableOpacity>

                <FlatList
                    data={months}
                    keyExtractor={(item) => item.toISOString()}
                    renderItem={({ item }) => <MonthView date={item} />}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled={false} // you can enable true for full screen month scroll
                    initialScrollIndex={18}
                    getItemLayout={(_, index) => ({
                        length: height * 0.6, // assume each month approx same height
                        offset: height * 0.6 * index,
                        index,
                    })}
                    />
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    scheduleIcon: {
        padding: 8,
    },
}); 

export default Calendar;
