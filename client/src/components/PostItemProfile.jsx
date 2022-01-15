import Comment from './Comment';
import PostProfile from './PostProfile';
import { useContext, useState } from 'react';
import CommentBar from './CommentBar';

export default function PostItemProfile({ postItemProfile }) {
    const [visible, setVisible] = useState(false);
    console.log(postItemProfile);
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
            <PostProfile postItemProfile={postItemProfile} />

            {/* {visible ? (
                <CommentBar handleSubmitComment={handleSubmitComment} />
            ) : (
                ''
            )} */}

            {/* {comment.map((el) => {
                return (
                    <Comment
                        commentItem={el}
                        key={el.id}
                        postitemHome={postitemHome}
                    />
                );
            })} */}
        </div>
    );
}
