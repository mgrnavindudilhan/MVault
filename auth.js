// auth.js - Fixed Version
let currentUser = null;
let isLoginMode = true;

// Initialize Auth
function initAuth() {
    console.log("Initializing auth...");
    checkAuthState();
    setupAuthListeners();
}

// Check Authentication State
function checkAuthState() {
    console.log("Checking auth state...");
    auth.onAuthStateChanged((user) => {
        console.log("Auth state changed:", user);
        if (user) {
            currentUser = user;
            handleSuccessfulAuth(user);
        } else {
            currentUser = null;
            showAuthPage();
        }
    }, (error) => {
        console.error("Auth state error:", error);
        showNotification("Authentication error: " + error.message);
    });
}

// Setup Auth Listeners
function setupAuthListeners() {
    // Enter key support for forms
    const loginPassword = document.getElementById('loginPassword');
    const signupConfirm = document.getElementById('signupConfirm');
    
    if (loginPassword) {
        loginPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleLogin();
        });
    }
    
    if (signupConfirm) {
        signupConfirm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSignup();
        });
    }
    
    console.log("Auth listeners setup completed");
}

// Switch Auth Tabs
function switchAuthTab(tab) {
    console.log("Switching to tab:", tab);
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelector('.auth-tab:nth-child(1)').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
        isLoginMode = true;
    } else {
        document.querySelector('.auth-tab:nth-child(2)').classList.add('active');
        document.getElementById('signupForm').classList.add('active');
        isLoginMode = false;
    }
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) {
        console.error("Input not found:", inputId);
        return;
    }
    
    const icon = input.parentNode.querySelector('.material-icons');
    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility_off';
    } else {
        input.type = 'password';
        icon.textContent = 'visibility';
    }
}

// Handle Login
function handleLogin() {
    console.log("Login attempt started");
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    console.log("Email:", email, "Password:", password ? "***" : "empty");

    if (!email || !password) {
        showNotification('කරුණාකර සියලුම ක්ෂේත්‍ර පුරවන්න');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('වලංගු email ලිපිනයක් ඇතුළත් කරන්න');
        return;
    }

    showProgress();
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful:", userCredential.user);
            hideProgress();
            showNotification('සාර්ථකව ඇතුල් විය!');
            currentUser = userCredential.user;
        })
        .catch((error) => {
            console.error("Login error:", error);
            hideProgress();
            handleAuthError(error);
        });
}

// Handle Signup
function handleSignup() {
    console.log("Signup attempt started");
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    console.log("Name:", name, "Email:", email);

    if (!name || !email || !password || !confirm) {
        showNotification('කරුණාකර සියලුම ක්ෂේත්‍ර පුරවන්න');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('වලංගු email ලිපිනයක් ඇතුළත් කරන්න');
        return;
    }

    if (password !== confirm) {
        showNotification('Passwords නොගැලපේ');
        return;
    }

    if (password.length < 6) {
        showNotification('Password අකුරු 6කට වඩා දිගු විය යුතුය');
        return;
    }

    showProgress();

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User created:", userCredential.user);
            // Save user profile
            return db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            console.log("User profile saved");
            hideProgress();
            showNotification('සාර්ථකව ගිණුම සාදන ලදී!');
            currentUser = auth.currentUser;
        })
        .catch((error) => {
            console.error("Signup error:", error);
            hideProgress();
            handleAuthError(error);
        });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Handle Successful Authentication
function handleSuccessfulAuth(user) {
    console.log("Authentication successful for:", user.email);
    
    // Update user data in Firestore
    db.collection('users').doc(user.uid).update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    }).catch((error) => {
        console.log("User might not exist, creating profile...");
        // User might not exist in Firestore yet, create profile
        db.collection('users').doc(user.uid).set({
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log("New user profile created");
        }).catch((error) => {
            console.error("Error creating user profile:", error);
        });
    });

    showMainApp();
    loadUserData();
}

// Show Auth Page
function showAuthPage() {
    console.log("Showing auth page");
    document.getElementById('authPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

// Show Main App
function showMainApp() {
    console.log("Showing main app");
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    // Initialize main app components
    if (typeof mvaultApp !== 'undefined') {
        mvaultApp.loadContent();
    }
    
    // Initialize comments manager
    if (typeof commentsManager !== 'undefined') {
        commentsManager.setUser(currentUser);
        if (currentUser) {
            commentsManager.init();
        }
    }
}

// Load User Data
function loadUserData() {
    if (!currentUser) {
        console.log("No current user");
        return;
    }

    console.log("Loading user data for:", currentUser.uid);
    
    // Get user profile from Firestore
    db.collection('users').doc(currentUser.uid).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                console.log("User data loaded:", userData);
                updateUIWithUserData(userData);
            } else {
                console.log("No user data found in Firestore");
                // Create default user data
                updateUIWithUserData({
                    name: currentUser.email.split('@')[0],
                    email: currentUser.email
                });
            }
        })
        .catch((error) => {
            console.error('Error loading user data:', error);
            // Use basic user data
            updateUIWithUserData({
                name: currentUser.email.split('@')[0],
                email: currentUser.email
            });
        });
}

