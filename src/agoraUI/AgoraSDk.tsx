import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcSurfaceView,
  RtcConnection,
  IRtcEngineEventHandler,
} from 'react-native-agora';

const appId = '86b55c90480e4cc382b250fce53a0bd7';
const token = '';
const channelName = 'test';
const uid = 0;

const AgoraSDK = () => {
  const agoraEngineRef = useRef<IRtcEngine>();
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);

  useEffect(() => {
    setupVideoSDKEngine();
    return () => {
      agoraEngineRef.current?.unregisterEventHandler();
      agoraEngineRef.current?.release();
    };
  }, []);

  const setupVideoSDKEngine = async () => {
    if (Platform.OS === 'android') {
      await getPermission();
    }
    agoraEngineRef.current = createAgoraRtcEngine();
    const agoraEngine = agoraEngineRef.current;

    agoraEngine.registerEventHandler({
      onJoinChannelSuccess: () => {
        setIsJoined(true);
      },
      onUserJoined: (_connection: RtcConnection, uid: number) => {
        setRemoteUid(uid);
      },
      onUserOffline: (_connection: RtcConnection, uid: number) => {
        setRemoteUid(0);
      },
    });

    agoraEngine.initialize({appId: appId});
    agoraEngine.enableVideo();
  };

  const join = async () => {
    if (isJoined) return;
    const agoraEngine = agoraEngineRef.current;
    agoraEngine?.startPreview();
    agoraEngine?.joinChannel(token, channelName, uid, {
      channelProfile: ChannelProfileType.ChannelProfileCommunication,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      publishMicrophoneTrack: true,
      publishCameraTrack: true,
    });
  };

  const leave = () => {
    agoraEngineRef.current?.leaveChannel();
    setRemoteUid(0);
    setIsJoined(false);
  };

  const switchCamera = () => {
    agoraEngineRef.current?.switchCamera();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        {/* Remote View */}
        {isJoined && remoteUid !== 0 ? (
          <RtcSurfaceView canvas={{uid: remoteUid}} style={styles.remoteView} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="account-off" size={40} color="#999" />
          </View>
        )}

        {/* Local View */}
        {isJoined && (
          <View style={styles.localViewContainer}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.localView} />
          </View>
        )}

        {/* Control Buttons */}
        <View style={styles.controls}>
          <Icon.Button
            name="plus-circle"
            size={40}
            backgroundColor="transparent"
            color="#0055cc"
            onPress={join}
            style={styles.iconButton}
          />
          <Icon.Button
            name="phone-hangup"
            size={40}
            backgroundColor="transparent"
            color="#ff4d4d"
            onPress={leave}
            style={styles.iconButton}
          />
          <Icon.Button
            name="autorenew"
            size={40}
            backgroundColor="transparent"
            color="#0055cc"
            onPress={switchCamera}
            style={styles.iconButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  localViewContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  localView: {
    width: 100,
    height: 150,
    borderColor: '#ffffff',
    borderWidth: 2,
    backgroundColor: '#000',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignSelf: 'center',
    zIndex: 20,
  },
  iconButton: {
    marginHorizontal: 10,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
});

export default AgoraSDK;