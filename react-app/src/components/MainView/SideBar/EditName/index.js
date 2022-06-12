import { useState } from "react";
import EditNameForm from "./EditNameForm";
import { Modal } from "../../../../context/Modal";

import "./index.css";

const EditNameModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p onClick={() => setShowModal(true)}>
        <i className="fa-regular fa-pen-to-square fa-lg" />
        <span>Edit Name</span>
      </p>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditNameForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default EditNameModal;
