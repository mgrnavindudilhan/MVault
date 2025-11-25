// Comments Management
class CommentsManager {
    constructor() {
        this.comments = [];
        this.currentUser = null;
    }

    // Initialize comments system
    init() {
        this.loadComments();
        this.setupCommentsListeners();
    }

    // Set current user
    setUser(user) {
        this.currentUser = user;
    }

    // Setup event listeners
    setupCommentsListeners() {
        // Enter key support for comment input
        document.getElementById('commentText')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.submitComment();
            }
        });
    }

    // Submit new comment
    async submitComment() {
        if (!this.currentUser) {
            showNotification('කරුණාකර පළමුව ඇතුල් වන්න');
            return;
        }

        const commentText = document.getElementById('commentText').value.trim();
        
        if (!commentText) {
            showNotification('කරුණාකර අදහස් ඇතුළත් කරන්න');
            return;
        }

        if (commentText.length < 5) {
            showNotification('අදහස් අකුරු 5කට වඩා දිගු විය යුතුය');
            return;
        }

        showProgress();

        try {
            // Get user data
            const userDoc = await db.collection('users').doc(this.currentUser.uid).get();
            const userData = userDoc.data();

            // Create comment object
            const comment = {
                text: commentText,
                userName: userData.name || this.currentUser.email.split('@')[0],
                userEmail: this.currentUser.email,
                userId: this.currentUser.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                dislikes: 0
            };

            // Save to Firestore
            await db.collection('comments').add(comment);
            
            // Clear input
            document.getElementById('commentText').value = '';
            
            hideProgress();
            showNotification('අදහස් සාර්ථකව එකතු කරන ලදී!');
            
            // Reload comments
            this.loadComments();
            
        } catch (error) {
            hideProgress();
            console.error('Error submitting comment:', error);
            showNotification('අදහස් එකතු කිරීමට නොහැක: ' + error.message);
        }
    }

    // Load all comments
    async loadComments() {
        try {
            const commentsSnapshot = await db.collection('comments')
                .orderBy('timestamp', 'desc')
                .get();

            this.comments = [];
            commentsSnapshot.forEach(doc => {
                this.comments.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            this.displayComments();
            
        } catch (error) {
            console.error('Error loading comments:', error);
            showNotification('අදහස් ලබා ගැනීමට නොහැක');
        }
    }

    // Display comments in UI
    displayComments() {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        if (this.comments.length === 0) {
            commentsList.innerHTML = `
                <div class="comment-card" style="text-align: center; color: var(--text-muted);">
                    <p>තවම අදහස් නැත. පළමු අදහස එකතු කරන්න!</p>
                </div>
            `;
            return;
        }

        commentsList.innerHTML = this.comments.map(comment => this.createCommentHTML(comment)).join('');
    }

    // Create HTML for a comment
    createCommentHTML(comment) {
        const timeAgo = this.getTimeAgo(comment.timestamp?.toDate());
        const userInitial = comment.userName ? comment.userName.charAt(0).toUpperCase() : 'U';

        return `
            <div class="comment-card" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-user">
                        <div class="user-avatar-small">${userInitial}</div>
                        <div>
                            <div class="user-name">${comment.userName}</div>
                            <div class="comment-time">${timeAgo}</div>
                        </div>
                    </div>
                </div>
                <div class="comment-text">${this.escapeHTML(comment.text)}</div>
                <div class="comment-actions">
                    <button class="action-btn small" onclick="commentsManager.likeComment('${comment.id}')">
                        <span class="material-icons">thumb_up</span>
                        <span>${comment.likes || 0}</span>
                    </button>
                    <button class="action-btn small" onclick="commentsManager.dislikeComment('${comment.id}')">
                        <span class="material-icons">thumb_down</span>
                        <span>${comment.dislikes || 0}</span>
                    </button>
                    ${this.currentUser && this.currentUser.uid === comment.userId ? `
                    <button class="action-btn small delete" onclick="commentsManager.deleteComment('${comment.id}')">
                        <span class="material-icons">delete</span>
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Like a comment
    async likeComment(commentId) {
        if (!this.currentUser) {
            showNotification('කරුණාකර පළමුව ඇතුල් වන්න');
            return;
        }

        try {
            const commentRef = db.collection('comments').doc(commentId);
            await commentRef.update({
                likes: firebase.firestore.FieldValue.increment(1)
            });
            
            this.loadComments();
            
        } catch (error) {
            console.error('Error liking comment:', error);
            showNotification('Like කිරීමට නොහැක');
        }
    }

    // Dislike a comment
    async dislikeComment(commentId) {
        if (!this.currentUser) {
            showNotification('කරුණාකර පළමුව ඇතුල් වන්න');
            return;
        }

        try {
            const commentRef = db.collection('comments').doc(commentId);
            await commentRef.update({
                dislikes: firebase.firestore.FieldValue.increment(1)
            });
            
            this.loadComments();
            
        } catch (error) {
            console.error('Error disliking comment:', error);
            showNotification('Dislike කිරීමට නොහැක');
        }
    }

    // Delete a comment (only for comment owner)
    async deleteComment(commentId) {
        if (!this.currentUser) return;

        const comment = this.comments.find(c => c.id === commentId);
        if (!comment || comment.userId !== this.currentUser.uid) {
            showNotification('ඔබට මෙම අදහස මකා දැමීමට අවසර නැත');
            return;
        }

        if (!confirm('ඔබට මෙම අදහස මකා දැමීමට අවශ්‍යද?')) {
            return;
        }

        showProgress();

        try {
            await db.collection('comments').doc(commentId).delete();
            
            hideProgress();
            showNotification('අදහස සාර්ථකව මකා දමන ලදී');
            
            this.loadComments();
            
        } catch (error) {
            hideProgress();
            console.error('Error deleting comment:', error);
            showNotification('අදහස මකා දැමීමට නොහැක');
        }
    }

    // Utility function to get time ago
    getTimeAgo(date) {
        if (!date) return 'මෑතකදී';
        
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'දැන්';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} මිනිත්තු前`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} පැය前`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} දින前`;
        
        return date.toLocaleDateString('si-LK');
    }

    // Escape HTML to prevent XSS
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Clear all comments (admin function)
    async clearAllComments() {
        if (!this.currentUser) return;

        // Add admin check here if needed
        if (!confirm('සියලුම අදහස් මකා දැමීමට අවශ්‍යද? මෙය ආපසු හැරවිය නොහැක.')) {
            return;
        }

        showProgress();

        try {
            const commentsSnapshot = await db.collection('comments').get();
            const batch = db.batch();
            
            commentsSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            
            await batch.commit();
            
            hideProgress();
            showNotification('සියලුම අදහස් මකා දමන ලදී');
            
            this.loadComments();
            
        } catch (error) {
            hideProgress();
            console.error('Error clearing comments:', error);
            showNotification('අදහස් මකා දැමීමට නොහැක');
        }
    }
}

// Global comments manager instance
const commentsManager = new CommentsManager();

// Initialize comments when auth state changes
auth.onAuthStateChanged((user) => {
    commentsManager.setUser(user);
    if (user) {
        commentsManager.init();
    }
});

// Global function for comment submission
function submitComment() {
    commentsManager.submitComment();
  }
