// MealCard.jsx — implemented in Phase 7/8
const MealCard = ({ meal }) => (
  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
    <p className="text-white font-semibold">{meal?.name}</p>
  </div>
);
export default MealCard;
