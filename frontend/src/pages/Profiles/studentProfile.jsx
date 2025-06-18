import React, { useRef, useState } from 'react';
import './studentProfile.scss';
import coverImage from '../../images/user_profile_cover.jpg';
import { FaEdit } from 'react-icons/fa';
import { useGlobalContext } from '../../context/GlobalContext.js'
import defaultProfileImage from '../../images/user_profile.jpg';

const StudentProfile = () => {
  const { userData } = useGlobalContext();

  const [profile, setProfile] = useState({
    id: userData?.data?.id || "N/A",
    name: userData?.data?.name || "N/A",
    email: userData?.data?.email || "N/A",
    phone: userData?.data?.phone || "N/A",
    address: userData?.data?.address || "N/A",
    image: userData?.data?.profile_picture_url || defaultProfileImage
  });

  const [profileImage, setProfileImage] = useState(profile.image);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // console.log(userData);

  const profileFields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone', type: 'tel' },
    { key: 'address', label: 'Address', type: 'text' }
  ];

  const [editable, setEditable] = useState({
    name: false,
    email: false,
    phone: false,
    address: false
  });

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleButtonClick = () => {
    if (!selectedFile) {
      fileInputRef.current.click();
    } else {
      setProfileImage(previewImage);
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewImage(imageURL);
    }
  };

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

  const handlePasswordChange = (key, value) => {
    setPasswordFields(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordSubmit = e => {
    e.preventDefault();
    // Add your validation or API call here
    console.log('Changing password:', passwordFields);
  };


  return (
    <div className="student-profile">
      <div className="cover">
        <img src={coverImage} alt="" />
      </div>

      <div className="profile-photo">
        <img src={previewImage || profileImage} alt="Profile" />
        <button onClick={handleButtonClick}>
          {selectedFile ? 'Update' : 'Upload New Picture'}
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>

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

        <button>Save Changes</button>
      </form>

      <form className="change-password" onSubmit={handlePasswordSubmit}>
        <h3>Change Password</h3>

        <div className="field">
          <label>Current Password</label>
          <p>:</p>
          <div className="input-wrap">
            <input
              type="password"
              value={passwordFields.currentPassword}
              onChange={e => handlePasswordChange('currentPassword', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label>New Password</label>
          <p>:</p>
          <div className="input-wrap">
            <input
              type="password"
              value={passwordFields.newPassword}
              onChange={e => handlePasswordChange('newPassword', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label>Confirm Password</label>
          <p>:</p>
          <div className="input-wrap">
            <input
              type="password"
              value={passwordFields.confirmPassword}
              onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit">Update Password</button>
      </form>


    </div>
  );
};

export default StudentProfile;
