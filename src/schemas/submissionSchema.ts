// src/schemas/submissionSchema.ts -- a NEW file
// ===== SESSION 8: a NEW file =========================================
// ===== no Session 7 version -- nothing to compare it to ==============
// The rules for one form, written once, in one place.
//
// One schema. The rules live here, and the TypeScript type is DERIVED
// from it -- so a rule and its type can never drift apart.
import { z } from "zod";

export const submissionSchema = z.object({
  // .min(1) is what "required" means for a string: not empty.
  courseCode: z.string().min(1, "Choose a course."),

  // z.url() checks the whole shape of a URL, scheme included.
  // .refine() adds any rule Zod does not ship: yours, as a function.
  repoUrl: z
    .url("That is not a valid URL -- include https://")
    .refine((url) => url.includes("github.com"),
            "It has to be a GitHub URL."),
});

// z.infer reads the schema and hands back the TypeScript type:
//   { courseCode: string; repoUrl: string }
// Written by hand, that type would be a second thing to keep in sync.
export type SubmissionFormValues = z.infer<typeof submissionSchema>;
