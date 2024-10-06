import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { CgClose } from "react-icons/cg";

type ModalProps = {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
};

const Modal = ({ open, children, onClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed z-[100] top-0 left-0 w-full bg-black bg-opacity-50 flex h-full items-end md:items-center md:justify-center">
          <motion.div
            animate={{
              y: ["100%", "0%"],
            }}
            transition={{
              stiffness: 0.6,
            }}
            exit={{
              opacity: 0,
              y: "20%",
            }}
            className="md:w-[480px] max-h-[80%] md:max-h-[520px] overflow-y-auto border border-white border-opacity-5  w-full p-6 rounded-t-lg bg-black md:rounded-xl"
          >
            <div className="flex justify-end">
              <CgClose
                className="cursor-pointer"
                onClick={() => {
                  typeof onClose === "function" && onClose();
                }}
                size={24}
              />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
