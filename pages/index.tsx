import type { NextPage, GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

type Organization = {
  title: string
  description: string
  blog: string
}

interface HomeProps {
  organization: Organization
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div>
      <h1>{props.organization.title}</h1>
      <h3>{props.organization.description}</h3>
      <p>Site: <a href={props.organization.blog}>{props.organization.blog}</a></p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<HomeProps>> => {
  const response =  await fetch('https://api.github.com/orgs/rocketseat')
  const data = await response.json()
  const organization = {
    title: data.login,
    description: data.description,
    blog: data.blog
  }

  return {
    props: {
      organization
    },
    revalidate: 10
  }
}

export default Home
