import "./styles/SectionWrapper.css";

const SectionWrapper = ({ title, subtitle, children }) => {
  return (
    <div className="section-wrapper">
      {/* Header */}
      <div className="section-header">
        <div className="section-title">{title}</div>


        {subtitle && (
			<div className="section-subtitle">{subtitle}</div>
        )}
		<div className="section-underline" />
      </div>

      {children}
    </div>
  );
};

export default SectionWrapper;
