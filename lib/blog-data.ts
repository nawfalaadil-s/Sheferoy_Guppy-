// Sample blog data
// In production, this would come from Supabase database

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  published: boolean;
  readTime: string;
}

export const blogCategories = [
  "All Categories",
  "Guppy Care",
  "Guppy Breeding",
  "Guppy Varieties",
  "Aquarium Setup",
  "Fish Health",
  "Water Quality",
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Complete Guide to Guppy Care for Beginners",
    slug: "complete-guide-guppy-care-beginners",
    excerpt: "Learn the essential basics of caring for guppies, including water parameters, feeding schedules, and tank setup requirements for healthy, vibrant fish.",
    content: `
# Complete Guide to Guppy Care for Beginners

Guppies are one of the most popular freshwater aquarium fish, and for good reason. These colorful, active fish are relatively easy to care for, making them perfect for beginners. In this comprehensive guide, we'll cover everything you need to know to keep your guppies healthy and thriving.

## Tank Requirements

Guppies are small fish, but they still need adequate space to swim and thrive. Here are the basic tank requirements:

- **Minimum tank size**: 40 liters (10 gallons) for a small group
- **Tank shape**: Longer tanks are better than tall tanks
- **Filtration**: A gentle filter that won't create strong currents
- **Heating**: A reliable heater to maintain stable temperature

## Water Parameters

Maintaining proper water parameters is crucial for guppy health:

- **Temperature**: 24-28°C (75-82°F)
- **pH**: 6.8-7.8
- **Hardness**: 8-12 dGH
- **Ammonia & Nitrite**: 0 ppm
- **Nitrate**: Below 20 ppm

## Feeding

Guppies are omnivores and need a varied diet:

- **Frequency**: Feed 2-3 times daily
- **Portion size**: Only what they can consume in 2-3 minutes
- **Foods**: High-quality flake food, frozen foods (bloodworms, brine shrimp), and occasional vegetables

## Tank Mates

Guppies are peaceful fish that do well with other peaceful species. Good tank mates include:

- Other guppies
- Platies
- Mollies
- Corydoras catfish
- Tetras (peaceful species)

Avoid aggressive fish or fin-nippers that might harm your guppies.

## Conclusion

With proper care and attention to water quality, guppies can live 2-3 years and bring endless enjoyment to your aquarium. Start with these basics, and you'll be well on your way to success with these beautiful fish.
    `,
    category: "Guppy Care",
    author: "Sheferoy Guppy",
    publishedAt: "2026-10-15T10:00:00Z",
    published: true,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding Guppy Breeding Basics",
    slug: "understanding-guppy-breeding-basics",
    excerpt: "Discover the fundamentals of guppy breeding, from selecting breeding pairs to caring for fry and maintaining genetic quality in your line.",
    content: `
# Understanding Guppy Breeding Basics

Guppy breeding can be a rewarding hobby, but it requires understanding some basic principles. This guide will help you get started with breeding these prolific fish.

## Selecting Breeding Pairs

Choose healthy, vibrant fish with the traits you want to pass on:

- Look for active, disease-free fish
- Select fish with strong coloration and good body shape
- Consider the genetic traits you want to enhance
- Avoid breeding closely related fish to prevent genetic issues

## Setting Up a Breeding Tank

A dedicated breeding tank helps you control the process:

- **Size**: 20-40 liters minimum
- **Filtration**: Gentle sponge filter
- **Plants**: Java moss or breeding mops for fry to hide
- **Temperature**: 26-28°C for optimal breeding

## The Breeding Process

Guppies are livebearers, meaning they give birth to free-swimming fry:

1. Introduce your selected pair to the breeding tank
2. Gestation period is typically 21-30 days
3. Female will show a dark gravid spot when pregnant
4. Separate the female before birth or provide hiding spots for fry

## Caring for Fry

Baby guppies need special attention:

- Feed multiple times daily with crushed flake food or specialized fry food
- Perform frequent small water changes
- Maintain stable water parameters
- Separate fry by size to prevent competition

## Conclusion

Breeding guppies successfully requires patience and attention to detail, but the results are well worth the effort. Start small, learn from each generation, and enjoy the process.
    `,
    category: "Guppy Breeding",
    author: "Sheferoy Guppy",
    publishedAt: "2026-10-10T10:00:00Z",
    published: true,
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Top 10 Most Popular Guppy Varieties",
    slug: "top-10-popular-guppy-varieties",
    excerpt: "Explore the most sought-after guppy strains among hobbyists, featuring stunning colors, patterns, and unique characteristics that make each variety special.",
    content: `
# Top 10 Most Popular Guppy Varieties

Guppies come in an incredible array of colors and patterns. Here are the top 10 most popular varieties among aquarium enthusiasts.

## 1. Moscow Blue

The Moscow Blue is prized for its solid, deep blue coloration that covers the entire body and fins. This variety maintains its intense color throughout its life.

## 2. Red Dragon

Featuring vibrant red coloration with darker patterns, Red Dragons are eye-catching and relatively easy to care for, making them perfect for beginners.

## 3. Platinum White

Pure white with a metallic sheen, Platinum Whites create a stunning visual impact in any aquarium setup.

## 4. Tuxedo

The classic Tuxedo pattern features distinct color separation between the front and rear of the body, creating a formal "tuxedo" appearance.

## 5. Cobra

Cobra guppies feature intricate rosette patterns on their bodies, creating a snake-skin like appearance that's highly distinctive.

## 6. Leopard

With spotted patterns resembling a leopard's coat, these guppies are unique individuals with no two exactly alike.

## 7. Half Black

The Half Black varieties feature solid black coloration on the rear half of the body, combined with various colors on the front half.

## 8. Koi

Koi guppies display multicolor patterns similar to koi carp, making them some of the most colorful varieties available.

## 9. Albino

Albino guppies feature pale bodies with red eyes and come in various color combinations, though less intense than non-albino varieties.

## 10. Endler's

While technically a separate species, Endler's guppies are often grouped with fancy guppies. They're smaller but incredibly colorful and active.

## Conclusion

Each guppy variety has its own unique appeal. Whether you prefer solid colors, intricate patterns, or unusual tail shapes, there's a guppy variety perfect for your aquarium.
    `,
    category: "Guppy Varieties",
    author: "Sheferoy Guppy",
    publishedAt: "2026-10-05T10:00:00Z",
    published: true,
    readTime: "7 min read",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && post.published);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "All Categories") {
    return blogPosts.filter((post) => post.published);
  }
  return blogPosts.filter((post) => post.category === category && post.published);
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.published &&
      (post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery))
  );
}
