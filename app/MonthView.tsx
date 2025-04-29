import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isToday } from 'date-fns';

interface MonthViewProps {
  date: Date;
}

const MonthView: React.FC<MonthViewProps> = ({ date }) => {
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

  const dayList = [];
  let currentDay = startDate;

  while (currentDay <= endDate) {
    dayList.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

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
          return (
            <View key={day.toISOString()} style={styles.dayContainer}>
              <Text
                style={[
                  styles.dayText,
                  { color: isCurrentMonth ? 'black' : 'lightgray' },
                  isToday(day) && styles.today,
                ]}
              >
                {format(day, 'd')}
              </Text>
            </View>
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
  dayText: {
    fontSize: 16,
  },
  today: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 5,
  },
});
