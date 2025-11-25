// Authentication Management
let currentUser = null;
let isLoginMode = true;

// Initialize Auth
function initAuth() {
    checkAuthState();
    setupAuthListeners();
}

// Check Authentication State
function checkAuthState() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            handleSuccessfulAuth(user);
        } else {
            currentUser = null;
            showAuthPage();
        }
    });
}

// Setup Auth Listeners
function setupAuthListeners() {
    // Enter key support for forms
    document.getElementById('loginPassword')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    document.getElementById('signupConfirm')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSignup();
    });
}

// Switch Auth Tabs
function switchAuthTab(tab) {
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
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showNotification('කරුණාකර සියලුම ක්ෂේත්‍ර පුරවන්න');
        return;
    }

    showProgress();
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            hideProgress();
            showNotification('සාර්ථකව ඇතුල් විය!');
            currentUser = userCredential.user;
        })
        .catch((error) => {
            hideProgress();
            handleAuthError(error);
        });
}

// Handle Signup
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    if (!name || !email || !password || !confirm) {
        showNotification('කරුණාකර සියලුම ක්ෂේත්‍ර පුරවන්න');
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
            // Save user profile
            return db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            hideProgress();
            showNotification('සාර්ථකව ගිණුම සාදන ලදී!');
            currentUser = auth.currentUser;
        })
        .catch((error) => {
            hideProgress();
            handleAuthError(error);
        });
}

// Handle Successful Authentication
function handleSuccessfulAuth(user) {
    // Update user data in Firestore
    db.collection('users').doc(user.uid).update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(() => {
        // User might not exist in Firestore yet, create profile
        db.collection('users').doc(user.uid).set({
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
    });

    showMainApp();
    loadUserData();
}

// Show Auth Page
function showAuthPage() {
    document.getElementById('authPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

// Show Main App
function showMainApp() {
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
}

// Load User Data
function loadUserData() {
    if (!currentUser) return;

    // Get user profile from Firestore
    db.collection('users').doc(currentUser.uid).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                updateUIWithUserData(userData);
            }
        })
        .catch((error) => {
            console.error('Error loading user data:', error);
        });
}

// Update UI with User Data
function updateUIWithUserData(userData) {
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
        userDisplayName.textContent = userData.name || 'User';
    }
    if (userEmail) {
        userEmail.textContent = userData.email || 'user@example.com';
    }
    if (memberSince && userData.createdAt) {
        const date = userData.createdAt.toDate();
        memberSince.textContent = date.getFullYear();
    }
}

// Password Reset
function showResetPassword() {
    const email = prompt('කරුණාකර ඔබගේ email ඇතුළත් කරන්න:');
    if (email) {
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
        default:
            message = error.message;
    }
    
    showNotification(message);
}

// Logout
function logout() {
    showProgress();
    auth.signOut().then(() => {
        hideProgress();
        showNotification('සාර්ථකව ඉවත් විය!');
        currentUser = null;
    }).catch((error) => {
        hideProgress();
        showNotification('Logout කිරීමට නොහැක: ' + error.message);
    });
}

// Toggle User Menu
function toggleUserMenu() {
    showNotification('User: ' + (currentUser?.email || 'Unknown'));
}

// Utility Functions
function showNotification(message) {
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
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.display = 'block';
    }
}

function hideProgress() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
}

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});
