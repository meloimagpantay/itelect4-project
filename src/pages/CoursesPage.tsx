// src/pages/CoursesPage.tsx -- the finished file
// ===== SESSION 6: the imports this file used to have ===================
// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router";                    // <-- NEW
// import type { Course } from "../types/index";
// import CourseCard from "../components/CourseCard";
// import usePrevious from "../hooks/usePrevious";
// import { allCourses } from "../data/mockData";          // <-- NEW
// ===== SESSION 7: three of those are gone, three are new ===============
import { useQuery } from "@tanstack/react-query";        // <-- NEW
import { Link } from "react-router";
import type { Course } from "../types/index";
import CourseCard from "../components/CourseCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";               // <-- NEW
import { fetchCourses, API_URL } from "../api/client";
import { Input } from "@/components/ui/input";
// The useState, useEffect, useRef and mockData imports are GONE
 
function CoursesPage() {
// ===== SESSION 6: the fetching state -- 14 lines, all replaced =========
//   // All six of these moved from Session 5's App.tsx, unchanged
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isError, setIsError] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const previousSearch = usePrevious(searchTerm);
//
//   useEffect(() => {
//     setTimeout(() => {
//       setCourses(allCourses);      // <-- was setCourses([course])
//       setIsLoading(false);
//     }, 500);
//   }, []);
//
// NOTE: useQuery does every one of those jobs, and adds caching,
//       retry and background refetching that this never had.
// ===== SESSION 7: the four lines that replace all of it ================
  // These four lines replace ALL of Session 6's fetching state
  const { data, isPending, isError, error } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
 
  // The search box now reads and writes the store, not local state
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);
 
 
  if (isPending) {
    return <div className="animate-pulse p-6">Loading courses...</div>;
  }
 
// ===== SESSIONS 7-8: the only thing that could be wrong was json-server
//   if (isError) {
//     return (
//       <div className="rounded-lg bg-red-50 p-4 text-red-700">
//         {error.message} -- is json-server running on port 3001?
//       </div>
//     );
//   }
// ===== SESSION 10: name the host it actually tried ===================
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- tried {API_URL}/api/courses
      </div>
    );
  }
 
// ===== SESSION 6: the handler and the filter ===========================
//   const handleSearchChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ): void => setSearchTerm(e.target.value);
//
//   // Matches the CODE as well as the title -- typing ITELECT has to work
//   const filteredCourses = courses.filter((c) =>
//     c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     c.code.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//
// NOTE: The filter itself is unchanged -- it still matches the code
//       as well as the title. Only its input moved: courses became
//       data, and searchTerm now comes from the store.
// ===== SESSION 7: same filter, different source ========================
  // Below this line data is Course[], never undefined -- the two
  // returns above ruled the other cases out, and TypeScript followed.
  const filteredCourses = data.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900
        dark:text-white">Courses</h2>
      {/* ===== SESSION 7: the search box, hand-styled since Session 5 =======
          <input value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded border border-gray-300 p-2" />
          ===== SESSION 8: the same <Input>, driven by a plain onChange === */}
      {/* Input takes a normal onChange too -- it does not need
          React Hook Form to be useful. */}
      <Input value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search courses..." />
      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500">
          Previous search: "{previousSearch}"</p>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2
        lg:grid-cols-3">
        {filteredCourses.map((c) => (
          <Link key={c.code} to={`/courses/${c.code}`}>
            <CourseCard course={c} />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default CoursesPage;
 
// The "Simulate Error" button is GONE. To see the error branch now,
// stop the API in Terminal 1 and reload, or point VITE_API_URL at a
// host that is not there. The failure is real either way, and the
// message on screen says which host it tried.
