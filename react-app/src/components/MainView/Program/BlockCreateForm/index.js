import { useState } from "react";
import BlockCreateForm from "./BlockCreateForm";
import { Modal } from "../../../../context/Modal";

import "./index.css";

const BlockCreateModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="block-create-btn" onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BlockCreateForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default BlockCreateModal;
