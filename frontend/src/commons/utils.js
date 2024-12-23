import { colorSets } from "./constants";

export function extractCode(input) {
  // Matches any language identifier or none
  const regex = /```[\w-]*\n([\s\S]*?)\n```/
  const match = input.match(regex)
  return match ? match[1] : input
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  // Get the components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format as "YYYY-MM-DD, HH:MM"
  return `${year}-${month}-${day}, ${hours}:${minutes}`;
};

export const getComplexityColor = (complexity) => {
  switch (complexity) {
    case "easy":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        ring: "ring-green-600/10",
      };
    case "medium":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        ring: "ring-yellow-600/10",
      };
    case "hard":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        ring: "ring-red-600/10",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        ring: "ring-gray-600/10",
      };
  }
};

export const getRandomColorSet = () =>
  colorSets[Math.floor(Math.random() * colorSets.length)];