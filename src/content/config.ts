// 1. Importar las utilidades de `astro:content`
import { z, defineCollection, reference } from "astro:content";

// 2. Definir un `type` y `schema` para cada colección
const blogCollection = defineCollection({
  type: "content", // v2.5.0 y posteriores
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image().refine((img) => img.width < 1200),
      //Relacion
      author: reference("author"),
      tags: z.array(z.string()),
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  type: "data",
  schema: ({ image }) => {
    return z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    });
  },
});

// 3. Exportar un único objeto `collections` para registrar tu(s) colección(es)
export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
