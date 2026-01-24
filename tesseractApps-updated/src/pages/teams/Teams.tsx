import "./TeamsStyles.css";
import { teamsPageData } from "../../utils/DummyData";
import { useMetaTags } from "../../utils/useMetaTags";

const Teams = () => {
  useMetaTags({
    title: "Meet the TesseractApps Team | Leadership & Experts | Australian Tech",
    description: "Meet the diverse team behind TesseractApps - technologists, product specialists, and industry experts committed to solving real-world workforce management challenges."
  });

  return (
    <div id="teams-container">
      <div className="heading">TEAM</div>
      <div className="subheading">The people behind the platform.</div>
      <div className="text" id="team-text">
        Tesseract Apps is led by a diverse team of technologists, product
        specialists, and industry experts committed to solving real-world
        challenges. Their collective experience in workforce management,
        compliance, and innovative technology ensures that our solutions stay
        ahead of the curve.
      </div>
      <div id="team-data-container">
        {/* <div className="teams-segment">
          <div className="teams-segment-title">CEO</div>
          <div className="teams-segment-line" />
        </div>
        <div className="team-image-container">
          {teamsPageData.CEO.map((data, index) => {
            return (
              <div key={index} className="team-image-card">
                <img src={data.image} alt="person" className="team-image" />

                <div className="team-name-container">
                  <div className="team-name">{data.name}</div>
                  <div className="team-designation">{data.designation}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="teams-segment">
          <div className="teams-segment-title">Directors</div>
          <div className="teams-segment-line" />
        </div>
        <div className="team-image-container">
          {teamsPageData.Directors.map((data, index) => {
            return (
              <div key={index} className="team-image-card">
                <img src={data.image} alt="person" className="team-image" />

                <div className="team-name-container">
                  <div className="team-name">{data.name}</div>
                  <div className="team-designation">{data.designation}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="teams-segment">
          <div className="teams-segment-title" id="teams-segment-line-3">
            Business & Marketing
          </div>
          <div className="teams-segment-line" />
        </div>
        <div className="team-image-container">
          {teamsPageData["BUSINESS & MARKETING"].map((data, index) => {
            return (
              <div key={index} className="team-image-card">
                <img src={data.image} alt="person" className="team-image" />

                <div className="team-name-container">
                  <div className="team-name">{data.name}</div>
                  <div className="team-designation">{data.designation}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="teams-segment">
          <div className="teams-segment-title" id="teams-segment-line-4">
            Technical Team
          </div>
          <div className="teams-segment-line" />
        </div>
        <div className="team-image-container">
          {teamsPageData.Team.map((data, index) => {
            return (
              <div key={index} className="team-image-card">
                <img src={data.image} alt="person" className="team-image" />

                <div className="team-name-container">
                  <div className="team-name">{data.name}</div>
                  <div className="team-designation">{data.designation}</div>
                </div>
              </div>
            );
          })}
        </div> */}
        <div className="teams-segment">
          <div className="teams-segment-title">Meet the passionate team</div>
          <div className="teams-segment-line" />
        </div>
        <div className="team-image-container">
          {teamsPageData.map((data, index) => {
            return (
              <div key={index} className="team-image-card">
                <img src={data.image} alt="person" className="team-image" />

                <div className="team-name-container">
                  <div className="team-name">{data.name}</div>
                  <div className="team-designation">{data.designation}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Teams;
