export const TitleAtom = ({
children = "SAVE-PEOPLE",
href = "/",
className = "",
...props
}) => {
return (
<a
href={href}
className={`text-xl font-semibold tracking-tight hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded ${className}`}
{...props}
>
{children}
</a>
);
};