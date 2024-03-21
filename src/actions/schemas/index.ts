import { z } from "zod";

export const JwtSchema = z.object({
  jwtoken: z.string().min(1, {
    message: "JWToken is required",
  }),
});
