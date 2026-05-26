export function TrendChart({ values, accent = "#06B6D4", height = 190 }) {
  const width = 520;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - (value / 100) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${height} ${points} ${width},${height}`;

  return (
    <svg className="h-auto w-full overflow-visible" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Performance trend">
      {[0.25, 0.5, 0.75].map((row) => (
        <line key={row} x1="0" x2={width} y1={height * row} y2={height * row} stroke="#E2E8F0" strokeDasharray="5 5" />
      ))}
      <defs>
        <linearGradient id={`area-${accent.replace("#", "")}`} x2="0" y2="1">
          <stop stopColor={accent} stopOpacity="0.18" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#area-${accent.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={height - (values[values.length - 1] / 100) * (height - 20) - 10} r="5" fill={accent} />
    </svg>
  );
}

export function ComparisonBars({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const values = [78, 64, 52, 47];
        return (
          <div className="rounded-xl border border-line/80 bg-white/55 p-3" key={item.name}>
            <div className="mb-2.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-midnight">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{item.followers}</span>
                <span className="font-semibold text-cyan-700">{item.engagement}</span>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${values[index]}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
