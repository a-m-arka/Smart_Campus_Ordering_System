import React, { useState } from 'react';
import './updateInfo.scss';
import { FaEdit } from 'react-icons/fa';

const server = process.env.REACT_APP_SERVER;

const UpdateInfo = ({ userRole, profileFields, initialProfile, onSave, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(initialProfile);
    const [error, setError] = useState(null);

    // console.log(initialProfile);

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

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            let url;
            let payload;
            if (userRole === 'student') {
                url = `${server}/api/student/update-student-info`;
                payload ={
                    role: userRole,
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    address: profile.address
                }
            }
            else if (userRole === 'vendor') {
                url = `${server}/api/vendor/update-vendor-info`;
                payload = {
                    role: userRole,
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    stallName: profile.stall_name,
                    stallLocation: profile.stall_location
                }
            }
            const token = localStorage.getItem('token');
            if(!token) {
                alert("You must be logged in to update your profile");
                window.location.reload();
                return;
            }
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Failed to update profile');
                return;
            }
            alert(data.message || 'Profile updated successfully');
            if (typeof onSave === 'function') {
                onSave(profile);
            }

        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        }
    };

    return (
        <form className="profile-details" onSubmit={handleSubmit}>
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
                            readOnly={!editable[field.key] || loading}
                            onChange={e => handleChange(field.key, e.target.value)}
                        />

                        <FaEdit
                            className="edit-icon"
                            onClick={() => toggleEdit(field.key)}
                            disabled={loading}
                        />
                    </div>
                </div>
            ))}

            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </button>

            {typeof onCancel === 'function' && (
                <button type="button" onClick={onCancel} disabled={loading}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default UpdateInfo;