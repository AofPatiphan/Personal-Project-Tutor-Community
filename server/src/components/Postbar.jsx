import Postblock from './Postblock';

export default function Postbar() {
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
                onClick={() =>
                    (document.getElementById('id01').style.display = 'block')
                }
            >
                What’s on you mind, Patiphan?
            </div>
            <div>
                <i className="bi bi-arrow-up"></i>
            </div>
            <Postblock />
        </div>
    );
}
