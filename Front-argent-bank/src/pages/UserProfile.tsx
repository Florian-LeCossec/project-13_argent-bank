import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { useEffect, useState } from 'react';
import { getUserThunk } from '../features/user/userThunk';
import { updateUserThunk } from '../features/user/userThunk';
import { selectUser } from '../features/user/userSlice';

function UserProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await dispatch(getUserThunk()).unwrap();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    void fetchUser();
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    console.log('je passe');
    if (firstName && lastName) {
      await dispatch(updateUserThunk({ firstName, lastName }));
      setIsEditing(!isEditing);
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing ? (
          <h1>Welcome back <br />{user?.firstName} {user?.lastName}!</h1>
        ) : (
          <>
            <h1>Welcome back</h1>
            <form className="edit-form">
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </form>
            <div className="edit-button-container">
              <button className="edit-button" onClick={() => void handleSave()}>Save</button>
              <button className="edit-button" onClick={handleEditClick}>Cancel</button>
            </div>
          </>
        )}
        {!isEditing && (
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default UserProfile;
