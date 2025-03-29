import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Example teams data
const teams = [
    { id: '1', name: 'New York Yankees', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/25/New_York_Yankees_logo.svg' },
    { id: '2', name: 'Boston Red Sox', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Boston_Red_Sox_cap_logo.svg' },
    { id: '3', name: 'Los Angeles Dodgers', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Los_Angeles_Dodgers_logo.svg' },
    { id: '4', name: 'Chicago Cubs', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Chicago_Cubs_logo.svg' },
    { id: '5', name: 'Houston Astros', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Houston_Astros_logo.svg' },
];

interface HeaderProps {
    currentTeam: string;
    onTeamChange: (team: string) => void;
}

const { height: screenHeight } = Dimensions.get('window');
const headerHeight = screenHeight * 0.2; // 20% of screen height instead of 25%

const Header: React.FC<HeaderProps> = ({ currentTeam, onTeamChange }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
                    source={{ uri: selectedTeam.icon }}
                    style={styles.currentTeamIcon}
                />
                <Text style={styles.currentTeamName}>{selectedTeam.name}</Text>
            </View>

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