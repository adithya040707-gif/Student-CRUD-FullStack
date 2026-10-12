const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3005;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/Adithya_28129";

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

/* ==========================
   STUDENT SCHEMA
========================== */

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },

  regno: String,

  name: {
    type: String,
    required: true,
  },

  branch: String,

  cgpa: {
    type: Number,
    min: 0,
    max: 10,
  },

  dept_id: Number
});

const Student = mongoose.model(
  "students",
  studentSchema
);

/* ==========================
   DEPARTMENT SCHEMA
========================== */

const departmentSchema = new mongoose.Schema({
  dept_id: {
    type: Number,
    unique: true,
    required: true,
  },

  dept_name: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model(
  "departments",
  departmentSchema
);

/* ==========================
   STUDENT CRUD APIs
========================== */

// READ ALL STUDENTS

app.get("/students", async (req, res) => {
  const students = await Student.find()
    .sort({ id: 1 });

  res.json(students);
});

// READ ONE STUDENT

app.get("/students/:id", async (req, res) => {
  const student = await Student.findOne({
    id: Number(req.params.id),
  });

  res.json(student);
});

// CREATE STUDENT

app.post("/students", async (req, res) => {
  const item = new Student(req.body);

  await item.save();

  res.status(201).json(item);
});

// UPDATE STUDENT

app.put("/students/:id", async (req, res) => {
  const updated =
    await Student.findOneAndUpdate(
      {
        id: Number(req.params.id),
      },
      req.body,
      {
        new: true,
      }
    );

  res.json(updated);
});

// DELETE STUDENT

app.delete("/students/:id", async (req, res) => {
  await Student.findOneAndDelete({
    id: Number(req.params.id),
  });

  res.json({
    message:
      "Student deleted successfully",
  });
});

/* ==========================
   DEPARTMENT APIs
========================== */

// READ ALL DEPARTMENTS

app.get("/departments", async (req, res) => {
  const departments =
    await Department.find()
      .sort({ dept_id: 1 });

  res.json(departments);
});

// CREATE DEPARTMENT

app.post("/departments", async (req, res) => {
  const dept = new Department(req.body);

  await dept.save();

  res.status(201).json(dept);
});

/* ==========================
   DATABASE CONNECTION
========================== */

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((err) =>
    console.log(err)
  );