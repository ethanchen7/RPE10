import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./DeleteConfirmation.css";
import { removeBlock } from "../../../../store/block";

import rpelogo from "../../../../assets/images/rpelogo.png";

const DeleteConfirmation = ({ setShowModal, blockId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(removeBlock(blockId));
    setShowModal(false);
    history.push("/program");
  };

  return (
    <div className="delete-container">
      <div className="delete-form-header">
        <div className="delete-form-logo">
          <img src={rpelogo} alt="logo" />
        </div>
        <div className="delete-form-header-text">
          Are you sure you want to delete this block?
        </div>
      </div>
      <div className="delete-footer">
        <button className="delete-button" onClick={handleSubmit}>
          Delete
        </button>
        <button className="cancel-button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
