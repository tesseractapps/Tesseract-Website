// import { useNavigate } from "react-router-dom";
// import { appNavigate } from "../../routes/AppRoutes";
import "./BlogPostStyles.css";
import blog5 from "../../assets/expo-canberra1.webp"; // replace with actual expo image
import blog6 from "../../assets/expo-canberra2.webp";
import blogVideo from "../../assets/Canberra Expo 2025.mp4"; // replace with actual expo image
import { useMetaTags } from "../../utils/useMetaTags";

const CanberraNDISExpoBlog = () => {
  useMetaTags({
    title: "TesseractApps at Canberra NDIS Expo | Event Recap | Australia",
    description: "TesseractApps connects with Canberra's NDIS community at the expo. Read about our conversations with providers and insights from the Australian disability sector."
  });
  // const navigate = useNavigate();
  // function handleClick(name: string) {
  //   appNavigate(name, navigate);
  // }

  return (
    <div className="blog-container">
      <img
        src={blog5}
        alt="TesseractApps at Canberra NDIS Expo"
        className="blog-image canberra-blog-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">
            TesseractApps Connects with Canberra’s NDIS Community at the Expo
          </h1>
        </header>

        <div className="blog-content">
          <p className="intro-paragraph">
            As a proud Canberra-based company, TesseractApps was thrilled to
            participate in the recent Canberra NDIS Expo, connecting with local
            providers, allied health professionals, and community organisations.
            The event was an invaluable opportunity to engage directly with the
            people shaping the future of care in our city.
          </p>

          <section className="section">
            <div className="security-features">
              <div className="security-feature">
                <h3 className="feature-title"></h3>
                <p>
                  Being part of the local ecosystem allows us to better
                  understand the unique needs of Canberra providers. At the
                  expo, we were inspired by the dedication and innovation
                  demonstrated across the sector, from small registered
                  providers to larger organisations delivering diverse support
                  services.
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title"></h3>
                <p>
                  Our team enjoyed meaningful conversations with many attendees,
                  exploring how TesseractApps can simplify day-to-day operations
                  while maintaining compliance with NDIS standards. From
                  rostering and payroll management to participant tracking and
                  audit-ready reporting, we are committed to delivering
                  solutions that support local providers in delivering
                  high-quality care.
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title"></h3>
                <p>
                  Participation in events like this reinforces our commitment to
                  Canberra’s care community. We are proud to be a local business
                  supporting other local businesses, and we look forward to
                  continuing these connections to help providers streamline
                  their operations and focus on what matters most—supporting
                  participants.
                </p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="blogs-images-section">
              <img
                src={blog6}
                alt="Blocg 5 Image 1"
                className="blog-section-image"
              />
              <img
                src={blog5}
                alt="Blocg 5 Image 1"
                className="blog-section-image"
              />
            </div>
          </section>
          <section className="section video-section">
            <video
              src={blogVideo}
              autoPlay={true}
              controls
              loop
              id="blog-video-section"
            />
          </section>

          <section className="section">
            <h2 className="section-title">Looking Ahead</h2>
            <p>
              We will continue to engage with Canberra’s NDIS providers through
              webinars, workshops, and one-on-one consultations. If you missed
              us at the expo or want to explore how our platform can support
              your organisation, please get in touch—we’d love to continue the
              conversation.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default CanberraNDISExpoBlog;
