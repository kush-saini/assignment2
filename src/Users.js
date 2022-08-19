import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { toast } from "react-hot-toast";
function Users() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState();
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${pageNo}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setPages(data.total_pages);
      });
  }, [pageNo]);

  const pageHandler = (step) => {
    if (step === "prev") {
      if (pageNo > 0) {
        setPageNo((prev) => prev - 1);
      } else {
        setPageNo(1);
      }
    } else {
      if (pageNo <= pages) {
        setPageNo((prev) => prev + 1);
      } else {
        setPageNo(pages);
      }
    }
  };

  const deleteHandler = async (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        console.log("Deleted", res);
        toast.success("Deleted Successfully");
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <div>
      <Layout>
        <span>
          <span>
            <h1 className="mb-10">Users</h1>
          </span>
          <table className="mb-10">
            <tr>
              <th>Avtar</th>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th colSpan={2}>Actions</th>
            </tr>

            {users?.map((st) => {
              return (
                <tr key={st.id}>
                  <td className="w50">
                    <img src={st.avatar} className="wInherit" />
                  </td>
                  <td>{st.id}</td>
                  <td>{st.first_name}</td>
                  <td>{st.last_name}</td>
                  <td>{st.email}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteHandler(st.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="flexAround">
            <button onClick={() => pageHandler("prev")} disabled={pageNo === 1}>
              Previous
            </button>
            <button
              onClick={() => pageHandler("next")}
              disabled={pageNo === pages}
            >
              Next
            </button>
          </div>
        </span>
      </Layout>
    </div>
  );
}

export default Users;
