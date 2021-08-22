import { GetStaticProps, GetStaticPropsResult, GetStaticPaths, NextPage} from 'next'
import { useRouter } from 'next/router'

type Member = {
  login: string
  avatar_url: string
  name: string
  bio: string
}

interface MemberProps {
  member: Member
}

const Member: NextPage<MemberProps> = (props) => {
  const { isFallback } = useRouter()

  if(isFallback){
    return <p>Carregando membro...</p>
  }

  return (
    <div>
      <h1>{props.member.name}</h1>
      <img src={props.member.avatar_url} alt={props.member.name}/>
      <p>{props.member.bio}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response =  await fetch('https://api.github.com/orgs/rocketseat/members')
  const data: Member[] = await response.json()

  const paths = data.map(member => {
    return { params: { login: member.login }}
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<MemberProps>> => {
  const user = context.params?.login
  const response =  await fetch(`https://api.github.com/users/${user}`)
  const data = await response.json()
  return {
    props: {
      member: data
    }
  }
}

export default Member