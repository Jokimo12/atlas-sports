import { Dimensions, View, Text, StyleSheet, Image, TextInput, Button, Touchable, TouchableOpacity, Platform } from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import { GiftedChat, IMessage, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/Colors';
import Header from '../header';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const ChatScreen = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTeam, setCurrentTeam] = useState('New York Yankees');
    const audioRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'hi',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'ent',
                    avatar: 'https://placeimg.com/140/140/any',
                }
            },
        ]);

        // Request permissions
        (async () => {
            const { status: imageStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const { status: audioStatus } = await Audio.requestPermissionsAsync();
            
            if (imageStatus !== 'granted' || audioStatus !== 'granted') {
                alert('Sorry, we need camera roll and audio permissions to make this work!');
                return;
            }
        })();
    }, []);

    const handleTeamChange = (team: string) => {
        setCurrentTeam(team);
        // Here you can add logic to load team-specific chat data
        console.log('Team changed to:', team);
    };

    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, []);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const newMessage: IMessage = {
                    _id: Date.now(),
                    text: '', // Required by IMessage type
                    createdAt: new Date(),
                    user: { _id: 1 },
                    image: result.assets[0].uri,
                };
                onSend([newMessage]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            alert('Failed to pick image');
        }
    };

    const startRecording = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            await recording.startAsync();
        } catch (err) {
            console.error('Failed to start recording', err);
            //alert('Failed to start recording');
        }
    };

    const stopRecording = async () => {
        if (!recording) return;
        
        try {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            if (uri) {
                const newMessage: IMessage = {
                    _id: Date.now(),
                    text: 'Voice message', // Required by IMessage type
                    createdAt: new Date(),
                    user: { _id: 1 },
                    audio: uri,
                };
                onSend([newMessage]);
            }
            setRecording(null);
        } catch (err) {
            console.error('Failed to stop recording', err);
            alert('Failed to stop recording');
        }
    };

    const playAudio = async (uri: string) => {
        try {
            if (audioRef.current) {
                await audioRef.current.unloadAsync();
            }

            const { sound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );
            audioRef.current = sound;
            setIsPlaying(true);

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                }
            });
        } catch (error) {
            console.error('Error playing audio:', error);
            alert('Failed to play audio');
        }
    };

    const stopAudio = async () => {
        try {
            if (audioRef.current) {
                await audioRef.current.stopAsync();
                await audioRef.current.unloadAsync();
                audioRef.current = null;
                setIsPlaying(false);
            }
        } catch (error) {
            console.error('Error stopping audio:', error);
            alert('Failed to stop audio');
        }
    };

    const renderMessageAudio = (props: any) => {
        const { currentMessage } = props;
        const isCurrentUser = currentMessage.user._id === 1;

        return (
            <View style={[
                styles.audioContainer,
                isCurrentUser ? styles.audioContainerRight : styles.audioContainerLeft
            ]}>
                <TouchableOpacity 
                    onPress={() => isPlaying ? stopAudio() : playAudio(currentMessage.audio)}
                    style={styles.audioButton}
                >
                    <Ionicons 
                        name={isPlaying ? "pause-circle" : "play-circle"} 
                        size={32} 
                        color={isCurrentUser ? "#fff" : "#a684fa"} 
                    />
                </TouchableOpacity>
                <Text style={[
                    styles.audioText,
                    isCurrentUser ? styles.audioTextRight : styles.audioTextLeft
                ]}>
                    Voice message
                </Text>
            </View>
        );
    };

    const renderBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#a684fa',
                        borderRadius: 20,
                        padding: 5,
                    },
                    left: {
                        backgroundColor: '#c9cefe',
                        borderRadius: 20,
                        padding: 5,
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                    left: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    const renderInputToolbar = (props: any) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    padding: 8,
                }}
            />
        );
    };

    const renderActions = () => {
        return (
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.actionButton}>
                    <Ionicons name="image" size={24} color="#a684fa" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={isRecording ? stopRecording : startRecording} 
                    style={styles.actionButton}
                >
                    <Ionicons 
                        name={isRecording ? "stop-circle" : "mic"} 
                        size={24} 
                        color={isRecording ? "#ff4444" : "#a684fa"} 
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <View style={styles.container}>
            <Header currentTeam={currentTeam} onTeamChange={handleTeamChange} />
            <View style={styles.chat}>
                <GiftedChat 
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderBubble={renderBubble}
                    renderInputToolbar={renderInputToolbar}
                    renderActions={renderActions}
                    renderMessageAudio={renderMessageAudio}
                    alwaysShowSend
                    renderAvatar={null}
                    renderTime={() => null}
                    renderDay={() => null}
                />
            </View>
        </View>
    );
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chat: {
        flex: 1,
        backgroundColor: '#fff',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    actionButton: {
        padding: 8,
        marginHorizontal: 4,
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 20,
        maxWidth: '80%',
    },
    audioContainerLeft: {
        backgroundColor: '#f0f0f0',
    },
    audioContainerRight: {
        backgroundColor: '#a684fa',
    },
    audioButton: {
        marginRight: 8,
    },
    audioText: {
        fontSize: 14,
    },
    audioTextLeft: {
        color: '#000',
    },
    audioTextRight: {
        color: '#fff',
    }
});

export default ChatScreen;