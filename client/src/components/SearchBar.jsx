import useCryptoStore from "../store/useCryptoStore";

function SearchBar() {
  const { search, setSearch } = useCryptoStore();
  return (
    <input
      type="text"
      placeholder="코인 이름/심볼 검색"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: 16, width: 200 }}
    />
  );
}

export default SearchBar;
