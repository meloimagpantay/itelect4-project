// src/pages/SubmissionsPage.tsx -- the finished file
// ===== SESSION 7: the imports, before any form library ===============
// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient }
//   from "@tanstack/react-query";
// import type { ApiSubmission } from "../types/index";
// import SubmissionBadge from "../components/SubmissionBadge";
// import { fetchSubmissions, createSubmission } from "../api/client";
//
// NOTE: useState is GONE from this file. React Hook Form keeps the
//       field values now, so the page holds no form state of its own.
// ===== SESSION 8: the form library, the schema, and three UI parts ===
import { useQuery, useMutation, useQueryClient }
  from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiSubmission, Course } from "../types/index";
import { submissionSchema } from "../schemas/submissionSchema";
import type { SubmissionFormValues } from "../schemas/submissionSchema";
import SubmissionBadge from "../components/SubmissionBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchSubmissions, createSubmission, fetchCourses }
  from "../api/client";

function SubmissionsPage() {
  const queryClient = useQueryClient();

// ===== SESSION 7: one useState per field, no rules anywhere ==========
//   const [repoUrl, setRepoUrl] = useState<string>("");
// ===== SESSION 8: one useForm call: values, rules and errors =========
  // useForm holds the values, runs the schema, and stores the errors.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    defaultValues: { courseCode: "", repoUrl: "" },
  });

  // Same queryKey as CoursesPage, so this list comes out of the cache.
  const courses = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const { data, isPending, isError } = useQuery<ApiSubmission[]>({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset();               // clears every field at once
    },
  });

  // handleSubmit only calls this after the schema passes.
// ===== SESSION 8: the page made up the other two fields ==============
//   const onSubmit = (values: SubmissionFormValues): void => {
//     addSubmission.mutate({
//       studentId:   1,
//       courseCode:  values.courseCode,
//       repoUrl:     values.repoUrl,
//       submittedAt: new Date().toISOString(),
//     });
//   };
//
// NOTE: studentId was 1 for everybody, and the browser's clock set
//       submittedAt. The API takes the owner off the token and the
//       schema defaults the date, so sending either one is at best
//       ignored. NewSubmission is now exactly SubmissionFormValues.
// ===== SESSION 10: the two fields the form has, and nothing else =====
  const onSubmit = (values: SubmissionFormValues): void => {
    addSubmission.mutate(values);
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading submissions...</div>;
  }
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load submissions.
      </div>
    );
  }
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900
        dark:text-white">My Submissions</h2>

      {/* ===== SESSION 7: a bare input and button -- nothing could be invalid ===
          <div className="mb-6 flex gap-2">
            <input value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="github.com/you/your-repo"
              className="w-full rounded border border-gray-300 p-2" />
            <button onClick={handleAdd}
              disabled={repoUrl === "" || addSubmission.isPending}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold
                text-white transition hover:bg-blue-700 disabled:bg-gray-400">
              {addSubmission.isPending ? "Saving..." : "Add"}
            </button>
          </div>

          NOTE: handleSubmit(onSubmit) runs the schema first and only calls
                onSubmit when every rule passes. Nothing else guards it.
          ===== SESSION 8: a real <form>, labelled fields, error messages === */}
      <form onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4
          dark:border-gray-700">
        <div className="grid gap-1.5">
          <Label htmlFor="courseCode" className="text-foreground">
            Course</Label>
          <select id="courseCode" {...register("courseCode")}
            className="h-8 rounded-lg border border-input bg-background
              px-2.5 text-sm text-foreground">
            <option value="">Select a course...</option>
            {courses.data?.map((c) => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>
          {errors.courseCode && (
            <p className="text-sm text-red-600">
              {errors.courseCode.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="repoUrl" className="text-foreground">
            Repository URL</Label>
          <Input id="repoUrl" {...register("repoUrl")}
            aria-invalid={errors.repoUrl ? true : undefined}
            placeholder="https://github.com/you/your-repo" />
          {errors.repoUrl && (
            <p className="text-sm text-red-600">
              {errors.repoUrl.message}</p>
          )}
        </div>

        {/* Never disabled on "invalid": clicking it is what shows the
            error messages. Only a save in flight disables it. */}
        <Button type="submit"
          disabled={addSubmission.isPending}
          className="justify-self-start">
          {addSubmission.isPending ? "Saving..." : "Add submission"}
        </Button>
      </form>

      {addSubmission.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addSubmission.error.message}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((s) => (
          <SubmissionBadge key={s.id} submission={s}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Course: {s.courseCode}</p>
          </SubmissionBadge>
        ))}
      </div>
    </div>
  );
}

export default SubmissionsPage;
