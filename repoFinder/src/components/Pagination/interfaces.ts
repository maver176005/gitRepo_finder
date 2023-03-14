export default interface IPagination {
  pages: number;
  currentPage: number;
  setPage: (page: number) => void;
}
