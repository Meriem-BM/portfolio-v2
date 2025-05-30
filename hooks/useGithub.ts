import { useEffect, useState } from "react";
import type { IProject } from "@/types";

const GITHUB_USERNAME = "Meriem-BM";

const useGithub = (length: number) => {
  const [prjects, setProjects] = useState<IProject[] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getGitHubProjects = async () => {
      setLoading(true);

      let fetchUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated`;

      if (length) {
        fetchUrl += `&per_page=${length}&page=${page}`;
      }

      fetch(fetchUrl, {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      })
        .then((res) => res.json())
        .then((data) => {
          setProjects([...(prjects || []), ...data]);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => setLoading(false));
    };

    getGitHubProjects();

    return () => {
      setProjects(null);
      setLoading(true);
      setError(null);
    };
  }, [length, page]);

  const loadMore = () => {
    if (prjects && prjects.length >= length) {
      setPage((prev) => prev + 1);
    }
  };

  return { data: prjects, loading, error, loadMore };
};

export default useGithub;
