import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN; //http://127.0.0.1:5000/api

function Register() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
    pic:"",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) =>{
          if (data && data.url) {
            setFile(data.url.toString());
            setFormDetails({ ...formDetails, pic: data.url.toString() });
          } else {
            toast.error("Error uploading image");
          }
        } 
        );
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      if (loading) return;
      // if (file === "") return;
      
      const { firstname, lastname, email, password, confpassword ,pic} = formDetails;
      // console.log("pic ",pic)
      const userPic = pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"; // Use the default if pic is empty
      if (!firstname || !lastname || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      }
       else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      }
      else if ( lastname.length<3) {
        return toast.error("Last name must be at least 3 characters long");
      }
      else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } 
      else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

        
      try {
        const response = await axios.post("/user/register", {
          firstname,
          lastname,
          email,
          password,
          pic: userPic,
        });
        toast.success("User registered successfully");
        console.log(response);
        return navigate("/login");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Unable to register user");
        }
        // console.error(error);
      }
    } catch (error) {
      console.error(`Error  ${error} message ${error.message}`);
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form
          onSubmit={formSubmit}
          className="register-form"
        >
          <input
            type="text"
            name="firstname"
            className="form-input"
            placeholder="Enter your first name"
            value={formDetails.firstname}
            onChange={inputChange}
          />
          <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder="Enter your last name"
            value={formDetails.lastname}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Confirm your password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <input
            type="file"
            onChange={(e) => {
            onUpload(e.target.files[0])
            }}
            name="profile-pic"
            id="profile-pic"
            className="form-input"
          />
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
          >
            sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink
            className="login-link"
            to={"/login"}
          >
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
