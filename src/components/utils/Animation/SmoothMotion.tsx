import { motion } from "framer-motion";
import PropTypes from "prop-types";

const SmoothMotion = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

SmoothMotion.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SmoothMotion;
