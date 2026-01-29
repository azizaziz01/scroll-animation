// Image data with positions, parallax speeds, and depth layers
// depth: 'near' = large, sharp, fast | 'mid' = medium | 'far' = small, blurred, slow

export interface WorkImage {
  url: string;
  position: string;
  speed: number;
  shadow?: string;
  depth: 'near' | 'mid' | 'far';
  title: string;
}

export const IMAGES: WorkImage[] = [
  // Near layer - large, sharp, prominent
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/10/ES-5-480x720.jpg", position: "top-[16%] left-[20%]", speed: 0.85, depth: 'near', title: "Elwood St" },
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Ormond-21-2-480x720.jpg", position: "top-[25%] right-[8%]", speed: 0.55, shadow: "shadow-2xl", depth: 'near', title: "Ormond Rd" },
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Soho-13-480x720.jpg", position: "top-[58%] left-[25%] md:left-[30%]", speed: 0.45, shadow: "shadow-xl", depth: 'near', title: "Soho House" },
  
  // Mid layer - medium size, slight blur
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hurstmon-9-480x719.jpg", position: "top-[3%] right-[5%]", speed: 0.35, shadow: "shadow-xl", depth: 'mid', title: "Hurstmon" },
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/08/Parlington-2-480x480.jpg", position: "top-[28%] left-[8%]", speed: 0.3, shadow: "shadow-md", depth: 'mid', title: "Parlington" },
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/10/ES-5-480x720.jpg", position: "top-[65%] right-[10%]", speed: 0.35, shadow: "shadow-md", depth: 'mid', title: "East Side" },
  
  // Far layer - small, blurred, slow moving (creates depth)
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/10/ES-7-e1764223193966-480x609.jpg", position: "top-[15%] left-[30%] md:left-[38%]", speed: 0.0515, depth: 'far', title: "Estate 7" },
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/09/StudioPiper_KensingtonRoad_SouthYarra_EXT-e1764222151372-480x254.jpg", position: "top-[42%] left-[3%]", speed: 0.0512, depth: 'far', title: "Studio Piper" },
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/10/Image14_000-480x270.jpg", position: "top-[48%] right-[2%]", speed: 0.0518, depth: 'far', title: "Image 14" },
  { url: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hurstmon-9-480x719.jpg", position: "top-[72%] left-[5%]", speed: 0.051, depth: 'far', title: "Hurstmon II" },
];