import request from '../untils/request'

const Home = ({ data }) => {
  return (
    <main>
      <h1>The Starwars films wit SSG</h1>
      <ul>
        {data.map(item => (
          <li key={item.episode_id}>{item.title}</li>
        ))}
      </ul>
    </main>
  )
}
  
export async function getStaticProps (context) {
  const response = await request.get('films/')
  return { props: { data: response.data.results } }
}

export default Home