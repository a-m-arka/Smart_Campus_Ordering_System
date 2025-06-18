import React from 'react'
import './popUp.scss'
import { FaUserLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AccessDenied = ({ canLogin, onClose }) => {
    const navigate = useNavigate();

    const onLogin = () => {
        navigate('/login');
    };

    return (
        <div className="popup-overlay" >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <FaUserLock className='icon' />
                <p>
                    {
                        canLogin
                            ? "Access Denied. Please log in to continue."
                            : "You do not have permission to access this page."
                    }
                </p>
                <div className="pop-up-buttons">
                    {canLogin && (
                        <button className="btn" onClick={onLogin}>
                            Log In
                        </button>
                    )}
                    <button className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AccessDenied
