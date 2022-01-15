import Postblock from './Postblock';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Postbar() {
    const { setHideboxPost } = useContext(PostContext);
    const { user } = useContext(AuthContext);

    const handleClickShowPostbox = (e) => {
        e.preventDefault();
        setHideboxPost(true);
    };
    return (
        <div
            style={{
                margin: '0 0 14px 0',
                backgroundColor: 'white',
                width: '800px',
                color: '#788292',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <div>&nbsp;</div>
            <div
                style={{ paddingLeft: '15px' }}
                onClick={handleClickShowPostbox}
            >
                {`What’s on you mind, ${user.firstName}?`}
            </div>
            <div>
                <i className="bi bi-arrow-up"></i>
            </div>
            <Postblock />
        </div>
    );
}
