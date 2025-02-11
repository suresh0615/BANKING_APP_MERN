import './userdetails.css'; 

export default function Userhome({userData}) {

  const logout=()=>{
    window.localStorage.clear();
    window.location.href = "./login";
  }
  return(
    <div className="all">
    {userData ? (
      <div className="userDataBox">
        <h1 className="heading">Welcome, {userData.name}</h1>
        <p><strong>Logged in Email:</strong> {userData.email}</p><br/>
        <p><strong>Logged in Phone number:</strong> {userData.phone}</p><br/>
        <p><strong>Your Account Balance:</strong> {userData.balance}</p><br/>
        <button onClick={logout}>Log out</button>
      </div>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>
  )
}
