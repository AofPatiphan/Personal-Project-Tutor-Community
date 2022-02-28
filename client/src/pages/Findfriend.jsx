import React from 'react';
import Cardprofile from '../components/Cardprofile';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

function Findfriend() {
    const {
        profileCard,
        allFriend,
        allRequestFriend,
        getAllRequest,
        userData,
        getUserById,
    } = useContext(UserContext);
    const [friendPage, setFriendPage] = useState('All');
    const [search, setSearch] = useState('');

    const handleClickShowAllFriend = (e) => {
        e.preventDefault();
        setFriendPage('All');
    };

    const handleClickShowRequestFriend = (e) => {
        e.preventDefault();
        getAllRequest(userData.id);
        setFriendPage('Request');
    };

    const handleClickShowSearchFriend = (e) => {
        e.preventDefault();
        setFriendPage('Find');
    };

    const handleSearchFriend = (e) => {
        e.preventDefault();
        getUserById(search);
        setSearch('');
    };

    return (
        <div
            style={{
                paddingTop: '100px',
                margin: '0px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100vw',
                }}
            >
                <div>
                    <div
                        style={{
                            width: '1100px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '30px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <h1>Friends</h1>
                            <ul
                                style={{
                                    display: 'flex',
                                    listStyle: 'none',
                                    gap: '40px',
                                }}
                            >
                                <li>
                                    <button
                                        className="btn btn-light"
                                        onClick={handleClickShowAllFriend}
                                    >
                                        All Friends
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="btn btn-light"
                                        onClick={handleClickShowRequestFriend}
                                    >
                                        Friend Requests
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="btn btn-light"
                                        onClick={handleClickShowSearchFriend}
                                    >
                                        Find Friend
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {friendPage === 'Find' ? (
                            <form
                                className="d-flex"
                                onSubmit={handleSearchFriend}
                            >
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    value={search}
                                    style={{ borderRadius: '30px' }}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="btn" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </form>
                        ) : (
                            <></>
                        )}
                        {friendPage === 'All' ? (
                            allFriend.map((el) => {
                                return (
                                    <Cardprofile profileData={el} key={el.id} />
                                );
                            })
                        ) : friendPage === 'Request' ? (
                            allRequestFriend.map((el) => {
                                return (
                                    <Cardprofile profileData={el} key={el.id} />
                                );
                            })
                        ) : friendPage === 'Find' ? (
                            profileCard.map((el) => {
                                return (
                                    <Cardprofile profileData={el} key={el.id} />
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Findfriend;
