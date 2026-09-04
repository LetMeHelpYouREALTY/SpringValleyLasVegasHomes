export type HomeReview = {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  date?: string;
};

/**
 * Homepage testimonials — shared by ReviewsSection UI and JSON-LD.
 * No stock-avatar photos: initials render when `image` is omitted (E-E-A-T).
 */
export const defaultHomeReviews: HomeReview[] = [
  {
    id: 1,
    name: "Tom Sanders",
    location: "Spanish Trail, Spring Valley",
    rating: 5,
    text: "Dr. Duffy made our home buying experience seamless. Her knowledge of the Spring Valley market is unmatched, and she guided us through every step with professionalism and care.",
    date: "2025-11-15",
  },
  {
    id: 2,
    name: "Vitor Palmer",
    location: "Desert Breeze, Spring Valley",
    rating: 5,
    text: "We couldn't be happier with our new home. The entire process was smooth, and Dr. Duffy's attention to detail and negotiation skills saved us thousands.",
    date: "2025-10-22",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "89147 Spring Valley",
    rating: 5,
    text: "As first-time buyers we were nervous about the process. Dr. Duffy explained every contract step and helped us find a home that fit our budget in Spring Valley.",
    date: "2025-09-08",
  },
];
