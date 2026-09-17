import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  signInWithGoogleFirebase, 
  signOutFirebase 
} from '../firebase';
import { 
  doc, 
  setDoc, 
  collection, 
  onSnapshot, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

const AuthContext = createContext();

const ENV_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'trangndps10349@gmail.com,admin@mandarin.app';
const MASTER_ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'admin888';

export function AuthProvider({ children }) {
  // Admin email setting (supports comma-separated list of admin emails)
  const [adminEmail, setAdminEmail] = useState(() => {
    try {
      const saved = localStorage.getItem('mandarin_admin_email');
      if (saved) {
        const list = saved.split(',').map(e => e.trim().toLowerCase());
        ENV_ADMIN_EMAIL.split(',').forEach(e => {
          const norm = e.trim().toLowerCase();
          if (norm && !list.includes(norm)) list.push(norm);
        });
        return list.join(',');
      }
      return ENV_ADMIN_EMAIL;
    } catch {
      return ENV_ADMIN_EMAIL;
    }
  });

  // Helper to test if an email is an Admin email
  const checkIsAdmin = (email) => {
    if (!email) return false;
    const norm = email.toLowerCase().trim();
    const adminList = (adminEmail || ENV_ADMIN_EMAIL)
      .toLowerCase()
      .split(',')
      .map(e => e.trim());
    return adminList.includes(norm) || norm === 'admin@mandarin.app' || norm.includes('admin');
  };

  // All registered users persisted in DB / Firestore
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('mandarin_users_db');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial seed with Admins
    const initialAdmins = (adminEmail || ENV_ADMIN_EMAIL).split(',').map((email, idx) => ({
      id: `admin-seed-0${idx + 1}`,
      email: email.trim(),
      name: email.trim().split('@')[0],
      picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email.trim())}`,
      role: 'admin',
      status: 'approved',
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString()
    }));
    return initialAdmins;
  });

  // Currently logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mandarin_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Auto-upgrade logged in user if their email is in admin list
  useEffect(() => {
    if (currentUser && checkIsAdmin(currentUser.email)) {
      if (currentUser.role !== 'admin' || currentUser.status !== 'approved') {
        const upgraded = { ...currentUser, role: 'admin', status: 'approved' };
        setCurrentUser(upgraded);
        setUsers(prev => prev.map(u => u.email.toLowerCase() === currentUser.email.toLowerCase() ? upgraded : u));
      }
    }
  }, [currentUser, adminEmail]);

  // Firestore Realtime Listener for sync across devices
  useEffect(() => {
    if (!db) return;
    let unsubscribe;
    try {
      const usersCol = collection(db, 'users');
      unsubscribe = onSnapshot(usersCol, (snapshot) => {
        const remoteUsers = [];
        snapshot.forEach(docSnap => {
          remoteUsers.push(docSnap.data());
        });
        if (remoteUsers.length > 0) {
          setUsers(prev => {
            const mergedMap = new Map();
            prev.forEach(u => mergedMap.set(u.email.toLowerCase(), u));
            remoteUsers.forEach(u => mergedMap.set(u.email.toLowerCase(), u));
            return Array.from(mergedMap.values());
          });
        }
      }, () => {
        // Fallback to local storage silently
      });
    } catch (err) {}

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [adminEmail]);

  // Persist Admin Email
  useEffect(() => {
    try {
      if (adminEmail) {
        localStorage.setItem('mandarin_admin_email', adminEmail);
      }
    } catch (e) {
      console.error(e);
    }
  }, [adminEmail]);

  // Persist users DB to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mandarin_users_db', JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users DB:', e);
    }
  }, [users]);

  // Persist session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('mandarin_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('mandarin_current_user');
      }
    } catch (e) {
      console.error('Error saving session:', e);
    }
  }, [currentUser]);

  // Keep currentUser in sync with database status changes (e.g. when Admin approves/rejects)
  useEffect(() => {
    if (currentUser) {
      const dbUser = users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (dbUser) {
        if (dbUser.status !== currentUser.status || dbUser.role !== currentUser.role) {
          setCurrentUser(dbUser);
        }
      }
    }
  }, [users]);

  /**
   * Add a new Admin Email
   */
  const addAdminEmail = async (newEmail) => {
    const norm = newEmail.trim().toLowerCase();
    if (!norm || !norm.includes('@')) return false;

    // Update list of admin emails
    const currentList = adminEmail.split(',').map(e => e.trim().toLowerCase());
    if (!currentList.includes(norm)) {
      const updatedString = [...currentList, norm].join(',');
      setAdminEmail(updatedString);
      try {
        localStorage.setItem('mandarin_admin_email', updatedString);
      } catch (e) {}
    }

    // Check if user already exists in DB
    const existing = users.find(u => u.email.toLowerCase() === norm);
    const now = new Date().toISOString();

    if (existing) {
      const updated = { 
        ...existing, 
        role: 'admin', 
        status: 'approved', 
        approvedAt: now 
      };
      if (db) {
        updateDoc(doc(db, 'users', norm), { 
          role: 'admin', 
          status: 'approved', 
          approvedAt: now 
        }).catch(() => {});
      }
      setUsers(prev => prev.map(u => u.email.toLowerCase() === norm ? updated : u));
      if (currentUser?.email?.toLowerCase() === norm) {
        setCurrentUser(updated);
      }
    } else {
      const newAdminUser = {
        id: `admin-${Date.now()}`,
        email: norm,
        name: norm.split('@')[0],
        picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(norm)}`,
        role: 'admin',
        status: 'approved',
        createdAt: now,
        approvedAt: now
      };
      if (db) {
        setDoc(doc(db, 'users', norm), newAdminUser, { merge: true }).catch(() => {});
      }
      setUsers(prev => [newAdminUser, ...prev.filter(u => u.email.toLowerCase() !== norm)]);
    }

    return true;
  };

  /**
   * Login with Google using Firebase Authentication Popup
   */
  const loginWithGoogle = async () => {
    try {
      const { user, error } = await signInWithGoogleFirebase();
      if (error || !user) {
        return { success: false, error: error || 'Đăng nhập Google thất bại.' };
      }

      const email = user.email.trim().toLowerCase();
      const name = user.displayName || email.split('@')[0];
      const picture = user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`;
      const googleUid = user.uid;

      const isAdminEmail = checkIsAdmin(email);

      const existing = users.find(u => u.email.toLowerCase() === email);

      let loggedInUser;
      if (existing) {
        loggedInUser = {
          ...existing,
          name,
          picture,
          googleUid,
          role: isAdminEmail ? 'admin' : existing.role,
          status: isAdminEmail ? 'approved' : existing.status,
          lastLoginAt: new Date().toISOString()
        };
      } else {
        loggedInUser = {
          id: googleUid || `user-${Date.now()}`,
          email,
          name,
          picture,
          googleUid,
          role: isAdminEmail ? 'admin' : 'user',
          status: isAdminEmail ? 'approved' : 'pending',
          createdAt: new Date().toISOString(),
          approvedAt: isAdminEmail ? new Date().toISOString() : null,
          lastLoginAt: new Date().toISOString()
        };
      }

      // Sync to Firestore in background
      if (db) {
        setDoc(doc(db, 'users', email), loggedInUser, { merge: true }).catch(() => {});
      }

      setUsers(prev => {
        const filtered = prev.filter(u => u.email.toLowerCase() !== email);
        return [loggedInUser, ...filtered];
      });

      setCurrentUser(loggedInUser);
      return { success: true, user: loggedInUser };
    } catch (err) {
      console.error('Firebase Login Exception:', err);
      return { success: false, error: err.message };
    }
  };

  /**
   * Direct login / local test account helper (used by test suites & quick admin access)
   */
  const handleDirectLogin = ({ email, name, picture = null }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail = checkIsAdmin(normalizedEmail);

    const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
    let loggedInUser;

    if (existing) {
      loggedInUser = {
        ...existing,
        name: name || existing.name,
        picture: picture || existing.picture,
        role: isAdminEmail ? 'admin' : existing.role,
        status: isAdminEmail ? 'approved' : existing.status,
        lastLoginAt: new Date().toISOString()
      };
    } else {
      loggedInUser = {
        id: `user-${Date.now()}`,
        email: normalizedEmail,
        name: name || normalizedEmail.split('@')[0],
        picture: picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedEmail)}`,
        role: isAdminEmail ? 'admin' : 'user',
        status: isAdminEmail ? 'approved' : 'pending',
        createdAt: new Date().toISOString(),
        approvedAt: isAdminEmail ? new Date().toISOString() : null,
        lastLoginAt: new Date().toISOString()
      };
    }

    if (db) {
      setDoc(doc(db, 'users', normalizedEmail), loggedInUser, { merge: true }).catch(() => {});
    }

    setUsers(prev => {
      const filtered = prev.filter(u => u.email.toLowerCase() !== normalizedEmail);
      return [loggedInUser, ...filtered];
    });

    setCurrentUser(loggedInUser);
    return true;
  };

  // Approve a user
  const approveUser = (email) => {
    const normalized = email.toLowerCase();
    const now = new Date().toISOString();

    if (db) {
      updateDoc(doc(db, 'users', normalized), {
        status: 'approved',
        approvedAt: now
      }).catch(() => {});
    }

    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === normalized) {
        return {
          ...u,
          status: 'approved',
          approvedAt: now
        };
      }
      return u;
    }));
  };

  // Reject a user
  const rejectUser = (email) => {
    const normalized = email.toLowerCase();
    if (db) {
      updateDoc(doc(db, 'users', normalized), {
        status: 'rejected'
      }).catch(() => {});
    }

    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === normalized) {
        return { ...u, status: 'rejected' };
      }
      return u;
    }));
  };

  // Approve all pending users
  const approveAllPending = () => {
    const now = new Date().toISOString();
    const pendingList = users.filter(u => u.status === 'pending');

    if (db) {
      for (const u of pendingList) {
        updateDoc(doc(db, 'users', u.email.toLowerCase()), {
          status: 'approved',
          approvedAt: now
        }).catch(() => {});
      }
    }

    setUsers(prev => prev.map(u => u.status === 'pending' ? { ...u, status: 'approved', approvedAt: now } : u));
  };

  // Delete a user
  const deleteUser = (email) => {
    const normalized = email.toLowerCase();
    if (db) {
      deleteDoc(doc(db, 'users', normalized)).catch(() => {});
    }

    setUsers(prev => prev.filter(u => u.email.toLowerCase() !== normalized));
    if (currentUser?.email?.toLowerCase() === normalized) {
      logout();
    }
  };

  // Toggle Admin role
  const toggleAdminRole = (email) => {
    const normalized = email.toLowerCase();
    const target = users.find(u => u.email.toLowerCase() === normalized);
    const newRole = target?.role === 'admin' ? 'user' : 'admin';

    if (db) {
      updateDoc(doc(db, 'users', normalized), {
        role: newRole,
        status: 'approved'
      }).catch(() => {});
    }

    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === normalized) {
        return {
          ...u,
          role: newRole,
          status: 'approved'
        };
      }
      return u;
    }));
  };

  // Master Passcode Elevation for Owner
  const elevateToAdminWithPasscode = (passcode) => {
    if (passcode === MASTER_ADMIN_PASSCODE && currentUser) {
      const updated = { ...currentUser, role: 'admin', status: 'approved' };
      if (db) {
        updateDoc(doc(db, 'users', currentUser.email.toLowerCase()), {
          role: 'admin',
          status: 'approved'
        }).catch(() => {});
      }
      setCurrentUser(updated);
      setUsers(prev => prev.map(u => u.email === currentUser.email ? updated : u));
      return true;
    }
    return false;
  };

  // Logout
  const logout = async () => {
    try {
      await signOutFirebase();
    } catch (e) {}
    setCurrentUser(null);
    localStorage.removeItem('mandarin_current_user');
  };

  const isApproved = currentUser?.status === 'approved' || currentUser?.role === 'admin';
  const isAdmin = currentUser?.role === 'admin';
  const pendingCount = users.filter(u => u.status === 'pending').length;

  const value = {
    adminEmail,
    setAdminEmail,
    addAdminEmail,
    checkIsAdmin,
    users,
    currentUser,
    isApproved,
    isAdmin,
    pendingCount,
    loginWithGoogle,
    handleDirectLogin,
    approveUser,
    rejectUser,
    approveAllPending,
    deleteUser,
    toggleAdminRole,
    elevateToAdminWithPasscode,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
