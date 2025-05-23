import useCryptoStore from "../store/useCryptoStore";

function FavoriteButton({ coinId, onClick }) {
  const { favorites, toggleFavorite } = useCryptoStore();
  const isFavorite = favorites.includes(coinId);

  return (
    <button
      className={`favorite-btn${isFavorite ? " active" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(coinId);
        if (onClick) onClick();
      }}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
export default FavoriteButton;
