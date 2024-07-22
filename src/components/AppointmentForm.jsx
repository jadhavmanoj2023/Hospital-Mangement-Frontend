import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorsFirstName, setDoctorsFirstName] = useState("");
  const [doctorsLastName, setDoctorsLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo = useNavigate();

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://hospital-management-backend-6v1yozd41-jadhavmanoj2023s-projects.vercel.app/api/v1/user/doctors",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":
              "https://hospital-management-backend-6v1yozd41-jadhavmanoj2023s-projects.vercel.app",
              "Access-Control-Allow-Origin":"GET,POST,PUT,DELETE"
          },
        }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const response = await axios.post(
        "https://hospital-management-backend-6v1yozd41-jadhavmanoj2023s-projects.vercel.app/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          aadhar,
          dateOfBirth,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorsFirstName,
          doctor_lastName: doctorsLastName,
          address,
          hasVisited: hasVisitedBool,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
    }
  };

  return (
    <>
      <div className="container form-component appointment-form ">
        <h2>Appointment</h2>

        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date Of Birth"
              value={dateOfBirth}
              onChange={(e) => setdateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => {
                setAppointmentDate(e.target.value);
              }}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorsFirstName("");
                setDoctorsLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${doctorsFirstName} ${doctorsLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorsFirstName(firstName);
                setDoctorsLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => {
                  return (
                    <option
                      value={`${doctor.firstName} ${doctor.lastName}`}
                      key={index}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  );
                })}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">GET APPOINTMENT</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
