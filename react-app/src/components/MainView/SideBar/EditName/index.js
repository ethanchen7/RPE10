import { useState } from "react";
import EditNameForm from "./EditNameForm";
import { Modal } from "../../../../context/Modal";

import "./index.css";

const EditNameModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="block-create-btn" onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditNameForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default EditNameModal;
