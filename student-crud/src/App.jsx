import { useEffect, useState } from "react";

const API_URL = "http://localhost:3005/students";
const DEPT_API_URL = "http://localhost:3005/departments";

const EMPTY_FORM = {
  id: "",
  regno: "",
  name: "",
  branch: "",
  cgpa: "",
};

function App() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(DEPT_API_URL);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEditing = (student) => {
    setForm({
      id: student.id,
      regno: student.regno,
      name: student.name,
      branch: student.branch,
      cgpa: student.cgpa,
    });
    setEditingId(student.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.cgpa) < 0 || Number(form.cgpa) > 10) {
      alert("CGPA must be between 0 and 10");
      return;
    }

    const student = {
      id: Number(form.id),
      regno: form.regno,
      name: form.name,
      branch: form.branch,
      cgpa: Number(form.cgpa),
    };

    try {
      if (editingId === null) {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
        const data = await response.json();
        setStudents([...students, data]);
      } else {
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
        const data = await response.json();
        setStudents(students.map((s) => (s.id === editingId ? data : s)));
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`Are you sure you want to delete ${student.name}?`)) return;
    try {
      await fetch(`${API_URL}/${student.id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((s) => s.id !== student.id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Student Management Dashboard</h1>
        <p style={styles.subtitle}>Manage student records and department info seamlessly</p>
      </header>

      {/* BLOCK 1: Single-Line Horizontal Form (Soft Blue Background) */}
      <div style={styles.formCard}>
        <div style={styles.cardHeader}>
          <h2 style={{ ...styles.cardTitle, color: "#1e40af" }}>
            {editingId === null ? "➕ Add New Student" : "✏️ Edit Student"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} style={styles.inlineForm}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>ID</label>
            <input
              type="number"
              name="id"
              value={form.id}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="e.g. 101"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Reg Number</label>
            <input
              type="text"
              name="regno"
              value={form.regno}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="e.g. REG2026"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength="15"
              required
              style={styles.input}
              placeholder="Student Name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Branch</label>
            <input
              type="text"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. CSE"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>CGPA (0-10)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="cgpa"
              value={form.cgpa}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. 8.5"
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              {editingId === null ? "Create" : "Update"}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* BOTTOM SECTION: Tables Side-by-Side */}
      <div style={styles.tablesContainer}>
        {/* BLOCK 2: Students Table (Soft Emerald/Green Background) */}
        <div style={styles.studentsCard}>
          <div style={styles.cardHeader}>
            <h2 style={{ ...styles.cardTitle, color: "#065f46" }}>🎓 Students List</h2>
            <span style={styles.emeraldBadge}>{students.length} Total</span>
          </div>

          <div style={styles.tableResponsive}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.studentsTh}>ID</th>
                  <th style={styles.studentsTh}>Reg No</th>
                  <th style={styles.studentsTh}>Name</th>
                  <th style={styles.studentsTh}>Branch</th>
                  <th style={styles.studentsTh}>CGPA</th>
                  <th style={styles.studentsTh}>Dept ID</th>
                  <th style={styles.studentsTh}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={styles.emptyTd}>
                      No Students Found
                    </td>
                  </tr>
                ) : (
                  students.map((student, idx) => (
                    <tr key={student._id || student.id || idx} style={styles.tr}>
                      <td style={styles.td}><strong>{student.id}</strong></td>
                      <td style={styles.td}>{student.regno}</td>
                      <td style={styles.td}>{student.name}</td>
                      <td style={styles.td}>{student.branch || "-"}</td>
                      <td style={styles.td}>
                        <span style={getCgpaBadgeStyle(student.cgpa)}>
                          {student.cgpa ?? "N/A"}
                        </span>
                      </td>
                      <td style={styles.td}>{student.dept_id ?? "-"}</td>
                      <td style={styles.td}>
                        <button
                          onClick={() => startEditing(student)}
                          style={styles.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student)}
                          style={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BLOCK 3: Departments Table (Soft Amber/Warm Background) */}
        {/* Right Column: Departments Table */}
        {/* Right Column: Departments Table */}
        <div style={styles.deptsCard}>
          <div style={styles.cardHeader}>
            <h2 style={{ ...styles.cardTitle, color: "#92400e" }}>🏢 Departments</h2>
            <span style={styles.amberBadge}>{departments.length} Total</span>
          </div>

          <div style={styles.tableResponsive}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.deptsTh}>ID</th>
                  <th style={styles.deptsTh}>Dept ID</th>
                  <th style={styles.deptsTh}>Department Name</th>
                </tr>
              </thead>
              <tbody>
                {departments.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={styles.emptyTd}>
                      No Departments Found
                    </td>
                  </tr>
                ) : (
                  departments.map((dept, idx) => (
                    <tr key={dept._id || dept.id || idx} style={styles.tr}>
                      <td style={styles.td}><strong>{dept.id ?? (idx + 1)}</strong></td>
                      <td style={styles.td}>{dept.dept_id}</td>
                      <td style={styles.td}>{dept.dept_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper badge style
const getCgpaBadgeStyle = (cgpa) => {
  const val = Number(cgpa);
  let bg = "#e2e8f0";
  let color = "#334155";
  if (val >= 8) { bg = "#dcfce7"; color = "#166534"; }
  else if (val >= 6) { bg = "#fef9c3"; color = "#854d0e"; }
  else if (val < 6) { bg = "#fee2e2"; color = "#991b1b"; }

  return {
    backgroundColor: bg,
    color: color,
    padding: "3px 8px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "0.85rem",
    display: "inline-block",
  };
};

// Styles with distinct block colors
const styles = {
  appContainer: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "24px",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    margin: 0,
    fontSize: "1.75rem",
    color: "#0f172a",
    fontWeight: "700",
  },
  subtitle: {
    margin: "4px 0 0 0",
    color: "#64748b",
    fontSize: "0.95rem",
  },

  // BLOCK 1: Form Card (Blue Theme)
  formCard: {
    backgroundColor: "#eff6ff", // Soft Blue tint
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    padding: "20px",
    border: "1px solid #bfdbfe", // Blue border
    marginBottom: "20px",
  },

  // BLOCK 2: Students Card (Emerald Theme)
  studentsCard: {
    backgroundColor: "#f0fdf4", // Soft Green tint
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    padding: "20px",
    border: "1px solid #bbf7d0", // Green border
    flex: "2",
    minWidth: "350px",
  },

  // BLOCK 3: Departments Card (Amber Theme)
  deptsCard: {
    backgroundColor: "#fffbeb", // Soft Warm/Amber tint
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    padding: "20px",
    border: "1px solid #fde68a", // Amber border
    flex: "1",
    minWidth: "280px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    paddingBottom: "10px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "700",
  },
  emeraldBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontSize: "0.75rem",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  amberBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    fontSize: "0.75rem",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  inlineForm: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    gap: "12px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: "1 1 140px",
  },
  label: {
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #93c5fd",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "1px",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "9px 20px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
  },
  cancelButton: {
    backgroundColor: "#64748b",
    color: "#ffffff",
    padding: "9px 16px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
  },
  tablesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "flex-start",
  },
  tableResponsive: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "0.9rem",
  },
  studentsTh: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    fontWeight: "600",
    padding: "10px",
    borderBottom: "2px solid #a7f3d0",
  },
  deptsTh: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    fontWeight: "600",
    padding: "10px",
    borderBottom: "2px solid #fde68a",
  },
  tr: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  },
  td: {
    padding: "10px",
    color: "#1e293b",
  },
  emptyTd: {
    padding: "20px",
    textAlign: "center",
    color: "#64748b",
    fontStyle: "italic",
  },
  editBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
    marginRight: "6px",
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};

export default App;