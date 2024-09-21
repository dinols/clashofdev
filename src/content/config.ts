import { z, defineCollection } from 'astro:content';

const sectionCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    color: z.enum([
      'blue',
      'green',
      'mustard',
      'orange',
      'pink',
      'purple',
    ] as const),
    icon: z.string().optional(),
    category: z.string(),
    points: z.string(),
    jury: z.array(z.string()),
  }),
});

export const collections = {
  section: sectionCollection,
};
