import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>;
  className?: string
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("space-y-2 w-[150px] min-w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className="aspect-square w-full relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        {product.discountPercentage && (
          <div className="absolute top-2 left-2 gap-[2px] bg-primary px-2 py-[2px] rounded-full text-white flex items-center">
            <ArrowDownIcon size={12} />

            <span className="font-semibold text-xs">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm truncate">{product.name}</h2>

        <div className="flex gap-1 items-center">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>

          {product.discountPercentage > 0 && (
            <span className="line-through text-muted-foreground text-xs">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <span className="block text-muted-foreground text-xs">{product.restaurant.name}</span>

      </div>
    </Link>
  );
}
export default ProductItem;