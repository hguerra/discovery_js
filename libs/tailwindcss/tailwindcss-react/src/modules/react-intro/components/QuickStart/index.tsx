import { useEffect, useState } from 'react';
import { UserProvider } from '../../../../contexts/UserContext';
import useUser from '../../../../contexts/UserContext/useUser';
import api from '../../../../services/api';
import useCounter from '../../hooks/useCounter';
import useUserRepos from '../../hooks/useUserRepos';
import styles from './style.module.css';

type UserProps = {
  name: string;
  imageUrl: string;
  imageSize: number;
};

function Avatar({ user }: { user: UserProps }) {
  return (
    <img
      className={styles.avatar}
      src={user.imageUrl}
      alt={`Avatar for ${user.name}`}
      style={{
        width: user.imageSize,
        height: user.imageSize,
      }}
    />
  );
}

function Card({ user }: { user: UserProps }) {
  return (
    <div>
      <h1 className="text-lg font-bold decoration-solid">{user.name}</h1>
      <Avatar user={user} />
    </div>
  );
}

function ShoppingList({
  products,
}: {
  products: { title: string; isFruit: boolean; id: number }[];
}) {
  return (
    <ul>
      {products.map((product) => (
        <li
          key={product.id}
          className={product.isFruit ? 'text-purple-500' : 'text-yellow-300'}
        >
          {product.title}
        </li>
      ))}
    </ul>
  );
}

function InternalStateButton() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
    >
      Internal state: Clicked {count} times
    </button>
  );
}

function SharedHandlerButton({
  name,
  count,
  onClick,
}: {
  name: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
    >
      Shared handler {name}: Clicked {count} times
    </button>
  );
}

function SharedHandlerContainer() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <h1 className="text-red-400">Counters that update together</h1>
      <div className="grid grid-cols-2 gap-4 p-2">
        <SharedHandlerButton name={'01'} count={count} onClick={handleClick} />
        <SharedHandlerButton name={'02'} count={count} onClick={handleClick} />
      </div>
    </div>
  );
}

function SharedHookButton({ name }: { name: string }) {
  const { count, increment } = useCounter();

  return (
    <button
      onClick={increment}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
    >
      Shared hook {name}: Clicked {count} times
    </button>
  );
}

function SharedHookContainer() {
  const { count, increment } = useCounter(5);

  return (
    <div>
      <h1 className="text-red-400">Counters that update together</h1>
      <div className="grid grid-cols-2 gap-4 p-2">
        <SharedHookButton name={'01'} />
        <SharedHookButton name={'02'} />
        <SharedHandlerButton name={'03'} count={count} onClick={increment} />
        <SharedHandlerButton name={'04'} count={count} onClick={increment} />
      </div>
    </div>
  );
}

function UserProfileUseEffect() {
  const { state, dispatch } = useUser();

  // modo tradicional de chamar api
  useEffect(() => {
    let mounted = true;

    api.get('/users/hguerra').then(({ data }) => {
      if (mounted) {
        dispatch({
          type: 'SET_USER',
          payload: { name: data.name, email: data.email },
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <div>
      <h1>{state.name}</h1>
      <p>{state.email}</p>
      <button
        className="rounded bg-yellow-500 px-4 py-2 font-bold text-white"
        onClick={() =>
          dispatch({
            type: 'SET_USER',
            payload: { name: 'John Doe', email: 'john.doe@example.com' },
          })
        }
      >
        Set User
      </button>
    </div>
  );
}

function UserReposSWR() {
  const { repos, error, isLoading } = useUserRepos('hguerra');

  if (error) return <div>falhou ao carregar</div>;
  if (isLoading) return <div>carregando...</div>;

  return (
    <div className="border-green-600">
      <ul>{repos?.map((repo: { id: number; name: string }) => (
    <li key={repo.id}>{repo.name}</li>
  ))}</ul>
    </div>
  );
}

export default function QuickStart() {
  const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };

  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];

  return (
    <div>
      <h1 className="mt-4 bg-zinc-100 text-lg font-bold">Welcome to my app</h1>

      <div className="mt-4">
        <Card user={user} />
      </div>

      <div className="mt-4">
        <ShoppingList products={products} />
      </div>

      <div className="p-2">
        <InternalStateButton />
      </div>

      <div className="mt-4">
        <SharedHandlerContainer />
      </div>

      <div className="mt-4">
        <SharedHookContainer />
      </div>

      <div className="mt-4">
        <UserProvider>
          <UserProfileUseEffect />
        </UserProvider>
      </div>

      <div className="mt-4">
        <UserReposSWR />
      </div>
    </div>
  );
}
