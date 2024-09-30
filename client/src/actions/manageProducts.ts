import CreateProductFormState from '@/types/FormStates/CreateProductFormState';
import Product from '@/types/Product';

export const createProduct = async (
  formData: FormData,
): Promise<CreateProductFormState> => {
  const name = formData.get('name')?.toString() || '';
  const price = formData.get('price')?.toString() || '';
  const description = formData.get('description')?.toString();
  const images = formData.get('images');
  const ingredients = formData.get('ingredients'); // TODO: destructure into ingredient object that mongo stores
  // const nutrition = formData.get('nutrition'); // TODO: destructure into nutrition object that mongo stores

  try {
    if (name === '' || price === '') {
      return {
        success: false,
        name: name,
        price: Number(price),
        errors: {
          name: !name ? 'A name is required' : undefined,
          price: !price ? 'A price is required' : undefined,
        },
      };
    }

    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/product`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          description,
          images,
          ingredients,
          // nutrition,
        }),
      },
    );

    const product: Product = ((await response.json()) as any).data.product;

    return {
      success: true,
      name: name,
      price: Number(price),
      product,
    };
  } catch (error) {
    return {
      success: false,
      name: '',
      price: 0,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const updateProduct =
  (productId: string) =>
  async (formData: FormData): Promise<CreateProductFormState> => {
    const name = formData.get('name')?.toString();
    const price = formData.get('price')?.toString();
    const description = formData.get('description')?.toString();
    const image = formData.get('image');
    const ingredientsValue = formData.get('ingredients')?.toString();
    let ingredients: string[] = [];
    // const nutrition = formData.get('nutrition');

    try {
      if (!name || name === '' || !price || price === '') {
        return {
          success: false,
          name: name || '',
          price: Number(price),
          errors: {
            name: !name ? 'A name is required' : undefined,
            price: !price ? 'A price is required' : undefined,
          },
        };
      }

      if (!!ingredientsValue) ingredients = ingredientsValue.split('\n');

      const response = await fetch(
        `${process.env.API_URL || 'http://localhost:5001'}/api/v1/product/${productId}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            price: Number(price),
            description,
            image,
            ingredients,
            // nutrition,
          }),
        },
      );

      const product: Product = ((await response.json()) as any).data.product;

      return {
        success: true,
        name: name,
        price: Number(price),
        description: description,
        ingredients: ingredients.join('\n'),
        product,
      };
    } catch (error) {
      return {
        success: false,
        name: '',
        price: 0,
        errors: {
          message: (error as Error).message,
        },
      };
    }
  };
