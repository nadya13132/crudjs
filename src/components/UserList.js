import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const UserList = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
          await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
          getUser();
        } catch (error) {
           console.log(error);
        }
    }
    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to={`add`} className="button is-success">
                    Add New
                    </Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                           <tr key={user.id}>
                           <td>{index + 1}</td>
                           <td>{user.title}</td>
                           <td>{user.body}</td>
                           <td>
                             <Link 
                             to={`edit/${user.id}`} 
                             className="button is-small is-info"
                             >
                                Edit
                                </Link>
                             <button onClick={() => deleteUser(user.id)}className="button is-small is-danger">Delete</button>
                           </td>
                       </tr> 
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default UserList;