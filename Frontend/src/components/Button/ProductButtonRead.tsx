import "./ProductButtonRead.css"
import clsx from "clsx"

interface ProductButtonProps{
    name: string;
    variant: "primary" | "secondary";
    // disabled?: boolean;
}

export const Button = ({ name, variant}: ProductButtonProps) => {
    return <button className={clsx("button", `button--${variant}`)} 
    > {name} </button>;

}