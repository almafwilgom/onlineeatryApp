import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { getMenu } from '../services/menuService';
import MealCard from '../components/MealCard';
import { SkeletonCard } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';

const categories = ['All', 'Rice', 'Soups', 'Grills', 'Drinks', 'Desserts', 'Snacks'];

const fallbackCatalog = [
  // RICE
  {
    _id: 'rice-1',
    name: 'Jollof Rice & Chicken',
    category: 'Rice',
    price: 3500,
    isAvailable: true,
    description: 'Smoky party jollof rice cooked to perfection with grilled chicken and fried plantain.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'rice-2',
    name: 'Special Fried Rice & Prawns',
    category: 'Rice',
    price: 3200,
    isAvailable: true,
    description: 'Vibrant fried rice cooked with mixed vegetables, prawns, and liver cubes.',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'rice-3',
    name: 'Ofada Rice & Ayamase Sauce',
    category: 'Rice',
    price: 4000,
    isAvailable: true,
    description: 'Authentic local unpolished rice served with spicy green pepper Ayamase sauce, boiled egg, and assorted meat.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'rice-4',
    name: 'Coconut Rice & Peppered Fish',
    category: 'Rice',
    price: 3800,
    isAvailable: true,
    description: 'Rich coconut milk infused rice served with spicy peppered catfish steak.',
    imageUrl: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=600&q=80',
  },

  // SOUPS
  {
    _id: 'soup-1',
    name: 'Egusi Soup & Pounded Yam',
    category: 'Soups',
    price: 2500,
    isAvailable: true,
    description: 'Classic melon seed soup with stockfish, kanda, dried fish, and tender beef served with smooth pounded yam.',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'soup-2',
    name: 'Ogbono Soup & Assorted Meat',
    category: 'Soups',
    price: 2700,
    isAvailable: true,
    description: 'Slime draw soup cooked with dried fish, tripe, beef, and bitterleaf.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'soup-3',
    name: 'Efo Riro & Semovita',
    category: 'Soups',
    price: 3000,
    isAvailable: true,
    description: 'Rich Yoruba spinach stew cooked with shaki, dried prawns, and palm oil.',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'soup-4',
    name: 'Seafood Okra Soup',
    category: 'Soups',
    price: 4500,
    isAvailable: true,
    description: 'Luxe fresh okra soup loaded with jumbo prawns, crab claws, snails, and fresh fish.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
  },

  // GRILLS
  {
    _id: 'grill-1',
    name: 'Grilled Chicken Quarter',
    category: 'Grills',
    price: 4000,
    isAvailable: true,
    description: 'Spicy flame-grilled chicken quarter seasoned with authentic Suya spices.',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'grill-2',
    name: 'Suya Skewers Platter',
    category: 'Grills',
    price: 3500,
    isAvailable: true,
    description: 'Thinly sliced beef flank skewers heavily spiced with Yaji pepper, sliced onions, and tomatoes.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'grill-3',
    name: 'Whole Peppered Catfish',
    category: 'Grills',
    price: 6500,
    isAvailable: true,
    description: 'Charcoal grilled whole catfish slathered in extra spicy Lagos pepper sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'grill-4',
    name: 'Asun (Spicy Peppered Goat)',
    category: 'Grills',
    price: 3800,
    isAvailable: true,
    description: 'Smoky pan-fried diced goat meat tossed with habanero peppers and onions.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },

  // DRINKS
  {
    _id: 'drink-1',
    name: 'Chilled Zobo Hibiscus Drink',
    category: 'Drinks',
    price: 800,
    isAvailable: true,
    description: 'Refreshing homemade dried hibiscus flower tea infused with ginger, pineapple, and mint.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'drink-2',
    name: 'Special Chapman Cocktail',
    category: 'Drinks',
    price: 1500,
    isAvailable: true,
    description: 'Signature Nigerian Chapman cocktail with Angostura bitters, Fanta, Sprite, cucumber, and orange slices.',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'drink-3',
    name: 'Fresh Tigernut Milk (Kunu Aya)',
    category: 'Drinks',
    price: 1200,
    isAvailable: true,
    description: 'Creamy organic tigernut juice blended with dates, coconut, and ginger.',
    imageUrl: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
  },

  // DESSERTS
  {
    _id: 'dessert-1',
    name: 'Puff Puff Platter with Dip',
    category: 'Desserts',
    price: 1500,
    isAvailable: true,
    description: 'Golden fluffy Nigerian yeast dough balls dusted with cinnamon sugar and chocolate dip.',
    imageUrl: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'dessert-2',
    name: 'Caramelized Cinnamon Plantain',
    category: 'Desserts',
    price: 1800,
    isAvailable: true,
    description: 'Sweet ripe fried plantains glazed with honey, cinnamon, and vanilla ice cream scoop.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  },

  // SNACKS
  {
    _id: 'snack-1',
    name: 'Peppered Gizdodo (Gizzard & Dodo)',
    category: 'Snacks',
    price: 2500,
    isAvailable: true,
    description: 'Cubed fried sweet plantains and chicken gizzards tossed in rich bell pepper stew.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'snack-2',
    name: 'Nigerian Meat Pie Box (2pcs)',
    category: 'Snacks',
    price: 1600,
    isAvailable: true,
    description: 'Flaky buttery pastry filled with minced beef, potatoes, and carrots.',
    imageUrl: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
  },
];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await getMenu();
        const apiItems = res.data?.data?.items || [];
        
        // Merge API items with fallback catalog so all categories have rich selections
        const combined = [...apiItems];
        fallbackCatalog.forEach((fb) => {
          if (!combined.some((item) => item.name?.toLowerCase() === fb.name.toLowerCase())) {
            combined.push(fb);
          }
        });

        setMeals(combined);
      } catch (err) {
        setMeals(fallbackCatalog);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredMeals = meals
    .filter((meal) => {
      const matchCat = selectedCategory === 'All' || meal.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        meal.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-left space-y-1">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-stone-900">Explore Our Menu</h1>
        <p className="text-stone-500 text-xs sm:text-sm">Choose from a variety of authentic Nigerian dishes, grills, soups, and drinks</p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search meals by name or ingredient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-12 py-3.5 bg-white border border-stone-200 rounded-2xl text-stone-900 text-xs placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-xs"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
      </div>

      {/* Category Pills & Filter/Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <span>Filter</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none font-bold cursor-pointer"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* Food Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredMeals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 text-stone-400 space-y-3">
          <p className="text-stone-800 font-bold text-base">No meals found in "{selectedCategory}"</p>
          <p className="text-xs text-stone-500">Try selecting another category or clearing your search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMeals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Menu;
