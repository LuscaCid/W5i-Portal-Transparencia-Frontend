export function formatNumberToBrl(value: number): string 
{
    return value.toLocaleString("pt-Br", {currency : "BRL", style : "currency" })
}