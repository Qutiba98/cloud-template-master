import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Assuming Firebase is used
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import './adminDashboard.css'; // Assuming you already have a CSS file for styling

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]); // Store available subscription plans
  const [editingUser, setEditingUser] = useState(null);
  const [roleOptions] = useState(['User', 'Admin', 'Moderator', 'Guest']);
  const [statusOptions] = useState(['Pending', 'Accept', 'Reject']);

  // State for search queries
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // Fetching users and subscription plans from Firestore
  useEffect(() => {
    const fetchUsersAndPlans = async () => {
      try {
        // Fetch users from 'users' collection
        const userCollection = collection(db, 'users');
        const userSnapshot = await getDocs(userCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);

        // Fetch subscription plans from 'subscriptionPlans' collection
        const plansCollection = collection(db, 'subscriptionPlans');
        const plansSnapshot = await getDocs(plansCollection);
        const plansList = plansSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlans(plansList);
      } catch (error) {
        console.error('Error fetching users and plans: ', error);
      }
    };

    fetchUsersAndPlans();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.phoneNumber?.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  // Filter users with pending plan requests
  const pendingRequests = users.filter(user => user.planStatus === 'Pending');

  // Handle input change in the editing form (for users)
  const handleInputChange = (e, field) => {
    setEditingUser({
      ...editingUser,
      [field]: e.target.value,
    });
  };

  // Handle save button for user status updates
  const handleSaveUser = async () => {
    if (editingUser) {
      const userDoc = doc(db, 'users', editingUser.id);

      const updateData = {
        fullName: editingUser.fullName || 'N/A',
        phoneNumber: editingUser.phoneNumber || 'N/A',
        role: editingUser.role || 'User',
        planName: editingUser.planName || 'Free', // Update the selected plan
        planStatus: editingUser.planStatus || 'Pending', // Save the plan status
      };

      // If the admin accepts the plan, calculate signing and expiration dates
      if (editingUser.planStatus === 'Accept') {
        const signingDate = new Date(); // Current date for signing
        const expirationDate = new Date();
        expirationDate.setMonth(signingDate.getMonth() + 1); // Add 1 month to signing date

        // Update planName and subscriptionPlan with signing and expiration dates
        updateData.planName = editingUser.planName; // Update the user's planName
        updateData.subscriptionPlan = {
          ...editingUser.subscriptionPlan,
          planName: editingUser.planName, // Ensure the correct plan is stored in subscriptionPlan
          signingDate: signingDate, // Store signing date
          expirationDate: expirationDate, // Store expiration date
        };
      }

      try {
        await updateDoc(userDoc, updateData);
        alert('User updated successfully!');

        // Update the users list with the new data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingUser.id ? { ...editingUser } : user
          )
        );

        setEditingUser(null);
      } catch (error) {
        console.error('Error updating user: ', error.message);
        alert(`Error updating user: ${error.message}`);
      }
    }
  };

  // Approve or Reject plan with a delay to ensure the state is set first
  const handlePlanAction = (user, status) => {
    setEditingUser({ ...user, planStatus: status });
    setTimeout(() => handleSaveUser(), 0);
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* User management section with search */}
      <div className="dashboard-section">
        <h2>Users</h2>
        <input
          type="text"
          placeholder="Search Users"
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.target.value)}
          className="search-input"
        />
        <table className="admin-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Plan</th>
              <th>Plan Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.phoneNumber || 'N/A'}</td>
                <td>{user.role || 'User'}</td>
                <td>{user.planName || 'No Plan'}</td>
                <td>{user.planStatus || 'Pending'}</td>
                <td>
                  <button onClick={() => setEditingUser(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending plan requests section */}
      <div className="dashboard-section">
        <h2>Pending Plan Requests</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.planName || 'No Plan'}</td>
                <td>
                  <button onClick={() => handlePlanAction(user, 'Accept')}>
                    Approve
                  </button>
                  <button onClick={() => handlePlanAction(user, 'Reject')}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <label>
            Full Name:
            <input
              type="text"
              value={editingUser.fullName}
              onChange={(e) => handleInputChange(e, 'fullName')}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={editingUser.phoneNumber}
              onChange={(e) => handleInputChange(e, 'phoneNumber')}
            />
          </label>
          <label>
            Role:
            <select
              value={editingUser.role}
              onChange={(e) => handleInputChange(e, 'role')}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <label>
            Plan:
            <select
              value={editingUser.planName}
              onChange={(e) => handleInputChange(e, 'planName')}
            >
              {plans.map((plan) => (
                <option key={plan.id} value={plan.planName}>
                  {plan.planName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Plan Status:
            <select
              value={editingUser.planStatus}
              onChange={(e) => handleInputChange(e, 'planStatus')}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <div className="button-group">
            <button onClick={handleSaveUser}>Save</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
