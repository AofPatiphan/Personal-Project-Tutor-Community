import Comment from './Comment';
import PostProfile from './PostProfile';

export default function PostItemProfile({ postItemProfile }) {
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
            <Comment />
        </div>
    );
}
