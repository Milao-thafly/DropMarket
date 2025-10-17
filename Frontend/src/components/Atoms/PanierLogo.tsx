export const CartIconAtom = ({
count = 0,
ariaLabel = "Panier",
className = "",
showCount = true,
...props
}) => {
return (
<button
type="button"
aria-label={ariaLabel}
className={`relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
{...props}
>
{/* Simple emoji cart */}
<span className="text-xl" aria-hidden>
🛒
</span>

</button>
);
};