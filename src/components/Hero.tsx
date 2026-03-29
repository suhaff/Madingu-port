import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "3rem", color: "#ff4da6" }}
      >
        Ibtism Gul
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        AI Engineer • Machine Learning • Computer Vision
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#ff4da6",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        View Work
      </motion.button>

    </div>
  );
};

export default Hero;