import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import Input from '../Form/Input';
import {
  AddressSchema,
  AddressSchemaType,
} from '@/types/Schemas/AddressVerificationSchema';
import Modal from '../Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '../Form';
import Button from '../Form/Button';

type AddressModalProps = {
  methods: UseFormReturn<any, any, undefined>;
  onSelect: (address: AddressSchemaType) => void;
  currentAddressState: AddressSchemaType; // Pass default form values, like address lines
};

function AddressModal(
  { methods, onSelect, currentAddressState }: AddressModalProps,
  ref: ForwardedRef<HTMLDialogElement>,
) {
  const [suggestedAddresses, setSuggestedAddresses] = useState<
    AddressSchemaType[]
  >([]);
  const addressVerificationMethods = useForm<AddressSchemaType>({
    defaultValues: currentAddressState,
    resolver: zodResolver(AddressSchema),
  });

  useEffect(() => {
    if (!currentAddressState?.address) {
      // fetch('/api/getAddressSuggestions')
      //   .then((res) => res.json())
      //     .then((data) => setSuggestedAddresses(data.addresses));

      setSuggestedAddresses([
        {
          address: '1034 Gaddis Ave',
          city: 'San Diego',
          state: 'CA',
          zipCode: 92101,
          lat: 20.5,
          lng: 10.34,
        },
      ]);
    }
  }, [currentAddressState]);

  const handleSelectAddress = (address: any) => {
    methods.setValue('address', address.address);
    methods.setValue('suiteNumber', address?.suiteNumber);
    methods.setValue('city', address.city);
    methods.setValue('state', address.state);
    methods.setValue('zipCode', address.zipCode);
    onSelect(address);
  };

  const onSubmit = (data: AddressSchemaType) => {
    const address = {};
    console.log(data);
  };

  return (
    <Modal
      ref={ref}
      title='Verify Address'
      className='grid grid-cols-1 gap-6 sm:grid-cols-2'
    >
      <div>
        <Form
          methods={addressVerificationMethods}
          onSubmit={onSubmit}
          className='mx-auto flex max-w-96 flex-col gap-4'
        >
          <Input
            label='Address'
            name='address'
            placeholder='Address'
          />
          <Input
            label='Suite Number'
            name='suiteNumber'
            type='number'
            placeholder='0'
          />
          <Input
            label='City'
            name='city'
            placeholder='City'
          />
          <Input
            label='State'
            name='state'
            placeholder='State'
          />
          <Input
            label='Zip Code'
            name='zipCode'
            type='number'
            placeholder='00000'
          />
          <Button className='mt-2'>Search</Button>
        </Form>
      </div>

      <div className='py-4'>
        <ul>
          {suggestedAddresses.map((address, index) => (
            <li
              key={index}
              onClick={() => handleSelectAddress(address)}
            >
              {address.address}, {address.city}, {address.state}
              {address.zipCode}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default forwardRef(AddressModal);
