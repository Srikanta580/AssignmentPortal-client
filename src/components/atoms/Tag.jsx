const Tag = ({ children, className = "" }) => (
  <span
    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase inline-block ${className}`}
  >
    {children}
  </span>
);
export const BetaTag = ({ className }) => (
  <Tag className={`bg-yellow-400 text-black ${className}`}>BETA</Tag>
);

export const NewTag = ({ className }) => (
  <Tag className={`bg-green-500 text-white ${className}`}>NEW</Tag>
);

export const ComingSoonTag = ({ className }) => (
  <Tag className={`bg-gray-400 text-white ${className}`}>Coming Soon</Tag>
);

export const DeprecatedTag = ({ className }) => (
  <Tag className={`bg-red-500 text-white ${className}`}>Deprecated</Tag>
);
