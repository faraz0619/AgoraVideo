import AgoraUIKit from 'agora-rn-uikit';
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const AgoraUI = () => {
  const [videoCall, setVideoCall] = useState(true);

  const connectionData = {
    appId: '86b55c90480e4cc382b250fce53a0bd7', // Replace with your Agora App ID
    channel: 'test', // Replace with your channel name
    token: '', // Use a valid token if required, else set to null
  };

  const rtcCallbacks = {
    EndCall: () => {
      console.log('Call ended');
      setVideoCall(false);
    },
  };

  return (
    <View style={styles.container}>
      {videoCall ? (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
      ) : (
        <Text style={styles.startCall} onPress={() => setVideoCall(true)}>
          Start Call
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  startCall: {
    fontSize: 18,
    color: '#0055cc',
    textDecorationLine: 'underline',
  },
});

export default AgoraUI;