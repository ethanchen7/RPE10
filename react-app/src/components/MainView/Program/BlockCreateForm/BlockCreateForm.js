import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBlock } from "../../../../store/block";
import "./BlockCreateForm.css";

import rpelogo from "../../../../assets/images/rpelogo.png";

const BlockCreateForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const blockObjects = useSelector((state) => state.block);
  const blockNumbers = Object.keys(blockObjects).length;

  const [blockName, setBlockName] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = () => {
    const payload = {
      name: blockName,
    };
    dispatch(addBlock(currentUser.id, payload));
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="form-header">
        <img src={rpelogo} alt="logo" />
        <div className="form-header-text">
          <h1>Create a Block</h1>
          <p>{`Block ${blockNumbers + 1}`}</p>
        </div>
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
            placeholder="Enter a block name (optional)"
            onChange={(e) => setBlockName(e.target.value)}
          />
        </div>
        <button className="submitBtn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlockCreateForm;