// Update UI with User Data
function updateUIWithUserData(userData) {
    console.log("Updating UI with user data:", userData);
    
    // Update avatar
    const avatarText = document.getElementById('avatarText');
    const avatarLargeText = document.getElementById('avatarLargeText');
    const userDisplayName = document.getElementById('userDisplayName');
    const userEmail = document.getElementById('userEmail');
    const memberSince = document.getElementById('memberSince');

    if (avatarText) {
        avatarText.textContent = userData.name ? userData.name.charAt(0).toUpperCase() : 'U';
    }
    if (avatarLargeText) {
        avatarLargeText.textContent = userData.name ? userData.name.charAt(0).toUpperCase() : 'U';
    }
    if (userDisplayName) {
        userDisplayName.textContent = userData.name || currentUser.email.split('@')[0] || 'User';
    }
    if (userEmail) {
        userEmail.textContent = userData.email || currentUser.email || 'user@example.com';
    }
    if (memberSince && userData.createdAt) {
        const date = userData.createdAt.toDate();
        memberSince.textContent = date.getFullYear();
    } else if (memberSince) {
        memberSince.textContent = new Date().getFullYear();
    }
}

// Password Reset
function showResetPassword() {
    const email = prompt('කරුණාකර ඔබගේ email ඇතුළත් කරන්න:');
    if (email) {
        if (!validateEmail(email)) {
            showNotification('වලංගු email ලිපිනයක් ඇතුළත් කරන්න');
            return;
        }
        
        showProgress();
        auth.sendPasswordResetEmail(email)
            .then(() => {
                hideProgress();
                showNotification('Password reset ඊමේල් එක යවන ලදී');
            })
            .catch((error) => {
                hideProgress();
                handleAuthError(error);
            });
    }
}

// Handle Auth Errors
function handleAuthError(error) {
    console.error("Auth error:", error);
    let message = 'දෝෂයක් ඇති විය';
    
    switch (error.code) {
        case 'auth/invalid-email':
            message = 'වලංගු නොවන email ලිපිනයකි';
            break;
        case 'auth/user-disabled':
            message = 'මෙම ගිණුම අක්‍රීය කර ඇත';
            break;
        case 'auth/user-not-found':
            message = 'ගිණුම හමු නොවීය';
            break;
        case 'auth/wrong-password':
            message = 'වැරදි password';
            break;
        case 'auth/email-already-in-use':
            message = 'මෙම email ලිපිනය දැනටමත් භාවිතයේ පවතී';
            break;
        case 'auth/weak-password':
            message = 'Password තවත් ශක්තිමත් විය යුතුය';
            break;
        case 'auth/network-request-failed':
            message = 'ජාල සම්බන්ධතාවයේ දෝෂයකි';
            break;
        case 'auth/too-many-requests':
            message = 'බොහෝ අසාර්ථක උත්සාහයන්, කරුණාකර පසුව උත්සාහ කරන්න';
            break;
        default:
            message = error.message;
    }
    
    showNotification(message);
}

// Logout
function logout() {
    console.log("Logging out...");
    showProgress();
    auth.signOut().then(() => {
        hideProgress();
        showNotification('සාර්ථකව ඉවත් විය!');
        currentUser = null;
    }).catch((error) => {
        hideProgress();
        console.error("Logout error:", error);
        showNotification('Logout කිරීමට නොහැක: ' + error.message);
    });
}

// Toggle User Menu
function toggleUserMenu() {
    if (currentUser) {
        showNotification('User: ' + (currentUser.email || 'Unknown'));
    } else {
        showNotification('No user logged in');
    }
}

// Utility Functions
function showNotification(message) {
    console.log("Notification:", message);
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span class="material-icons">info</span>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function showProgress() {
    console.log("Showing progress");
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.display = 'block';
    }
}

function hideProgress() {
    console.log("Hiding progress");
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
}

// Debug function to check Firebase status
function checkFirebaseStatus() {
    console.log("Firebase auth object:", auth);
    console.log("Firebase db object:", db);
    console.log("Current user:", auth.currentUser);
}

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing auth...");
    initAuth();
    
    // Add debug button for testing
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Debug Firebase';
    debugButton.style.position = 'fixed';
    debugButton.style.bottom = '10px';
    debugButton.style.right = '10px';
    debugButton.style.zIndex = '10000';
    debugButton.style.padding = '5px 10px';
    debugButton.style.background = '#333';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.borderRadius = '5px';
    debugButton.onclick = checkFirebaseStatus;
    document.body.appendChild(debugButton);
});
