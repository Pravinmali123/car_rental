import {
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Paper,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

const validationSchema = Yup.object({
  car_name: Yup.string().required("Required"),
  year: Yup.number().required("Required"),
  location: Yup.string().required("Required"),
  seats: Yup.number().required("Required"),
  transmission: Yup.string().required("Required"),
  fuel: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  // rating: Yup.number().required("Required"),
  driver: Yup.string().required("Required"),
  insurance: Yup.string().required("Required"),
  rc_book: Yup.string().required("Required"),
  puc: Yup.string().required("Required"),
  driving_license: Yup.string().required("Required"),

});

const Addcar = () => {
  const token = "MjaxytJgh0X2hQxH";
// MjaxytJgh0X2hQxH
  const admin = JSON.parse(localStorage.getItem("loggedInUser"));

  const [cars, setCars] = useState([]);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const [initialValues, setInitialValues] = useState({
    car_name: "",
    car_owner: admin?.email || "",
    year: "",
    location: "",
    seats: "",
    transmission: "",
    fuel: "",
    price: "",
    // rating: "",
    driver: "",
    insurance: "",
    rc_book: "",
    puc: "",
    driving_license: "",
    image: null,
  });

  //  GET CARS
const dataView = () => {
 axios
  .get("https://generateapi.techsnack.online/api/autocar", {
    headers: { Authorization: token },
  })
  .then((res) => {
    setCars(res.data.Data || []);
  })
  .catch((error) => {
    console.error(error.response?.data || error.message);
    if (error.response?.status === 404) {
      setCars([]); // no data yet
    } else {
      console.error(error);
    }
  });

};


  useEffect(() => {
    dataView();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    // 🔁 UPDATE
    if (editId) {
 axios.patch(
  `https://generateapi.techsnack.online/api/autocar/${editId}`,
  {
    car_name: values.car_name,
    car_owner: values.car_owner,
    year: values.year,
    location: values.location,
    seats: values.seats,
    transmission: values.transmission,
    fuel: values.fuel,
    price: values.price,
    // rating: values.rating,
    driver: values.driver,
    insurance: values.insurance,
    rc_book: values.rc_book,
    puc: values.puc,
    driving_license: values.driving_license,
    image: image,

  },
  {
    headers: { Authorization: token,
              "Content-Type": "multipart/form-data"
     },
  }
)

        .then(() => {
          alert("Car Updated Successfully");
          resetForm();
          setEditId(null);
          setImage(null);
          dataView();
        })
        .catch(console.error);
    }
    // ➕ ADD
    else {
      axios
        .post(
          "https://generateapi.techsnack.online/api/autocar",
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          // 🔥 Admin tag frontend only
          const newCar = {
            ...res.data.Data,
            adminEmail: admin.email,
          };  

          const stored =
            JSON.parse(localStorage.getItem("adminCars")) || [];

          localStorage.setItem(
            "adminCars",
            JSON.stringify([...stored, newCar])
          );

          alert("Car Added Successfully");
          resetForm();
          setImage(null);
          dataView();
        })
        .catch(console.error);
    }
  };

  // 🗑 DELETE
  const handleDelete = (id) => {
  axios.delete(
  `https://generateapi.techsnack.online/api/autocar/${id}`,
  {
    headers: { Authorization: token },
  }
)

      .then(() => {
        alert("Car Deleted");
        dataView();
      })
      .catch(console.error);
  };

  // ✏️ EDIT
  const handleEdit = (item) => {
    setInitialValues(item);
    setEditId(item._id);
  };

  return (
    <Box maxWidth={600}>
      <Typography variant="h5" mb={2}>
        {editId ? "Edit Car" : "Add Car"}
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form encType="multipart/form-data">
            <TextField fullWidth margin="normal" type="text" label="Car Name" name="car_name" value={values.car_name} onChange={handleChange} />
            <TextField fullWidth margin="normal" type="text" label="Car Owner" name="car_owner" value={values.car_owner} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Year" name="year" type="number" value={values.year} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Location" name="location" type="text" value={values.location} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Seats" name="seats" type="number" value={values.seats} onChange={handleChange} />

            <TextField select fullWidth margin="normal" type="text" label="Transmission" name="transmission" value={values.transmission} onChange={handleChange}>
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </TextField>

            <TextField select fullWidth margin="normal" type="text" label="Fuel Type" name="fuel" value={values.fuel} onChange={handleChange}>
              <MenuItem value="Petrol">Petrol</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="CNG">CNG</MenuItem>
              <MenuItem value="Electric">Electric</MenuItem>
            </TextField>

            <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={values.price} onChange={handleChange} />
            {/* <TextField fullWidth margin="normal" label="Rating" name="rating" type="number" value={values.rating} onChange={handleChange} /> */}

            <TextField select fullWidth margin="normal" type="text" label="Driver" name="driver" value={values.driver} onChange={handleChange}>
              <MenuItem value="With Driver">With Driver</MenuItem>
              <MenuItem value="No Driver">No Driver</MenuItem>
            </TextField>

            <TextField select fullWidth margin="normal" type="text" label="Insurance" name="insurance" value={values.insurance} onChange={handleChange}>
              <MenuItem value="With Insurance">With Insurance</MenuItem>
              <MenuItem value="No Insurance">No Insurance</MenuItem>
            </TextField>

                        <TextField select fullWidth margin="normal" type="text" label="RC Book" name="rc_book" value={values.rc_book} onChange={handleChange}>
              <MenuItem value="With RC Book">With RC Book</MenuItem>
              <MenuItem value="No RC Book">No RC Book</MenuItem>
            </TextField>
            <TextField select fullWidth margin="normal" type="text" label="PUC" name="puc" value={values.puc} onChange={handleChange}>
              <MenuItem value="With PUC">With PUC</MenuItem>
              <MenuItem value="No PUC">No PUC</MenuItem>
            </TextField>
            <TextField select fullWidth margin="normal" type="text" label="Driving License" name="driving_license" value={values.driving_license} onChange={handleChange}>
              <MenuItem value="With Driving License">With Driving License</MenuItem>
              <MenuItem value="No Driving License">No Driving License</MenuItem>
            </TextField>
            <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {editId ? "Update Car" : "Add Car"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* 🔥 TABLE */}
      <Paper sx={{ mt: 4 }}>
        <Typography p={2} fontWeight="bold">
          My Cars
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Car</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

    <TableBody>
  {cars.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4}>
        No cars added yet
      </TableCell>
    </TableRow>
  ) : (
    cars.map((c) => (
      <TableRow key={c._id}>
        <TableCell>{c.car_name}</TableCell>
        <TableCell>{c.car_owner}</TableCell>
        <TableCell>{c.location}</TableCell>
        <TableCell>₹{c.price}</TableCell>
        <TableCell>
          <Button onClick={() => handleEdit(c)}>Edit</Button>
          <Button color="error" onClick={() => handleDelete(c._id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

        </Table>
      </Paper>
    </Box>
  );
};

export default Addcar;
