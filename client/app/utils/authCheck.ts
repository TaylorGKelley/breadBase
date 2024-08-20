import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

type AuthCheckResult = {
  redirect?: {
    destination: string;
    permanent: boolean;
  };
  props?: {
    user: any;
  };
};

export async function authCheck(
  ctx: GetServerSidePropsContext,
): Promise<AuthCheckResult> {
  const cookies = nookies.get(ctx);
  const token = cookies.jwt;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // Verify the JWT
    const response = await fetch(`${process.env.API_URI}/checkAuth`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(process.env.API_URI);

    if (response.ok) {
      const user = await response.json();
      return {
        props: {
          user,
        },
      };
    } else {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
