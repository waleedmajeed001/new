import Link from "next/link";
import { SimplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
        _id,
        "imageUrl": images[0].asset->url,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name
      }`;

  return await client.fetch(query);
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const data: SimplifiedProduct[] = await getData(params.category);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 capitalize">
            {params.category} Collection
          </h2>
          <p className="text-gray-500 mt-2">Explore our latest products in {params.category}.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Link href={`/product/${product.slug}`} className="block relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    width={300}
                    height={300}
                  />
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="text-sm text-gray-500">{product.categoryName}</p>
                <p className="text-lg font-semibold text-gray-900 mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
