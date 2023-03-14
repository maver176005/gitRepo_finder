export const getRepoOnPage = (
  repos: any[],
  caunt = 1
): {
  count: number;
  repos: any[][];
} => {
  const cauntRepos = caunt > 100 ? 100 : caunt;
  const cauntPages = Math.ceil(cauntRepos / 10);
  const reposPages = [];

  for (let i = 0; i < cauntPages; i += 1) {
    reposPages.push(repos.slice(i * 10, (i + 1) * 10));
  }

  return { count: cauntPages, repos: reposPages };
};
