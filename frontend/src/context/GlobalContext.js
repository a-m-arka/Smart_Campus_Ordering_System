import { createContext, useContext, useState, useEffect, use } from "react";

const GlobalContext = createContext();
const server = process.env.REACT_APP_SERVER;

export const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        return token !== null;
    });

    const [userRole, setUserRole] = useState(() => {
        const role = localStorage.getItem('role');
        return role || '';
    });

    const [userData, setUserData] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = async (url) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // console.log('Token not found in localStorage.');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${server}${url}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                console.log('Unauthorized: Token is invalid or expired.');
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('userData');
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserData(data);
            localStorage.setItem('userData', JSON.stringify(data));

            // console.log('Fetched User Data:', data);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            setError('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(isLoggedIn){
            let url;
            if(userRole === 'student'){
                url = '/api/student/get-student-data';
            }
            else{
                url = '/api/vendor/get-vendor-data';
            }
            fetchUserData(url);
        }
    }, [isLoggedIn]);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                userRole,
                setUserRole
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);