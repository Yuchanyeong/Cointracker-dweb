import useCryptoStore from "../store/useCryptoStore";

function FavoriteButton({ coinId, onClick }) {
  const { favorites, toggleFavorite } = useCryptoStore();
  const isFavorite = favorites.includes(coinId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // 행 클릭 이벤트 버블링 방지
        toggleFavorite(coinId);
        if (onClick) onClick();
      }}
      style={{
        background: "none",
        border: "none",
        fontSize: 18,
        cursor: "pointer",
        color: isFavorite ? "#f6c700" : "#bbb",
      }}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}

export default FavoriteButton;
