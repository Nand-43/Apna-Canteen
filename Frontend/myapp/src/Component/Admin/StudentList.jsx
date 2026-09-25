import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/StudentList.module.css";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const result = await axios.get(
        "http://localhost:5000/authRoutes/studentData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(result.data.students || []);
    } catch (err) {
      console.log("Student fetch error:", err.response?.data || err);
      setError("Unable to load student details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>USER MANAGEMENT</span>
          <h1>Students</h1>
          <p>View registered students and their details.</p>
        </div>

        <div className={styles.countBox}>
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>
      </div>

      {loading ? (
        <div className={styles.message}>Loading students...</div>
      ) : error ? (
        <div className={styles.messageError}>{error}</div>
      ) : students.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎓</div>
          <h2>No students found</h2>
          <p>Registered student accounts will appear here.</p>
        </div>
      ) : (
        <div className={styles.userGrid}>
          {students.map((student) => (
            <article className={styles.userCard} key={student.id}>
              <div className={styles.cardTop}>
                {student.photo ? (
                  <img
                    className={styles.avatar}
                    src={`http://localhost:5000/uploads/${student.photo}`}
                    alt={`${student.name}'s profile`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className={styles.avatarFallback}>🎓</div>
                )}

                <span className={`${styles.roleBadge} ${styles.studentBadge}`}>
                  Student
                </span>
              </div>

              <div className={styles.userInfo}>
                <h2>{student.name}</h2>
                <p className={styles.email}>{student.email}</p>
              </div>

              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <span>Student ID</span>
                  <strong>{student.student_id || "—"}</strong>
                </div>

                <div className={styles.detailRow}>
                  <span>Phone</span>
                  <strong>{student.phone || "—"}</strong>
                </div>

                <div className={styles.detailRow}>
                  <span>Department</span>
                  <strong>{student.department || "—"}</strong>
                </div>

                <div className={styles.detailRow}>
                  <span>Year</span>
                  <strong>{student.year || "—"}</strong>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.statusDot}></span>
                Registered Student
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}