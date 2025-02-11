// import React, { useState } from 'react';

// const ResetPassword = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!password || !confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     setError('');
    
//     try {
//       // Assuming userId is available somehow (e.g., via props or local storage)
//       const userId = "user123";  // Replace with actual user ID logic
        
//       const response = await axios.post("http://localhost:8000/forgot-pass");

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('Password reset successfully');
//       } else {
//         setError(data.error || 'An error occurred');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>New Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//             required
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {success && <p style={{ color: 'green' }}>{success}</p>}
//         <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
