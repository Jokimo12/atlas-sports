import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname, useSegments } from 'expo-router';

// Example teams data
const teams = [
    { id: '1', name: 'New York Yankees', icon:require('../assets/images/yankeesicon.png'), headcoach:"Marcus Walberg", record: "0-0" },
    { id: '2', name: 'Boston Red Sox', icon:require('../assets/images/BRSicon.png'), headcoach:"John Henry", record: "0-0" },
    { id: '3', name: 'Los Angeles Dodgers', icon:require('../assets/images/LADodgers.png'),headcoach:"Marcus Walberg", record: "0-0"  },
    { id: '4', name: 'Chicago Cubs', icon:require('../assets/images/chicagocubs.png'),headcoach:"Marcus Walberg", record: "0-0" },
    { id: '5', name: 'Houston Astros', icon:require('../assets/images/houstonAstrosIcon.png'),headcoach:"Marcus Walberg", record: "0-0" },
];

interface HeaderProps {
    currentTeam: string;
    onTeamChange: (team: string) => void;
}

const { height: screenHeight } = Dimensions.get('window');
const headerHeight = screenHeight * 0.2; // 20% of screen height instead of 25%

const Header: React.FC<HeaderProps> = ({ currentTeam, onTeamChange }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const segments = useSegments();
    const isCalendarScreen = segments[1] === 'calendar';
    const ref = useRef(pathname);

    useEffect(() => {
        if (!isCalendarScreen) {
            ref.current = pathname;
        }
    }, [pathname, isCalendarScreen]);

    const handleNavigation = () => {
        if (isCalendarScreen) {
            console.log('Navigating back to:', ref.current);
            router.push(ref.current as any);
        } else {
            console.log('Navigating to calendar');
            router.push('/(tabs)/calendar' as any);
        }
    };

    const selectedTeam = teams.find(team => team.name === currentTeam) || teams[0];

    const renderTeamItem = ({ item }: { item: typeof teams[0] }) => (
        <TouchableOpacity
            style={styles.teamItem}
            onPress={() => {
                onTeamChange(item.name);
                setIsDropdownVisible(false);
            }}
        >
            <Image
                source={{ uri: item.icon }}
                style={styles.teamIcon}
            />
            
            <Text style={styles.teamName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.teamSelector}
                onPress={() => setIsDropdownVisible(true)}
            >
                <Text style={styles.teamSelectorText}>Teams</Text>
                <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>

            <View style={styles.currentTeam}>
                <Image
                    source={selectedTeam.icon}
                    style={styles.currentTeamIcon}
                    onError={(e) => console.log('Failed to load Yankees logo:', e.nativeEvent.error)}
                />
               
                <Text style={styles.currentTeamName}>{selectedTeam.name}{'\n'}</Text>
                
                
            </View>
            <View style={styles.currentTeamStats}>
                <Text style={styles.currentTeamCoach}>Head Coach: {selectedTeam.headcoach}</Text>
                <Text style={styles.currentTeamrecord}>Record: {selectedTeam.record}</Text>
            </View>
            

            <TouchableOpacity 
                style={styles.calendarButton}
                onPress={handleNavigation}
            >
                <Ionicons 
                    name={isCalendarScreen ? "home" : "calendar"} 
                    size={24} 
                    color="#000" 
                />
            </TouchableOpacity>

            <Modal
                visible={isDropdownVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsDropdownVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsDropdownVisible(false)}
                >
                    <View style={styles.dropdownContainer}>
                        <View style={styles.dropdownHeader}>
                            <Text style={styles.dropdownTitle}>Select Team</Text>
                            <TouchableOpacity onPress={() => setIsDropdownVisible(false)}>
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={teams}
                            renderItem={renderTeamItem}
                            keyExtractor={item => item.id}
                            style={styles.teamList}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: headerHeight,
        backgroundColor: '#a0acef',
        flexDirection: 'column',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    teamSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingTop: 20,
    },
    teamSelectorText: {
        fontSize: 20,
        marginRight: 8,
        fontWeight: '500',
    },
    currentTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    currentTeamIcon: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    currentTeamName: {
        fontSize: 24,
        fontWeight: '600',
    },
    currentTeamStats: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentTeamCoach: {
        fontSize: 18,
        fontWeight: '600',
    },
    currentTeamrecord: {
        fontSize: 18,
        fontWeight: '600',
    },
    calendarButton: {
        position: 'absolute',
        top: 20,
        right: 16,
        padding: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
    },
    dropdownContainer: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 16,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    dropdownTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    teamList: {
        maxHeight: 400,
    },
    teamItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    teamIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    teamName: {
        fontSize: 16,
    },
});

export default Header;