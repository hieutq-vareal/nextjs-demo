import { useRouter } from 'next/router';
import axios from 'axios'

export default function Page(props) {
    const { isFallback } = useRouter();

    if (isFallback) {
        return <></>;
    }

    return <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
    </div>
}

export async function getRandomAPI() {
  const res = await axios.get('https://api.publicapis.org/random');


  return {
    name: res.data.entries[0].API,
    description: res.data.entries[0].Description
  };
}

export async function getStaticProps() {
  const props = await getRandomAPI();

  return { props, revalidate: 10 };
}