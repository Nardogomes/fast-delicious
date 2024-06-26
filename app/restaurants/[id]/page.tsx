import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          products: {
            where: {
              restaurantId: id
            },
            include: {
              restaurant: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="flex justify-between items-center px-5 pt-5 relative mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white z-10">
        {/* Título */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="gap-[3px] px-2 py-[4px] rounded-full bg-foreground flex items-center text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />

          <span className="font-semibold text-xs">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="flex mt-3 px-5 gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#F4F4F4] min-w-[167px] rounded-full text-center"
          >
            <span className="text-muted-foreground text-xs">{category.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="font-semibold px-5">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  );
}

export default RestaurantPage;