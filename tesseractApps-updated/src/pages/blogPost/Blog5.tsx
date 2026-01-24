// import { useNavigate } from "react-router-dom";
// import { AppNavigate } from "../../routes/AppNavigate";
import blog5 from "../../assets/Blog5Image3.webp";
import blogImage1 from "../../assets/Blog5Image1.webp";
import blogVideo from "../../assets/Sydney expo 2025.mp4";
import useAppNavigate from "../../hooks/useAppNavigate";
import { useMetaTags } from "../../utils/useMetaTags";
// import blogImage2 from "../../assets/Blog5Image2.webp";

const Blog5 = () => {
  useMetaTags({
    title: "NDIS Compliance Guide | Provider Requirements | TesseractApps",
    description: "Essential NDIS compliance guide for providers. Understand Quality and Safeguards requirements, documentation needs, and how technology can help you stay compliant."
  });

  // const navigate = useNavigate();
  const appNavigate = useAppNavigate();
  function handleClick(name: string) {
    appNavigate(name);
  }
  return (
    <div className="blog-container">
      <img
        src={blog5}
        alt="Workforce Management Challenges Image"
        className="blog-image"
        id="blog5-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">
            Unforgettable Moments at the Disability & WorkAbility Sydney Expo
            2025
          </h1>
        </header>

        <div className="blog-content">
          <p className="intro-paragraph">
            On August 8–9, 2025, the TesseractApps team had the honour of
            joining the Sydney Disability & WorkAbility Expo, where the air was
            alive with connection, innovation, and the shared commitment that
            drives the NDIS community.
          </p>

          <p>
            Those two days gave rise to moments we won’t forget, as we conversed
            directly with NDIS providers, support coordinators, participants,
            and sector leaders—each focused on refining care and boosting
            operational excellence across the country.
          </p>

          <section className="section">
            <div className="blogs-images-section">
              <img
                src={blogImage1}
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

          <section className="section">
            <h2 className="section-title">What We Did at the Expo</h2>

            <div className="security-features">
              <div className="security-feature">
                <h3 className="feature-title">Streamlined Operations:</h3>
                <p>
                  We demonstrated our all-in-one software platform, illustrating
                  how it streamlines rostering, payroll, and workforce
                  management to reduce admin time and boost productivity.
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">Compliance Made Simple:</h3>
                <p>
                  We shared strategies that allow providers to navigate changing
                  NDIS guidelines and audits with confidence.
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">Secure & Accessible:</h3>
                <p>
                  We spotlighted our secure document storage and mobile app
                  features, putting participant information safely in providers’
                  hands wherever they need it.
                </p>
              </div>
              <div className="security-feature">
                <h3 className="feature-title">Community & Insights:</h3>
                <p>
                  We built stronger community ties and gathered insights that
                  will guide our products and services for years to come.
                </p>
              </div>
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

          <section className="section highlight-section">
            <h2 className="section-title">Looking Ahead</h2>
            <p>
              This expo renewed our purpose at TesseractApps: to provide NDIS
              providers with the technology they need to overcome obstacles and
              elevate the standard of support. We will continue driving fresh
              ideas and partnerships so the sector can advance in an
              increasingly fast-paced landscape.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Missed the Expo? </h2>
            <p>
              If you weren’t able to attend, we invite you to explore how
              TesseractApps can help transform your operations.
            </p>
            <p>
              <strong
                id="blog-book-a-demo"
                onClick={() => handleClick("Book a Demo")}
              >
                Book a free demo
              </strong>{" "}
              and experience firsthand the simplicity and power of our platform.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default Blog5;
