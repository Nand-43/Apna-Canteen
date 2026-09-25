import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Account.module.css";

export default function AdminAccount() {

    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        fetchAccount();
    }, []);


    const fetchAccount = async () => {

        try {

            const token = localStorage.getItem("accessToken");
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user?.id) {
                console.log("Admin ID not found");
                return;
            }

            const response = await axios.get(
                `http://localhost:5000/userRoutes/admin/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Admin account:", response.data.result);

            setAccount(response.data.result);

        } catch (err) {

            console.log("Admin account was not fetched");
            console.log(err.response?.data || err);

        } finally {

            setLoading(false);

        }
    };


    if (loading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loader}></div>
                <p>Loading your account...</p>
            </div>
        );
    }


    if (!account) {
        return (
            <div className={styles.errorBox}>
                Unable to load account details.
            </div>
        );
    }


    return (

        <div className={styles.accountPage}>

            <div className={styles.backgroundShape}></div>


            {/* HEADER */}

            <div className={styles.pageHeader}>

                <div>

                    <span className={styles.smallTitle}>
                        STAFF ACCOUNT
                    </span>

                    <h1>My Profile</h1>

                    <p>
                        Manage your canteen staff account and information.
                    </p>

                </div>

            </div>


            {/* HERO */}

            <div className={styles.profileHero}>

                <div className={styles.profileInfo}>

                    <div className={styles.avatarWrapper}>

                        {account.photo ? (

                            <img
                                src={`http://localhost:5000/uploads/${account.photo}`}
                                alt="Profile"
                                className={styles.profileImage}
                            />

                        ) : (

                            <div className={styles.avatar}>
                                {account.name?.charAt(0).toUpperCase()}
                            </div>

                        )}

                        <span className={styles.onlineDot}></span>

                    </div>


                    <div className={styles.profileText}>

                        <h2>{account.name}</h2>

                        <p>{account.email}</p>

                        <div className={styles.badges}>

                            <span className={styles.studentBadge}>
                                🧑‍🍳 Canteen Staff
                            </span>

                            <span className={styles.activeBadge}>
                                ● Active
                            </span>

                        </div>

                    </div>

                </div>


                <div className={styles.heroActions}>

                    <button
                        className={styles.editButton}
                        onClick={() => setEditing(true)}
                    >
                        ✏️ Edit Profile
                    </button>

                </div>

            </div>


            {/* INFORMATION */}

            <div className={styles.contentGrid}>

                <div className={styles.infoCard}>

                    <div className={styles.cardHeader}>

                        <div className={styles.cardIcon}>
                            👤
                        </div>

                        <div>
                            <h3>Staff Information</h3>
                            <p>Your account details</p>
                        </div>

                    </div>


                    <div className={styles.infoGrid}>

                        <div className={styles.infoItem}>
                            <span>Full Name</span>
                            <strong>
                                {account.name || "Not provided"}
                            </strong>
                        </div>


                        <div className={styles.infoItem}>
                            <span>Email Address</span>
                            <strong>
                                {account.email || "Not provided"}
                            </strong>
                        </div>


                        <div className={styles.infoItem}>
                            <span>Phone Number</span>
                            <strong>
                                {account.phone || "Not provided"}
                            </strong>
                        </div>


                        <div className={styles.infoItem}>
                            <span>Account Role</span>
                            <strong>
                                Canteen Staff
                            </strong>
                        </div>

                    </div>

                </div>


                {/* ACCOUNT STATUS */}

                <div className={styles.infoCard}>

                    <div className={styles.cardHeader}>

                        <div className={styles.cardIcon}>
                            🛡️
                        </div>

                        <div>
                            <h3>Account Status</h3>
                            <p>Your current account state</p>
                        </div>

                    </div>


                    <div className={styles.statusBox}>

                        <div className={styles.statusDot}></div>

                        <div>
                            <strong>Account Active</strong>
                            <p>
                                Your canteen staff account is currently active.
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* DANGER ZONE */}

            <div className={styles.dangerCard}>

                <div>

                    <h3>⚠️ Account Management</h3>

                    <p>
                        Deleting your account is permanent and cannot be undone.
                    </p>

                </div>

                <button
                    className={styles.deleteButton}
                    onClick={() => setShowDelete(true)}
                >
                    Delete Account
                </button>

            </div>


            {/* DELETE MODAL */}

            {showDelete && (

                <div className={styles.modalOverlay}>

                    <div className={styles.deleteModal}>

                        <div className={styles.deleteIcon}>
                            ⚠️
                        </div>

                        <h2>Delete Account?</h2>

                        <p>
                            Are you sure you want to delete your account?
                            This action cannot be undone.
                        </p>

                        <div className={styles.modalActions}>

                            <button
                                className={styles.cancelButton}
                                onClick={() => setShowDelete(false)}
                            >
                                Cancel
                            </button>

                            <button className={styles.confirmDelete}>
                                Yes, Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* EDIT MODAL */}

            {editing && (

                <div className={styles.modalOverlay}>

                    <div className={styles.editModal}>

                        <div className={styles.modalHeader}>

                            <div>

                                <h2>Edit Profile</h2>

                                <p>
                                    Update your staff information
                                </p>

                            </div>

                            <button
                                className={styles.closeButton}
                                onClick={() => setEditing(false)}
                            >
                                ×
                            </button>

                        </div>


                        <div className={styles.formGrid}>

                            <div className={styles.inputGroup}>

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    defaultValue={account.name}
                                />

                            </div>


                            <div className={styles.inputGroup}>

                                <label>Phone</label>

                                <input
                                    type="text"
                                    defaultValue={account.phone}
                                />

                            </div>

                        </div>


                        <div className={styles.editActions}>

                            <button
                                className={styles.cancelButton}
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>

                            <button className={styles.saveButton}>
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}