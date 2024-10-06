'use server';

import CreateBakeryFormResponse from '@/types/FormStates/CreateBakeryFormState';

export async function getBakery(
  bakeryId: string,
): Promise<CreateBakeryFormResponse | undefined> {
  try {
    // Handle signup
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/bakery/${bakeryId}`,
      {
        credentials: 'include',
      },
    );

    // Return User data or error if sign up failed
    if (!response.ok || response?.status !== 200) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = (await response.json())?.data;

    console.log(data);

    return {
      success: false,
      title: data.bakery.title,
      address: data.bakery.address,
      suiteNumber: data.bakery.suiteNumber,
      state: data.bakery.state,
      city: data.bakery.city,
      zipCode: data.bakery.zipCode,
    };
  } catch {
    return undefined;
  }
}
