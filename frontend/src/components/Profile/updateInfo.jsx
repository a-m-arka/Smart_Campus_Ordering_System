import React, { useState } from 'react';
import './updateInfo.scss';
import { FaEdit } from 'react-icons/fa';

const UpdateInfo = ({ userRole, profileFields, initialProfile, onSave, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(initialProfile);

    const [editable, setEditable] = useState(
        profileFields.reduce((acc, field) => {
            acc[field.key] = field.editable || false;
            return acc;
        }, {})
    );

    const toggleEdit = key => {
        setEditable(prev => {
            const newEditable = Object.keys(prev).reduce((acc, currKey) => {
                acc[currKey] = currKey === key ? !prev[currKey] : false;
                return acc;
            }, {});
            return newEditable;
        });
    };

    const handleChange = (key, value) => {
        setProfile(prev => ({ ...prev, [key]: value }));
    };

    return (
        <form className="profile-details">
            <h3>My Profile</h3>

            {profileFields.map(field => (
                <div className="field" key={field.key}>
                    <label>{field.label}</label>
                    <p>:</p>

                    <div className="input-wrap">
                        <input
                            className={editable[field.key] ? 'editable' : ''}
                            type={field.type}
                            value={profile[field.key]}
                            readOnly={!editable[field.key]}
                            onChange={e => handleChange(field.key, e.target.value)}
                        />

                        <FaEdit
                            className="edit-icon"
                            onClick={() => toggleEdit(field.key)}
                        />
                    </div>
                </div>
            ))}

            <button disabled={loading}>Save Changes</button>

            {typeof onCancel === 'function' && (
                <button type="button" onClick={onCancel} disabled={loading}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default UpdateInfo;