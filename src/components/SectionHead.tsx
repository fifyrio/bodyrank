interface SectionHeadProps {
  tag: string;
  title: string;
  desc: string;
}

export function SectionHead({ tag, title, desc }: SectionHeadProps) {
  return (
    <div className="section-head">
      <p className="section-tag">{tag}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{desc}</p>
    </div>
  );
}
