export default function SkillBadge({ skill }) {
  return (
    <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs px-2.5 py-1 rounded-full font-medium">
      {skill}
    </span>
  );
}