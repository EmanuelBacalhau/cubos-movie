import { fastifyServer } from "@main/server";

export function generateToken(userId: string): string {
  return fastifyServer.jwt.sign({ sub: userId });
}
