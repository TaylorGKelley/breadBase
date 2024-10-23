'use server';

import Address from '@/types/Address';

export default async function (
  query: Address,
  typeNotEquals?: 'place' | 'road',
): Promise<Address[]> {
  const response = await fetch(
    'https://nominatim.openstreetmap.org/search?' +
      new URLSearchParams({
        format: 'json',
        street: query.address,
        city: query.city,
        state: query.state,
        postalcode: query.zipCode,
        country: 'United States',
      }),
  );

  if (response.ok) {
    const addresses = (await response.json()) as {
      display_name: string;
      importance: number;
      lat: string;
      lon: string;
      name: string;
      addresstype: string;
    }[];

    console.log(addresses);
    return addresses
      .filter((value) => value.addresstype != typeNotEquals)
      .map((address) => {
        const splitDisplay = address.display_name.split(',');

        return {
          address: splitDisplay[0].trim() + ' ' + splitDisplay[1].trim(),
          city: splitDisplay[3].trim(),
          state: splitDisplay[5].trim(),
          zipCode: splitDisplay[6].trim(),
          lat: address.lat,
          lon: address.lon,
          importance: address.importance,
        } as Address;
      }) as Address[];
  }

  // response had an error
  return [];
}
