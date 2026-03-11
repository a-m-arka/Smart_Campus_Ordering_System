import React, { useState } from 'react';
import './changePassword.scss';

const ChangePassword = ({ server, userRole, onSave, onCancel }) => {

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (key, value) => {
    setPasswordFields(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to change password");
      window.location.reload();
      return;
    }

    try {
      setLoading(true);

      const payload = {
        role: userRole,
        currentPassword: passwordFields.currentPassword,
        newPassword: passwordFields.newPassword
      };

      const response = await fetch(`${server}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to update password');
        return;
      }

      alert(data.message || 'Password updated successfully');

      setPasswordFields({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      if( typeof onSave === 'function' ) {
        onSave();
      }

    } catch (error) {
      console.error(error);
      alert('Failed to update password. Try again');
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <button type="submit" disabled={loading}>
        {loading ? 'Changing Password...' : 'Change Password'}
      </button>

      {typeof onCancel === 'function' && (
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ChangePassword;