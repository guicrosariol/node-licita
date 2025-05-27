import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = requestSchema.parse(request.body)
  console.log(name, email, password);
}