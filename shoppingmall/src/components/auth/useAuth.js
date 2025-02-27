import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDeviceId } from './deviceContext';

const useAuth = () => {
    const deviceId = useDeviceId();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/me`, {
                    withCredentials: true,
                    headers: { 'device-id': deviceId },
                });
                setUser(response.data);
            } catch (error) {
                setUser(null);
                console.error(error);
            }
        };
        checkUser();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/user/logout`,
                { email: user.email },
                { withCredentials: true, headers: { 'device-id': deviceId } }
            );
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return { user, logout };
};

export default useAuth;
