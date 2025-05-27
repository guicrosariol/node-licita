import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUserUseCase } from "../../factories/make-create-user";
import { AlreadyExistError } from "../../../domain/application/use-cases/errors/already-exist-error";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { name, email, password } = requestSchema.parse(request.body);

    const createUserUseCase = makeCreateUserUseCase();

    const result = await createUserUseCase.execute({ name, email, password });

    if (result.isLeft()) {
      const error = result.value as { message: string };
      if (error instanceof AlreadyExistError) {
        return reply.status(409).send({ message: error.message });
      }
      return reply.status(400).send({ message: error.message || "Erro desconhecido" });
    }

    const user = result.value;
    return reply.status(201).send(user);

  } catch (err) {
    return reply.status(400).send({ message: (err as Error).message });
  }
}