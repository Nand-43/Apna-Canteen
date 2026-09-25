import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/CanteenStaff.module.css";

export default function CanteenStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const result = await axios.get(
        "http://localhost:5000/authRoutes/staffData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStaff(result.data.staff || []);
    } catch (err) {
      console.log("Staff fetch error:", err.response?.data || err);
      setError("Unable to load canteen staff details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>USER MANAGEMENT</span>
          <h1>Canteen Staff</h1>
          <p>View registered canteen staff and their contact details.</p>
        </div>

        <div className={styles.countBox}>
          <span>Total Staff</span>
          <strong>{staff.length}</strong>
        </div>
      </div>

      {loading ? (
        <div className={styles.message}>Loading staff...</div>
      ) : error ? (
        <div className={styles.messageError}>{error}</div>
      ) : staff.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>👨‍🍳</div>
          <h2>No staff found</h2>
          <p>Registered canteen staff will appear here.</p>
        </div>
      ) : (
        <div className={styles.userGrid}>
          {staff.map((member) => (
            <article className={styles.userCard} key={member.id}>
              <div className={styles.cardTop}>
                {member.photo ? (
                  <img
                    className={styles.avatar}
                    src={`http://localhost:5000/uploads/${member.photo}`}
                    alt={`${member.name}'s profile`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className={styles.avatarFallback}>👨‍🍳</div>
                )}

                <span className={`${styles.roleBadge} ${styles.staffBadge}`}>
                  Canteen Staff
                </span>
              </div>

              <div className={styles.userInfo}>
                <h2>{member.name}</h2>
                <p className={styles.email}>{member.email}</p>
              </div>

              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <span>Staff ID</span>
                  <strong>#{member.id}</strong>
                </div>

                <div className={styles.detailRow}>
                  <span>Phone</span>
                  <strong>{member.phone || "—"}</strong>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.statusDot}></span>
                Registered Staff
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}