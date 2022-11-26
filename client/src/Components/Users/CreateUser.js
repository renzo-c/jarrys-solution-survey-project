import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const newUser = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const CreateUser = () => {
  const [userObj, setUserObj] = useState(newUser);
  const history = useHistory();

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setUserObj({ ...userObj, [name]: value });
  };

  const handleSaveUser = () => {
    axios
      .post("/api/users/add", userObj, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserObj(newUser);
        alert("User created successfully!");
        history.push("/users");
      })
      .catch((err) => {
        console.log("Error saving user", err);
      });
  };

  return (
    <div>
      <h1>Create User page</h1>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userObj.name}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userObj.username}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={userObj.email}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={userObj.password}
          onChange={onChangeValue}
        />
      </div>
      <br />
      <button onClick={handleSaveUser}>Save User</button>{" "}
      <Link to="/users">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default CreateUser;
