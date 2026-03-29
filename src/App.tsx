import { motion } from "framer-motion";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Background from "./components/Background";
import profile from "./assets/profile.jpg";
import "./App.css";

function App() {
  const form = useRef<HTMLFormElement>(null);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_veg4q7f",
        "template_5f5ml0r",
        form.current,
        "S_NPJ83Fexgch_fjj"
      )
      .then(() => {
        alert("Message sent!");
        form.current?.reset();
      });
  };

  const projects = [
    { title: "Continual Anomaly Detection", front: "GPM Learning", back: "20-task system preventing forgetting" },
    { title: "Pneumonia Detection", front: "DenseNet121", back: "Medical image classification" },
    { title: "Flower Detection Bot", front: "CV + Speech", back: "Robotics + detection system" },
    { title: "Sentiment API", front: "NLP API", back: "Real-time sentiment analysis" },
    { title: "Chatbot AI", front: "Conversational AI", back: "Transformer-based chatbot" },
    { title: "Image Classifier", front: "CNN Model", back: "Multi-class classification system" },
    { title: "AI Dashboard", front: "Data Visualization", back: "Metrics + anomaly tracking UI" },
  ];

  return (
    <>
      <Background />

      {/* PROFILE IMAGE */}
      <img src={profile} className="profile-top" />

      {/* HERO */}
      <section className="hero-section">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Ibtism Gul
        </motion.h1>

        <p>AI Engineer • Machine Learning • Computer Vision</p>

        <button onClick={scrollToProjects}>View Projects</button>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="projects">
          {projects.map((p, i) => (
            <div
              key={i}
              className="flip-card"
              onClick={(e) =>
                e.currentTarget.classList.toggle("flipped")
              }
            >
              <div className="flip-inner">
                <div className="flip-front">
                  <h3>{p.title}</h3>
                  <p>{p.front}</p>
                </div>
                <div className="flip-back">
                  <p>{p.back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section">
        <h2>Contact</h2>

        <form ref={form} onSubmit={sendEmail}>
          <input name="user_name" placeholder="Name" required />
          <input name="user_email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required />

          <button type="submit">Send Message</button>
        </form>
      </section>
    </>
  );
}

export default App;