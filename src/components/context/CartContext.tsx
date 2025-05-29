import { createContext, useContext, useState } from "react";

interface CartItem {
    book: string; // ID sách
    title: string;
    quantity: number;
    price: number;
    image: string;
}

interface ICartContext {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<ICartContext | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false); // Thêm state mới

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.book === item.book);
            if (existing) {
                return prev.map(i =>
                    i.book === item.book ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (bookId: string) => {
        setCartItems(prev => prev.filter(i => i.book !== bookId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
