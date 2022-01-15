import Comment from './Comment';
import PostHome from './PostHome';
import { useContext, useState } from 'react';
import { CommentContext } from '../contexts/CommentContext';
import CommentBar from './CommentBar';

export default function PostitemHome({ postitemHome }) {
    console.log(postitemHome);
    const { comment } = useContext(CommentContext);
    const [visible, setVisible] = useState(false);
    const { commentText, setCommentText, addComment } =
        useContext(CommentContext);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        addComment(commentText, postitemHome.id);
        setCommentText('');
        setVisible(false);
    };

    return (
        <div
            style={{
                margin: '14px 0',
                backgroundColor: 'white',
                width: '800px',
                color: '#788292',
                borderRadius: '8px',
                padding: '20px',
            }}
        >
            <PostHome
                postitemHome={postitemHome}
                setVisible={setVisible}
                visible={visible}
            />
            {visible ? (
                <CommentBar handleSubmitComment={handleSubmitComment} />
            ) : (
                ''
            )}

            {comment.map((el) => {
                return (
                    <Comment
                        commentItem={el}
                        key={el.id}
                        postitemHome={postitemHome}
                    />
                );
            })}
        </div>
    );
}
