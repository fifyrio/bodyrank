"use client";

import { SectionHead } from "@/components/SectionHead";
import { useLanguage } from "@/context/LanguageContext";
import { formatNumber, roundWeight } from "@/lib/strength/format";
import { LIFTS, oneRepMaxForZ, toKg, type Sex, type Unit } from "@/lib/strength/model";
import { useStrengthStrings } from "./useStrengthStrings";

// Bodyweight rows per table, in round numbers for each unit system.
const ROWS: Record<Sex, Record<Unit, readonly number[]>> = {
  male: {
    lb: [130, 150, 170, 190, 210, 230, 250, 275],
    kg: [60, 67.5, 75, 82.5, 90, 100, 110, 125],
  },
  female: {
    lb: [100, 115, 130, 145, 160, 180, 200],
    kg: [45, 52, 60, 67.5, 75, 82.5, 90],
  },
};

const SEXES: readonly Sex[] = ["male", "female"];
const REFERENCE_AGE = 30;
const AVERAGE_Z = 0; // 50th percentile
const STRONG_Z = 0.8416; // 80th percentile

export function StandardsTable({ unit }: { unit: Unit }) {
  const s = useStrengthStrings();
  const { lang } = useLanguage();

  return (
    <section className="wrap sc-section">
      <SectionHead tag={s.standards_tag} title={s.standards_title} desc={s.standards_desc} />

      <div className="sc-tables">
        {SEXES.map((sex) => (
          <div className="sc-table-wrap" key={sex}>
            <table className="sc-table">
              <caption>
                {s.table_captions[sex]} <span>· {unit}</span>
              </caption>
              <thead>
                <tr>
                  <th scope="col">{s.bodyweight_col}</th>
                  {LIFTS.map((lift) => (
                    <th scope="col" key={lift}>
                      {s.lift_names[lift]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS[sex][unit].map((bodyweight) => {
                  const bodyweightKg = toKg(bodyweight, unit);
                  return (
                    <tr key={bodyweight}>
                      <th scope="row">{formatNumber(bodyweight, lang)}</th>
                      {LIFTS.map((lift) => {
                        const at = (z: number) =>
                          formatNumber(
                            roundWeight(oneRepMaxForZ(sex, lift, z, bodyweightKg, REFERENCE_AGE), unit, "plate"),
                            lang,
                          );
                        return (
                          <td key={lift}>
                            <b>{at(AVERAGE_Z)}</b>
                            <span>{at(STRONG_Z)}</span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <p className="sc-table-note">{s.standards_note}</p>
    </section>
  );
}
