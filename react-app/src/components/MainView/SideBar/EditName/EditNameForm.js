import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./EditNameForm.css";
import { editName } from "../../../../store/session";
import ErrorMessage from "../../../ErrorMessage";

import rpelogo from "../../../../assets/images/rpelogo.png";

const EditNameForm = ({ setShowModal, blockId }) => {
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [firstName, setFirstName] = useState(session.first_name);
  const [lastName, setLastName] = useState(session.last_name);
  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = async () => {
    const payload = {
      userId: session.id,
      first_name: firstName,
      last_name: lastName,
    };
    const update = await dispatch(editName(payload));
    if (update.errors) {
      console.log(update.errors);
      const errors = {};
      if (Array.isArray(update.errors)) {
        update.errors.forEach((error) => {
          const label = error.split(":")[0].slice(0, -1);
          const message = error.split(":")[1].slice(1);
          errors[label] = message;
        });
      } else {
        errors.overall = update.errors;
      }
      setErrorMessages(errors);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className="edit-container">
      <div className="delete-form-header">
        <div className="delete-form-logo">
          <img src={rpelogo} alt="logo" />
        </div>
        <div className="delete-form-header-text">Edit Name</div>
      </div>

      <div className="edit-name-input-container">
        <div className="first-name-container">
          <input
            className="edit-form-input"
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Enter your first name*"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <ErrorMessage label={""} message={errorMessages.first_name} />
        </div>
        <div className="last-name-container">
          <input
            className="edit-form-input"
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Enter your last name*"
            onChange={(e) => setLastName(e.target.value)}
          />
          <ErrorMessage label={""} message={errorMessages.last_name} />
        </div>
      </div>

      <div className="delete-footer">
        <button className="delete-button" onClick={handleSubmit}>
          Edit
        </button>
        <button className="cancel-button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditNameForm;
