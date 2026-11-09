import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccessDenied from './AccessDenied';
import { useAuth } from './AuthContext';
import { apiClient } from '../api/apiClient';
import { getListOfEmpsAccToRole } from '../api/getListOfEmpsAccToRole';
import { getEmpByUsername } from '../api/getEmpByUsername';

const EmpPage = () => {

  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const [listOfEmps, setListOfEmps] = useState([]);

  const empPageResponse = async () => {
    try {
      const data = await apiClient('emp-page', user.token);
      setMessage(data);
    } catch (error) {
      console.log("\n\nError details : ", error);
    }
  }

  const getListOfEmps = async () => {
    try {
      // const data = await getListOfEmpsAccToRole(user.role, user.token);
      const data = await getListOfEmpsAccToRole("EMPLOYEE", user.token);
      if(user.role === "EMPLOYEE") {
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

  if (!user.role) return <AccessDenied />;

  return (
    <div>
      <h2>Welcome Employee!!!</h2><br /><br />This is your Employee Page.<br />
      {!message ?
        <button onClick={() => { empPageResponse(); getListOfEmps(); }}>Click here to see what we've got for you</button>
        :
        <div className='transparent-div' style={{ margin: '30px auto' }}>
          Hello <u>{user.name}</u>. <br />
          {/* This is the message from server for your role i.e., {user.role}!!! <br /> */}
          Anybody and everybody can access this page as long as they have a role, and in your case you do, which is <u>{user.role}</u>. Here's a message from the server :  <br />
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

export default EmpPage
