import { createContext, useContext, useEffect, useState } from 'react';

const DeviceIdContext = createContext(null);

export const DeviceIdProvider = ({ children }) => {
    const [deviceId, setDeviceId] = useState(null);

    useEffect(() => {
        let storeDeviceId = localStorage.getItem('device-id');
        if (!storeDeviceId) {
            storeDeviceId = crypto.randomUUID();
            localStorage.setItem('device-id', storeDeviceId);
        }
        setDeviceId(storeDeviceId);
    }, []);

    return <DeviceIdContext.Provider value={deviceId}>{children}</DeviceIdContext.Provider>;
};

export const useDeviceId = () => {
    return useContext(DeviceIdContext);
};
