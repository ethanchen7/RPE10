import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import BlockCard from "./BlockCard";
import BlockCreateModal from "./BlockCreateForm";
import "./index.css";

const Program = () => {
  const blockObjects = useSelector((state) => state.block);
  const allBlocks = Object.keys(blockObjects);

  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="page-container-header">
          <h1>
            {allBlocks.length
              ? "Select a block to edit."
              : "Add a block to get started!"}
          </h1>
        </div>
        <div className="program-block-container">
          <div className="program-block-grid">
            {allBlocks.length
              ? allBlocks.map((blockId, id) => (
                  <BlockCard
                    block={blockObjects[blockId]}
                    number={id + 1}
                    key={`block-${id + 1}`}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
      <BlockCreateModal />
    </>
  );
};

export default Program;
