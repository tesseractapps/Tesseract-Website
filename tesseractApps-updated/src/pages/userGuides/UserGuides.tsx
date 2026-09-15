import { useState } from "react";
import PageHero from "../../components/common/PageHero";
import "./UserGuideStyles.css";
import StageSelector from "../../components/userGuides/StageSelector";
import { useNavigate } from "react-router-dom";
import UserGuideForm from "../../components/userGuideForm/UserGuideForm";
import { useSanityUserGuideStages } from "../../hooks/useSanityUserGuideStages";
const KEY = "hc_unlocked_stages";

export function getUnlockedStages() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isStageUnlocked(stageId: string) {
  return getUnlockedStages().includes(stageId);
}

export function unlockStage(stageId: string) {
  const current = getUnlockedStages();

  if (!current.includes(stageId)) {
    current.push(stageId);
    localStorage.setItem(KEY, JSON.stringify(current));
  }

  return current;
}
const UserGuides = () => {
  const { stages, loading, error: stagesError } = useSanityUserGuideStages();
  // const loading = false;
  // const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState<string[]>(() => getUnlockedStages());
  const [gateStage, setGateStage] = useState<string | null>(null);
  const [gateLabel, setGateLabel] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [formError, setFormError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Please provide your name and email.");
      return;
    }

    setStatus("loading");
    setFormError("");

    try {
      // API call here

      setStatus("success");

      setTimeout(() => {
        handleUnlock();
      }, 1000);
    } catch {
      setFormError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };
  const handleSelect = (stageSlug: string, label: string) => {
    if (unlocked.includes(stageSlug)) {
      navigate(`/user-guide/${stageSlug}`);
    } else {
      setGateStage(stageSlug);
      setGateLabel(label);
    }
  };

  const handleUnlock = () => {
    if (!gateStage) return;

    unlockStage(gateStage);
    setUnlocked(getUnlockedStages());
    setGateStage(null);

    navigate(`/user-guide/${gateStage}`);
  };
  return (
    <div className="ug-page">
      <PageHero
        label="User Guides"
        heading="Knowledge, staged for growth."
        sub="Every guide organized by your provider maturity stage. Choose a section below to unlock its guides."
      >
        {/* <button
          type="button"
          className="rsh-trigger"
          onClick={() => setSearchOpen(true)}
          aria-label="Search blog posts"
        >
          <svg
            className="rsh-trigger-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="rsh-trigger-text">Search user guides…</span>
        </button> */}
      </PageHero>
      <div className="ug-outer">
        <h2 className="ug-section-heading">Choose your stage</h2>
        <p className="ug-section-description">
          Select a stage to unlock its tailored guides. New to TesseractApps?
          Start with the Start stage.
        </p>

        {loading && (
          <div className="ug-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="ug-skeleton-card">
                <div className="ug-skeleton-image" />
                <div className="ug-skeleton-body">
                  <div className="ug-skeleton-line ug-skeleton-line--meta" />
                  <div className="ug-skeleton-line ug-skeleton-line--title1" />
                  <div className="ug-skeleton-line ug-skeleton-line--title2" />
                  <div className="ug-skeleton-line ug-skeleton-line--ex1" />
                  <div className="ug-skeleton-line ug-skeleton-line--ex2" />
                  <div className="ug-skeleton-line ug-skeleton-line--ex3" />
                  <div className="ug-skeleton-footer">
                    <div className="ug-skeleton-line ug-skeleton-line--avatar" />
                    <div className="ug-skeleton-line ug-skeleton-line--author" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {stagesError && (
          <div className="ug-empty">
            Can&apos;t load user guides. Error loading user guides.
          </div>
        )}

        {/* {!loading && !error && userGuideData.length === 0 && (
          <div className="ug-empty">No user guides found.</div>
        )} */}
        <StageSelector
          stages={stages}
          onSelect={handleSelect}
          unlocked={unlocked}
        />
      </div>
      {gateStage && (
        <UserGuideForm
          form={form}
          setGateStage={setGateStage}
          gateLabel={gateLabel}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          error={formError}
          status={status}
        />
      )}
    </div>
  );
};

export default UserGuides;
