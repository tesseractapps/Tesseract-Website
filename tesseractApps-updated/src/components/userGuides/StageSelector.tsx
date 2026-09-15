import { CheckCircle2, Lock, Users } from "lucide-react";
// import { Stage, stages } from "../../data/userGuidesData";
import "./StageSelectorStyles.css";
import type { UserGuideStage } from "../../types/sanityQueries";
interface StageSelectorProps {
  stages: UserGuideStage[];
  onSelect: (stageSlug: string, stageTitle: string) => void;

  unlocked?: string[];
}
export default function StageSelector({
  stages,
  onSelect,
  unlocked = [],
}: StageSelectorProps) {
  return (
    <div className="ug-stage-grid">
      {stages.map((stage) => {
        const isUnlocked = unlocked.includes(stage.slug);

        return (
          <button
            key={stage._id}
            type="button"
            onClick={() => onSelect(stage.slug, `${stage.title} Stage`)}
            className="ug-stage-card"
          >
            <div className="ug-stage-header">
              <span className="ug-stage-focus">{stage.focus}</span>

              <div className="ug-stage-status-wrap">
                {stage.status === "draft" && (
                  <span className="ug-stage-draft">Draft</span>
                )}

                {isUnlocked ? (
                  <span className="ug-stage-unlocked">
                    <CheckCircle2 className="ug-stage-icon-sm" />
                    Unlocked
                  </span>
                ) : (
                  <span className="ug-stage-locked">
                    <Lock className="ug-stage-icon-xs" />
                    Locked
                  </span>
                )}
              </div>
            </div>

            <h3 className="ug-stage-title">{stage.title}</h3>

            <p className="ug-stage-description">{stage.tagline}</p>

            <div className="ug-stage-footer">
              <span className="ug-stage-staff">
                <Users className="ug-stage-icon-sm" />
                {stage.staffRange}
              </span>

              <span className="ug-stage-action">
                {isUnlocked ? "Open →" : "Unlock →"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
