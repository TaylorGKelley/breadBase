'use server';

import Bakery from '@/types/Bakery';
import CreateBakeryFormResponse from '@/types/CreateBakeryFormState';
import User from '@/types/User';

export default async (
  formData: FormData,
): Promise<CreateBakeryFormResponse> => {
  const title = formData.get('title')?.toString() || '';
  const address = formData.get('address')?.toString() || '';
  const suiteNumber = formData.get('suiteNumber') || '';
  const state = formData.get('state')?.toString() || '';
  const city = formData.get('city')?.toString() || '';
  const zipCode = formData.get('zipCode') || '';

  if (
    title === '' ||
    address === '' ||
    state === '' ||
    city === '' ||
    zipCode === ''
  )
    return {
      success: false,
      title: title,
      address: address,
      suiteNumber: Number(suiteNumber),
      state: state,
      city: city,
      zipCode: Number(zipCode),
      errors: {
        title: title === '' ? 'Bakery needs a title' : '',
        address: address === '' ? 'Bakery needs an address' : '',
        state: state === '' ? 'Bakery needs a state' : '',
        city: city === '' ? 'Bakery needs a city' : '',
        zipCode: zipCode === '' ? 'Bakery needs a zip code' : '',
      },
    };

  try {
    // Handle signup
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/bakery`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          address: address,
          suiteNumber: suiteNumber,
          state: state,
          city: city,
          zipCode: zipCode,
        }),
      },
    );

    // Return User data or error if sign up failed
    console.log(response.ok, response.status);
    if (!response.ok || response?.status !== 200) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = (await response.json())?.data;

    return {
      success: true,
      title: title,
      address: address,
      suiteNumber: Number(suiteNumber),
      state: state,
      city: city,
      zipCode: Number(zipCode),
      bakery: data.bakery as Bakery,
      user: data.user as User,
    };
  } catch (error) {
    return {
      success: false,
      title: title,
      address: address,
      suiteNumber: Number(suiteNumber),
      state: state,
      city: city,
      zipCode: Number(zipCode),
      errors: {
        message: (error as Error).message,
      },
    };
  }
};