import Modal from "react-modal";

export const LoadingModal = ({ msg }) => {
  return (
    <>
      <Modal
        isOpen="true"
        contentLabel="Loading Modal"
        className="flex flex-col border mt-4 border-1 m-auto bg-white rounded-lg w-52 h-32 justify-center items-center"
      >
        <div
          class="animate-spin w-6 h-6 border-[3px] border-current border-t-transparent text-green rounded-full"
          role="status"
          aria-label="loading"
        >
        </div>
        <div className="text-md mt-4 text-center">{msg}</div>
      </Modal>
    </>
  );
};
