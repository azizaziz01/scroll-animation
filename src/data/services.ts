export interface Service {
  id: string;
  title: string;
  image: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "branding",
    title: "Branding Identity",
    description: "Crafting unique visual languages that resonate and endure.",
    image: "https://stokt.b-cdn.net/KEYCAPS-loop-01-.webm"
  },
  {
    id: "web",
    title: "Web Design & Dev",
    description: "Building immersive digital experiences with cutting-edge tech.",
    image: "https://stokt.b-cdn.net/robot-hand-v1-%203-alpha%20(1).webm"
  },
  {
    id: "motion",
    title: "Motion Systems",
    description: "Bringing brands to life through fluid, dynamic motion.",
    image: "https://stokt.b-cdn.net/skate-wheel-black-01_alpha.webm"
  },
  {
    id: "strategy",
    title: "Architectural Strategy",
    description: "Designing spatial environments that inspire and function.",
    image: "https://stokt.b-cdn.net/skate-wheel-black-01_alpha.webm"
  }
];
