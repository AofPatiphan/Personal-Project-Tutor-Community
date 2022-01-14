import Comment from './Comment';
import PostHome from './PostHome';

export default function PostItemHome({ postItemHome }) {
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
            <PostHome postItemHome={postItemHome} />
            <Comment />
        </div>
    );
}
