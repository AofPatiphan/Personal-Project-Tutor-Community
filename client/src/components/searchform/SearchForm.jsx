import React from 'react';
import { Outlet } from 'react-router-dom';

function SearchForm({
    setSubject,
    setLevel,
    setGender,
    setCharactor,
    handleSubmitSearch,
}) {
    return (
        <>
            <form
                className="position-absolute top-20 start-50 translate-middle"
                style={{ zIndex: '1', paddingTop: '200px' }}
                onSubmit={handleSubmitSearch}
            >
                <div className="searchPage ">
                    <div className="formSelect">
                        <select
                            className="form-select "
                            aria-label="Default select example"
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            <option defaultValue>Select Subject</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chamistry</option>
                        </select>
                    </div>
                    <div className="formSelect">
                        <select
                            className="form-select "
                            aria-label="Default select example"
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option defaultValue>Select Level</option>
                            <option value="primarySchool">
                                Primary school
                            </option>
                            <option value="highSchool">High school</option>
                        </select>
                    </div>
                    <div className="formSelect">
                        <select
                            className="form-select "
                            aria-label="Default select example"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option defaultValue>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="formSelect">
                        <select
                            className="form-select "
                            aria-label="Default select example"
                            onChange={(e) => setCharactor(e.target.value)}
                        >
                            <option defaultValue>
                                Search for Tutor or Student
                            </option>
                            <option value="tutor">Tutor</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>
                <div className="position-absolute top-20 start-50 translate-middle ">
                    <button className="btn btn-primary">Search</button>
                </div>
            </form>
        </>
    );
}

export default SearchForm;
