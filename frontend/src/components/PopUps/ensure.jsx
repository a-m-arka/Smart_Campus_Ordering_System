import React from 'react'
import { BsPatchQuestionFill } from "react-icons/bs";

const Ensure = ({ message, onYes, onNo }) => {
    return (
        <div className="popup-overlay" >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <BsPatchQuestionFill className='icon' />
                <p>
                    {message}
                </p>
                <div className="pop-up-buttons">
                    <button className="btn" onClick={onYes}>
                        Yes
                    </button>
                    <button className="btn" onClick={onNo}>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Ensure
