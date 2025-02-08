import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
    license: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    setLoading(true); // Start loading
    try {
      if (element.type === "image/jpeg" || element.type === "image/png") {
        const data = new FormData();
        data.append("file", element);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        const res = await fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
          method: "POST",
          body: data,
        });
        const dataResponse = await res.json();
        if (dataResponse && dataResponse.url) {
          setFormDetails({ ...formDetails, license: dataResponse.url.toString() });
          // console.log("License uploaded:", dataResponse.url);
        } else {
          throw new Error("Error uploading image");
        }
      } else {
        toast.error("Please select an image in jpeg or png format");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const btnClick = async (e) => {
    e.preventDefault();
    
    // Check if the license field is empty
    if (!formDetails.license || formDetails.license.length < 1) {
      toast.error("Please upload a valid license image");
      return;
    }
    try {

      await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",
          formDetails,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Sending application...",
          success: (res) => {
            if (res.data.message === "Application already exists") {
              throw new Error("Application already exists");
            }
            return "Doctor application sent successfully";
          },
          error: (error) => {
            if (error.response && error.response.status === 400 && error.response.data.message === "Application already exists") {
              toast.error("Application already exists");
            } else {
              return "Unable to send Doctor application";
            }
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="register-section flex-center apply-doctor" id="contact">
        <div className="register-container flex-center contact">
          <h2 className="form-heading">Apply for Doctor</h2>
          <form className="register-form">
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Enter your specialization"
              value={formDetails.specialization}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience (in years)"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter your fees (in dollars)"
              value={formDetails.fees}
              onChange={inputChange}
            />
            <input
              type="file"
              name="license-img"
              className="form-input"
              onChange={(e) => onUpload(e.target.files[0])}
            />
            <button
              type="submit"
              className="btn form-btn"
              onClick={btnClick}
              disabled={loading ? true : false}
            >
              {loading ? "Uploading..." : "Apply"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
