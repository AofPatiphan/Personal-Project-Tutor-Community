import { Outlet } from 'react-router-dom';

export default function Logo() {
    return (
        <div style={{ display: 'flex' }}>
            <div className="logo">
                <img
                    src="https://sv1.picz.in.th/images/2022/01/04/nN4KJR.png"
                    alt="Tutor Logo"
                    style={{ width: 200, height: 200 }}
                />
                <h1 className="textLogo">
                    Tutor
                    <br />
                    Community
                </h1>
            </div>
            <Outlet />
        </div>
    );
}
