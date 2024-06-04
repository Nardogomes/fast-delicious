"use client"

import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/product-list";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>,
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

const ProductDetails = ({ product, complementaryProducts }: ProductDetailsProps) => {
  const [quantity, setQuatity] = useState(1);

  const handleIncreaseQuantityClick = () => setQuatity(prevState => prevState + 1);

  const handleDecreaseQuantityClick = () => setQuatity(prevState => {
    if (prevState === 1) return 1

    return prevState - 1
  });

  return (
    <div className="relative mt-[-1.5rem] py-5 rounded-tl-3xl rounded-tr-3xl bg-white z-10">
      {/* Restaurante */}
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
      </div>

      {/* Nome do produto */}
      <h1 className="px-5 text-xl font-semibold mb-3 mt-1">{product.name}</h1>

      {/* Preço do produto e quantidade */}
      <div className="flex justify-between px-5">
        {/* Preço com desconto */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* Preço original */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        {/* Quantidade */}
        <div className="flex gap-3 items-center text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>

          <span className="w-4">{quantity}</span>

          <Button
            size="icon"
            onClick={handleIncreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* Dados da entrega */}
      <div className="px-5">
        <Card className="flex justify-around py-3 mt-6">
          {/* Custo */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>

          {/* Tempo */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            {product.restaurant.deliveryTimeMinutes > 0 ? (
              <p className="text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes}min
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold px-5">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  );
}

export default ProductDetails;