import { IoMdClose } from "react-icons/io";

const FreelancerDetailsModal = ({ isModal, setIsModal, title, children }) => {
    return (
        <div>
            {isModal && (
                <div
                    // onClick={() => setIsModal(false)}
                    className="fixed top-0 left-0 flex justify-center items-center z-50 w-full h-full bg-black/30"
                >
                    <div className="w-[900px] bg-white border rounded-md relative p-5">
                        <div className="flex items-center w-full h-full justify-between">
                            <h4 className="text-xl font-semibold capitalize">{title}</h4>
                            <IoMdClose className="text-2xl cursor-pointer" onClick={() => {
                                setIsModal(false);
                            }} />
                        </div>
                        <br />
                        <div>{children}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FreelancerDetailsModal;