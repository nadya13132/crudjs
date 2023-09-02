import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const EditUser = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
           await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
           title,
           body
        });
        navigate("/");
        } catch (error) {
          console.log(error);
        }
    };

    const getUserById = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setTitle(response.data.title);
        setBody(response.data.body);
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input type="text" 
                            className="input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                             placeholder="Title"
                             />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Body</label>
                        <div className="control">
                            <input type="text"
                             className="input"
                             value={body}
                            onChange={(e) => setBody(e.target.value)}
                              placeholder="Body"
                              />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">
                            Update
                            </button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser;