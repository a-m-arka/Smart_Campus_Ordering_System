import React, { useRef, useState } from 'react';
import './studentProfile.scss';
import coverImage from '../../images/user_profile_cover.jpg';
import { useGlobalContext } from '../../context/GlobalContext.js';
import defaultProfileImage from '../../images/user_profile.jpg';
import ChangePassword from '../../components/Profile/changePassword.jsx';
import UpdateInfo from '../../components/Profile/updateInfo.jsx';

const StudentProfile = () => {
  const { userData } = useGlobalContext();
  const server = process.env.REACT_APP_SERVER;

  const [profile, setProfile] = useState({
    id: userData?.data?.id || "N/A",
    name: userData?.data?.name || "N/A",
    email: userData?.data?.email || "N/A",
    phone: userData?.data?.phone || "N/A",
    address: userData?.data?.address || "N/A",
    image: userData?.data?.profile_picture_url || defaultProfileImage
  });

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeButton, setActiveButton] = useState("");
  const fileInputRef = useRef(null);

  const profileFields = [
    { key: 'name', label: 'Name', type: 'text', editable: false },
    { key: 'email', label: 'Email', type: 'email', editable: false },
    { key: 'phone', label: 'Phone', type: 'tel', editable: false },
    { key: 'address', label: 'Address', type: 'text', editable: false }
  ];

  const handleImageUpdate = async () => {
    if (!selectedFile) {
      fileInputRef.current.click();
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to update the profile picture");
      window.location.reload();
      return;
    }

    try {
      setLoading(true);
      setActiveButton('image');

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`${server}/api/student/update-profile-picture`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Failed to update image');
        return;
      }

      alert(data.message || 'Profile picture updated successfully');
      setProfile(prev => ({ ...prev, image: previewImage }));
      setSelectedFile(null);
      setPreviewImage(null);

    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Failed to update profile picture. Try again');
    } finally {
      setLoading(false);
      setActiveButton("");
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="student-profile">

      <div className="cover">
        <img src={coverImage} alt="" />
      </div>

      <div className="profile-photo">
        <img src={previewImage || profile.image} alt="Profile" />

        <button onClick={handleImageUpdate} disabled={loading}>
          {(loading && activeButton === 'image')
            ? 'Uploading Image...'
            : (selectedFile ? 'Update' : 'Upload New Picture')}
        </button>

        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>

      <UpdateInfo
        userRole="student"
        profileFields={profileFields}
        initialProfile={profile}
      />

      <ChangePassword
        server={server}
        userRole="student"
      />
    </div>
  );
};

export default StudentProfile;