import { motion } from "framer-motion";

const projects = [
  {
    title: "Continual Anomaly Detection",
    desc: "Incremental learning using GPM across 20 tasks"
  },
  {
    title: "Pneumonia Detection",
    desc: "DenseNet121 medical classification model"
  },
  {
    title: "Flower Detection Bot",
    desc: "Computer vision + speech recognition robot"
  }
];

const Projects = () => {
  return (
    <div style={{ padding: "50px" }}>
      <h2 style={{ color: "#ff4da6" }}>Projects</h2>

      {projects.map((p, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          style={{
            background: "#1a1126",
            margin: "20px 0",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;