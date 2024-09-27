import React from 'react';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import NewItemView from './(components)/NewItemView';
import { metamorphous } from '@/ui/fonts';
import DividerLine from '@/components/Forms/DividerLine';
import CurrentMenu from './(components)/CurrentMenu';

type MenuProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function Menu({ searchParams }: MenuProps) {
  const selectedItemId = searchParams && searchParams['itemId'];

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
          <div className='scroll-narrow h-[500px] w-full max-w-96 overflow-y-auto rounded-3xl border p-4'>
            <DividerLine className={`${metamorphous.className} text-lg`}>
              {!selectedItemId ? 'Menu' : 'Add Item'}
            </DividerLine>
            {!selectedItemId ? <CurrentMenu /> : <NewItemView />}
          </div>
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default Menu;
