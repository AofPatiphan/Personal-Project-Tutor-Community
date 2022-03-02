import axios from '../config/axios';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function EditAbout() {
    const { userData, setUserData } = useContext(UserContext);
    const [editCaption, setEditCaption] = useState(userData.About.caption);
    const [editGender, setEditGender] = useState(userData.About.gender);
    const [editCharactor, setEditCharactor] = useState(
        userData.About.charactor
    );
    const [editSubject, setEditSubject] = useState(userData.About.subject);
    const [editLevel, setEditLevel] = useState(userData.About.level);
    const [editPhoneNumber, setEditPhoneNumber] = useState(
        userData.About.phoneNumber
    );
    const [editEducation, setEditEducation] = useState(
        userData.About.educationLevel
    );

    const handleSubmitUpdateProfile = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.put(`/about/${userData.id}`, {
                caption: editCaption,
                gender: editGender,
                charactor: editCharactor,
                subject: editSubject,
                level: editLevel,
                phoneNumber: editPhoneNumber,
                educationLevel: editEducation,
            });
            console.log(res.data.user);
            setUserData(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            className="modal fade "
            id="EditProfileModal"
            tabIndex="-1"
            aria-labelledby="EditProfileModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog ">
                <form
                    className="modal-content editProfileForm model-edit"
                    onSubmit={handleSubmitUpdateProfile}
                >
                    <div className="modal-header mb-3 ">
                        <h5 className="modal-title " id="EditProfileModalLabel">
                            Edit Profile
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body mb-3">
                        <div className="mb-3">
                            <label htmlFor="dateofbirth" className="form-label">
                                Caption :
                            </label>
                            <textarea
                                type="text"
                                className="form-control date-input"
                                id="caption"
                                value={editCaption}
                                onChange={(e) => setEditCaption(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                                Gender :
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={editGender}
                                onChange={(e) => setEditGender(e.target.value)}
                            >
                                <option defaultValue>
                                    Open this select menu
                                </option>
                                <option value="male">Man</option>
                                <option value="female">Woman</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="caption" className="form-label ">
                                Charactor :
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={editCharactor}
                                onChange={(e) =>
                                    setEditCharactor(e.target.value)
                                }
                            >
                                <option defaultValue>
                                    Open this select menu
                                </option>
                                <option value="tutor">Tutor</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="caption" className="form-label ">
                                Subject :
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={editSubject}
                                onChange={(e) => setEditSubject(e.target.value)}
                            >
                                <option defaultValue>
                                    Open this select menu
                                </option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="caption" className="form-label ">
                                Level :
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={editLevel}
                                onChange={(e) => setEditLevel(e.target.value)}
                            >
                                <option defaultValue>
                                    Open this select menu
                                </option>
                                <option value="highschool">High school</option>
                                <option value="primaryschool">
                                    Primary school
                                </option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="caption" className="form-label ">
                                Phone Number :
                            </label>
                            <input
                                type="text"
                                className="form-control caption-input"
                                id="PhoneNumber"
                                value={editPhoneNumber}
                                onChange={(e) =>
                                    setEditPhoneNumber(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="caption" className="form-label ">
                                Education Level :
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={editEducation}
                                onChange={(e) =>
                                    setEditEducation(e.target.value)
                                }
                            >
                                <option defaultValue>
                                    Open this select menu
                                </option>
                                <option value="highschool">High school</option>
                                <option value="bachelor">
                                    Bachelor's degree
                                </option>
                                <option value="master">Master's degree</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer ">
                        <button
                            type="button"
                            className="btn closebutton"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button className="btn saveBtn" data-bs-dismiss="modal">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAbout;
