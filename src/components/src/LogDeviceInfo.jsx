import React, {useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';

const LogDeviceInfo = () => {
  const getDeviceInfo = async () => {
    try {
      const info = {
        brand: DeviceInfo.getBrand(),
        model: DeviceInfo.getModel(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        uniqueId: DeviceInfo.getUniqueId(),
        manufacturer: await DeviceInfo.getManufacturer(),
        isEmulator: await DeviceInfo.isEmulator(),
        deviceName: await DeviceInfo.getDeviceName(),
      };
      console.log('Device Info:', info);
    } catch (error) {
      console.error('Error fetching device info:', error);
    }
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  return null;
};

export default LogDeviceInfo;