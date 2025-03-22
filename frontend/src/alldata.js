import { useEffect, useState } from 'react';
import './alldata.css'; 

export default function Adminhome({userData}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://banking-backend-k0h9.onrender.com/alluser", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, userData);
      setData(data.data);
    });
  }, []);

  const deleteUser = (id) => {
    fetch(`https://banking-backend-k0h9.onrender.com/deleteuser/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        setData(data.filter(user => user._id !== id));
      }
    });
  };

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  return (
    <div className="all" style={{width:"auto"}}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Age</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.usertype}</td>
                <td>{i.age}</td>
                <td>
                  <button onClick={() => deleteUser(i._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
