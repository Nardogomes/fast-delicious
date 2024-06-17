import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link
      className={cn("min-w-[266px] max-w-[266px]", className)}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
        <div className="w-full h-[136px] relative">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover rounded-lg"
          />

          <div className="absolute top-2 left-2 gap-[2px] bg-primary px-2 py-[2px] rounded-full bg-white flex items-center">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />

            <span className="font-semibold text-xs">5.0</span>
          </div>

          <Button size="icon" className="absolute top-2 right-2 h-7 w-7 rounded-full bg-muted-foreground">
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-semibold">
            {restaurant.name}
          </h3>

          <div className="flex gap-3">
            <div className="flex item-center gap-1">
              <BikeIcon size={14} className="text-primary" />

              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))
                }
              </span>
            </div>

            <div className="flex item-center gap-1">
              <TimerIcon size={14} className="text-primary" />

              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;