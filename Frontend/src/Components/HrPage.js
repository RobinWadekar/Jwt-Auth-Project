import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AccessDenied from './AccessDenied';
import { apiClient } from '../api/apiClient';
import { getListOfEmpsAccToRole } from '../api/getListOfEmpsAccToRole';
import { getEmpByUsername } from '../api/getEmpByUsername';

const HrPage = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const [listOfEmps, setListOfEmps] = useState([]);

  if (!user.role || (user.role !== "HR" && user.role !== "CEO")) return <AccessDenied />;

  const hrPageResponse = async () => {
    try {
      const data = await apiClient('hr-page', user.token);
      setMessage(data);
    } catch (error) {
      console.log("\n\nError details : ", error);
    }
  }

  const getListOfEmps = async () => {
    try {
      const data = await getListOfEmpsAccToRole("HR", user.token);
      if(user.role === "HR") {
        setListOfEmps(data);
        return;
      }
      const currEmp = await getEmpByUsername(user.userName, user.token);
      const updatedData = await [...data, currEmp];
      setListOfEmps(updatedData);
    } catch (error) {
      console.log("\n\nAn error occurred. Here are the details : ", error);
    }
  }

  return (
    <div>
      <h2>Welcome HR!!!</h2><br /><br />This is your HR Page.<br />
      {!message ?
        <button onClick={() => { hrPageResponse(); getListOfEmps(); }}>Click here to see what we've got for you</button>
        :
        <div className='transparent-div' style={{ margin: '30px auto' }}>
          Hello <u>{user.name}</u>. <br />
          {/* This is the message from server for your role i.e., {user.role}!!! <br /> */}
          Anybody and everybody who has a role and is an HR or above in organizational hierarchy can access this page, and in your case you do, which is <u>{user.role}</u>. Here's a message from the server :  <br />
          <strong>{message}</strong><br /><br />
          Here's a list of all your colleagues :<br />
          {listOfEmps && listOfEmps.length > 0 && (
            <table className='emp-table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>UserName</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {listOfEmps.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.userName}</td>
                    <td>{emp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          }
        </div>
      }
      <p className='transparent-div' style={{ fontSize: "medium", width: "500px", padding: "10px 0px" }}>
        If you want to go back to the Home page, <br />
        <Link className='home-btn' to="/">Go back home</Link>
      </p>
    </div>
  )
}

export default HrPage
