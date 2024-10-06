import React from 'react';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import { metamorphous } from '@/ui/fonts';
import CurrentMenu from './(components)/CurrentMenu';
import ProductForm from './(components)/ProductForm';
import checkAuth from '@/actions/checkAuth';
import Product from '@/types/Product';

type MenuProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function Menu({ searchParams }: MenuProps) {
  const productId = searchParams['productId'];

  const { user } = await checkAuth();

  const response = await fetch(
    `${process.env.API_URL || 'http://localhost:5001/api/v1'}/product/all/${user?.associatedBakery}`,
    {
      credentials: 'include',
    },
  );
  const products: Product[] = (await response.json()).data.products;

  return (
    <BackgroundImageContainer
      src='/images/MenuBackground.png'
      alt='Background Image'
      className='before:bg-black/75 before:from-black/75 before:from-40% before:to-gray-900/65 before:to-90% before:backdrop-blur-sm sm:before:bg-transparent sm:before:bg-gradient-to-r'
    >
      <main className='grid h-screen grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-y-auto bg-transparent md:grid-cols-2'>
        <section className='mt-20 flex w-full flex-col items-center justify-center px-4 pb-12'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Create Menu
          </h3>
          {/* {!productId ? <CurrentMenu /> : <NewItemView />} */}
          {!productId ? (
            <CurrentMenu products={products} />
          ) : (
            <ProductForm product={products.find((p) => p._id === productId)} />
          )}
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default Menu;
