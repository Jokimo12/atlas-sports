import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isToday } from 'date-fns';
import { useRouter } from 'expo-router';
import { exampleEvents } from '../data/exampleEvents';

interface MonthViewProps {
  date: Date;
}

const MonthView: React.FC<MonthViewProps> = ({ date }) => {
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
  const router = useRouter();

  const dayList = [];
  let currentDay = startDate;

  while (currentDay <= endDate) {
    dayList.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  const handleDayPress = (day: Date) => {
    if (isSameMonth(day, date)) {
      const dateString = format(day, 'yyyy-MM-dd');
      router.push(`/dayDetail?date=${dateString}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{format(date, 'MMMM yyyy')}</Text>
      <View style={styles.weekRow}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>
      <View style={styles.daysGrid}>
        {dayList.map((day) => {
          const isCurrentMonth = isSameMonth(day, date);
          const dateString = format(day, 'yyyy-MM-dd');
          const hasEvents = isCurrentMonth && exampleEvents[dateString]?.length > 0;
          
          return (
            <TouchableOpacity
              key={day.toISOString()}
              style={styles.dayContainer}
              onPress={() => handleDayPress(day)}
              disabled={!isCurrentMonth}
            >
              <View style={[
                styles.dayContent,
                isToday(day) && styles.today,
                hasEvents && styles.hasEvents
              ]}>
                <Text
                  style={[
                    styles.dayText,
                    { color: isCurrentMonth ? 'black' : 'lightgray' },
                  ]}
                >
                  {format(day, 'd')}
                </Text>
                {hasEvents && <View style={styles.eventDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MonthView;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContent: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dayText: {
    fontSize: 16,
  },
  today: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
  },
  hasEvents: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
});
