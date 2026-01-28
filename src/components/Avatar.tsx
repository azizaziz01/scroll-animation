import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className = "" }) => {
  // Default fallback if no src is provided
  const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-vector-of-social-media-user-vector.jpg";
  
  return (
    <div className={`w-14 h-14 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 ring-2 ring-transparent group-hover:ring-accent/20 ${className}`}>
      <img
        src={src || defaultAvatar}
        alt={alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultAvatar;
        }}
      />
    </div>
  );
};

export default Avatar;
