import { z } from 'zod';

// Schemas baseados em respostas reais da API do automationexercise.com,
// coletadas manualmente antes de escrever este arquivo (não inventados a
// partir da documentação). `.parse()` falha o teste com uma mensagem
// detalhada de qual campo não bate, se o contrato da API mudar.

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  brand: z.string(),
  category: z.object({
    usertype: z.object({
      usertype: z.string(),
    }),
    category: z.string(),
  }),
});

export const ProductsListResponseSchema = z.object({
  responseCode: z.number(),
  products: z.array(ProductSchema),
});

export const BrandSchema = z.object({
  id: z.number(),
  brand: z.string(),
});

export const BrandsListResponseSchema = z.object({
  responseCode: z.number(),
  brands: z.array(BrandSchema),
});

// Resposta genérica no formato {responseCode, message}, usada por
// verifyLogin, createAccount, deleteAccount e pela rejeição de método
// HTTP não suportado.
export const MessageResponseSchema = z.object({
  responseCode: z.number(),
  message: z.string(),
});

export const UserDetailResponseSchema = z.object({
  responseCode: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    title: z.string(),
    birth_day: z.string(),
    birth_month: z.string(),
    birth_year: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address1: z.string(),
    address2: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    zipcode: z.string(),
  }),
});

export type Product = z.infer<typeof ProductSchema>;
