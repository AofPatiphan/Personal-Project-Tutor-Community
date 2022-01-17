import React from 'react';
import { useContext } from 'react';
import { CommentContext } from '../contexts/CommentContext';

function CommentBar({ handleSubmitComment }) {
    const { commentText, setCommentText, addComment } =
        useContext(CommentContext);
    return (
        <>
            <div style={{ paddingTop: '10px' }}>
                <form className="d-flex" onSubmit={handleSubmitComment}>
                    <input
                        className="form-control me-2"
                        type="text"
                        value={commentText}
                        placeholder="Comment"
                        style={{ borderRadius: '30px' }}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="btn" type="submit">
                        Comment
                    </button>
                </form>
            </div>
        </>
    );
}

export default CommentBar;
