import React from 'react';
import SearchForm from '../../components/searchform/SearchForm';
import './search.css';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Cardprofile from '../../components/Cardprofile';
import axios from '../../config/axios';

function Search() {
    const [subject, setSubject] = useState(null);
    const [level, setLevel] = useState(null);
    const [gender, setGender] = useState(null);
    const [charactor, setCharactor] = useState(null);
    const [about, setAbout] = useState([]);

    const getUserByAbout = async () => {
        const res = await axios.post(`/about/search`, {
            subject,
            level,
            gender,
            charactor,
        });
        setAbout(res.data.about || {});
    };

    useEffect(() => {
        getUserByAbout();
    }, []);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        getUserByAbout();
    };

    return (
        <div className="d-flex justify-content-center">
            <SearchForm
                setSubject={setSubject}
                setLevel={setLevel}
                setGender={setGender}
                setCharactor={setCharactor}
                handleSubmitSearch={handleSubmitSearch}
            />
            <div style={{ paddingTop: '300px', width: '700px' }} className="  ">
                {about.map((el) => {
                    return <Cardprofile profileData={el} key={el.id} />;
                })}
            </div>
        </div>
    );
}

export default Search;
