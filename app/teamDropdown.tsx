import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { teams } from './teams';

interface TeamDropdownProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectTeam: (teamName: string) => void;
    currentTeam: string;
}

const TeamDropdown: React.FC<TeamDropdownProps> = ({ isVisible, onClose, onSelectTeam, currentTeam }) => {
    const renderTeamItem = ({ item }: { item: typeof teams[0] }) => (
        <TouchableOpacity
            style={styles.teamItem}
            onPress={() => {
                onSelectTeam(item.name);
                onClose();
            }}
        >
            <Image
                source={item.icon}
                style={styles.teamIcon}
            />
            <Text style={styles.teamName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownHeader}>
                        <Text style={styles.dropdownTitle}>Select Team</Text>
                        <TouchableOpacity onPress={onClose}>
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
    );
};

const styles = StyleSheet.create({
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
    }
});

export default TeamDropdown;