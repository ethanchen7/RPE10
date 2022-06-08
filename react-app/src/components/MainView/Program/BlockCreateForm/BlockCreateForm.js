import { useState } from "react";
import { useSelector } from "react-redux";
import "./BlockCreateForm.css";

import rpelogo from "../../../../assets/images/rpelogo.png";

const BlockCreateForm = ({ setShowModal }) => {
  const blockObjects = useSelector((state) => state.block);
  const blockNumbers = Object.keys(blockObjects).length;

  const [blockName, setBlockName] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="form-header">
        <div className="form-logo">
          <img src={rpelogo} alt="logo" />
        </div>
        <div className="form-header-text">Create A Block</div>
        <p>{`Block ${blockNumbers + 1}`}</p>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <ul className="errors-container">
          {validationErrors &&
            validationErrors.map((err, i) => (
              <li className="error" key={i}>
                {err}
              </li>
            ))}
        </ul>
        <div className="input-container">
          <input
            className="form-input"
            type="text"
            name="name"
            value={blockName}
            placeholder="Block name"
            onChange={(e) => setBlockName(e.target.value)}
          />
        </div>
        <button className="submitBtn uploadImg-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlockCreateForm;
