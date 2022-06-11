import { useState } from "react";
import DeleteForm from "./DeleteConfirmation";
import { Modal } from "../../../../context/Modal";

import "./index.css";

const DeleteConfirmationModal = ({ blockId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="delete-block-btn" onClick={() => setShowModal(true)}>
        Delete Block
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteForm setShowModal={setShowModal} blockId={blockId} />
        </Modal>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
