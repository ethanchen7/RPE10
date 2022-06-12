import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBlock } from "../../../../store/block";
import "./BlockCreateForm.css";

import rpelogo from "../../../../assets/images/rpelogo.png";
import ErrorMessage from "../../../ErrorMessage";

const BlockCreateForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const blockObjects = useSelector((state) => state.block);
  const blockNumbers = Object.keys(blockObjects).length;

  const [blockName, setBlockName] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: blockName,
    };
    const block_name = await dispatch(addBlock(currentUser.id, payload));
    if (block_name.errors) {
      console.log(block_name.errors);
      const errors = {};
      if (Array.isArray(block_name.errors)) {
        block_name.errors.forEach((error) => {
          const label = error.split(":")[0].slice(0, -1);
          const message = error.split(":")[1].slice(1);
          errors[label] = message;
        });
      } else {
        errors.overall = block_name.errors;
      }
      setErrorMessages(errors);
    } else {
      setShowModal(false);
    }
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
      <form
        className="form-container"
        onSubmit={handleSubmit}
        style={{ marginTop: "15px" }}
      >
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
        <ErrorMessage label={""} message={errorMessages.name} />
        <button className="submitBtn createBlockBtn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlockCreateForm;
