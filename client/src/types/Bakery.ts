import User from './User';

type Bakery = {
  _id: string;
  title: string;
  owner: string;
  bakers: User[];
  acceptsToGoOrders: boolean;
  saves: number;
  about: string;
  location: [number, number];
  address: string;
  suiteNumber: number;
  state: string;
  city: string;
  zipCode: number;
  contactPhone: number;
  deleted: boolean;
};

export default Bakery;
