import { z, defineCollection } from 'astro:content';

export const sectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  character: z.string(),
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
});

const sectionCollection = defineCollection({
  type: 'data',
  schema: sectionSchema,
});

export const collections = {
  section: sectionCollection,
};

export type Section = z.infer<typeof sectionSchema>;
