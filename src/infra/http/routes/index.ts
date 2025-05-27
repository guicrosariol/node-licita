import type { FastifyInstance } from "fastify";
import { publicRoutes } from "./public-routes";
import { privateRoutes } from "./privates-routes";

export function appRoutes(app: FastifyInstance) {
  publicRoutes(app)
  privateRoutes(app)
}