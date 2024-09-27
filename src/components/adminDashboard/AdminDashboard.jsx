import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Assuming Firebase is used
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import './adminDashboard.css'; // Assuming you already have a CSS file for styling

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userPlans, setUserPlans] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [roleOptions] = useState(['User', 'Admin', 'Moderator', 'Guest']);
  const [statusOptions] = useState(['Pending', 'Accept', 'Reject']);
  
  // State for search queries
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [planSearchQuery, setPlanSearchQuery] = useState('');

  // Fetching users and userPlans from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, 'users');
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };

    const fetchUserPlans = async () => {
      const userPlansCollection = collection(db, 'userPlans');
      const userPlansSnapshot = await getDocs(userPlansCollection);
      const userPlansList = userPlansSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserPlans(userPlansList);
    };

    fetchUsers();
    fetchUserPlans();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.phoneNumber?.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  // Filter user plans based on search query
  const filteredPlans = userPlans.filter(plan =>
    plan.email?.toLowerCase().includes(planSearchQuery.toLowerCase()) ||
    plan.planName?.toLowerCase().includes(planSearchQuery.toLowerCase()) ||
    plan.userId?.toLowerCase().includes(planSearchQuery.toLowerCase()) ||
    plan.status?.toLowerCase().includes(planSearchQuery.toLowerCase())
  );

  // Handle input change in the editing form (for both users and plans)
  const handleInputChange = (e, field, type) => {
    if (type === 'user') {
      setEditingUser({
        ...editingUser,
        [field]: e.target.value,
      });
    } else if (type === 'plan') {
      setEditingPlan({
        ...editingPlan,
        [field]: e.target.value,
      });
    }
  };

  // Handle save button for user status updates
  const handleSaveUser = async () => {
    if (editingUser) {
      const userDoc = doc(db, 'users', editingUser.id);

      const updateData = {
        fullName: editingUser.fullName || 'N/A',
        phoneNumber: editingUser.phoneNumber || 'N/A',
        membership: editingUser.membership || 'Free',
        role: editingUser.role || 'User',
      };

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

  // Handle save button for plan status updates
  const handleSavePlan = async () => {
    if (editingPlan) {
      const planDoc = doc(db, 'userPlans', editingPlan.id);

      const updateData = {
        status: editingPlan.status || 'Pending',
      };

      try {
        await updateDoc(planDoc, updateData);
        alert('Plan status updated successfully!');

        // Update the plans list with the new status
        setUserPlans((prevPlans) =>
          prevPlans.map((plan) =>
            plan.id === editingPlan.id ? { ...editingPlan } : plan
          )
        );

        setEditingPlan(null);
      } catch (error) {
        console.error('Error updating plan: ', error.message);
        alert(`Error updating plan: ${error.message}`);
      }
    }
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
                <td>
                  <button onClick={() => setEditingUser(user)}>Edit</button>
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
              onChange={(e) => handleInputChange(e, 'fullName', 'user')}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={editingUser.phoneNumber}
              onChange={(e) => handleInputChange(e, 'phoneNumber', 'user')}
            />
          </label>
          <label>
            Membership:
            <input
              type="text"
              value={editingUser.membership}
              onChange={(e) => handleInputChange(e, 'membership', 'user')}
            />
          </label>
          <label>
            Role:
            <select
              value={editingUser.role}
              onChange={(e) => handleInputChange(e, 'role', 'user')}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
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

      {/* User plans management section with search */}
      <div className="dashboard-section">
        <h2>User Plans</h2>
        <input
          type="text"
          placeholder="Search Plans"
          value={planSearchQuery}
          onChange={(e) => setPlanSearchQuery(e.target.value)}
          className="search-input"
        />
        <table className="admin-table">
          <thead>
            <tr>
            <th>User Email</th>
              <th>Plan Name</th>
             
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan.id}>
                 <td>{plan.email || 'N/A'}</td>
                <td>{plan.planName || 'N/A'}</td>
               
                <td>{plan.status || 'Pending'}</td>
                <td>
                  <button onClick={() => setEditingPlan(plan)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPlan && (
        <div className="edit-plan-form">
          <h3>Edit Plan Status</h3>
          <label>
            Status:
            <select
              value={editingPlan.status}
              onChange={(e) => handleInputChange(e, 'status', 'plan')}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <div className="button-group">
            <button onClick={handleSavePlan}>Save</button>
            <button onClick={() => setEditingPlan(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
