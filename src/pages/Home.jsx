export default function Home({ results }) {
  return (
    <>
      {
        results.map(post => <h1 key={post.id}>{ post.title }</h1>)
      }
    </>
  )
}
