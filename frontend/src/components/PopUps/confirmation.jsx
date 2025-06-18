import React from 'react'
import './popUp.scss'
import { FaClipboardCheck } from "react-icons/fa6";

const Confirmation = ({ message, onOk }) => {
    return (
        <div className="popup-overlay" >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <FaClipboardCheck className='icon' />
                <p>
                    {message}
                </p>
                <div className="pop-up-buttons">
                    <button className="btn" onClick={onOk}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation
