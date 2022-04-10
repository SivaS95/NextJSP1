//import { useEffect, useState } from "react/cjs/react.production.min";
import Head from 'next/head';
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react/cjs/react.production.min';



function HomePage(props) {
//inorder to fetch data dynamically we can use hooks (use state nd use effect)
//but it is not effective as site renders twice and not beneficial for seo as crawlers will not reach the dynamic data which renders after the page component.
//nextjs offers two types of pre-rendering to fetch data dynamically i.e., static generation nd server-side rendering.

  return (
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name='description' content='My test React meetups' />
    </Head>
   <MeetupList meetups ={props.meetups} />;
   </Fragment>
   );
}

//SSR- SERVER SIDE RENDERING , it is used to rerender a site for every request we receive, it is the best option for websites with multiple data receiving sites
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;

//   return {
//     props:{ meetups: DUMMY_MEETUPS}
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://SivaS95:Nive01siva!@cluster0.j6sr3.mongodb.net/meetups?retryWrites=true&w=majority');
 const db = client.db();

 const meetupsCollection = db.collection('meetups');
 const meetups = await meetupsCollection.find().toArray();
 client.close();
  // fetch data from an API
  return {
    props: {
      meetups: meetups.map((meetup) =>({
        title: meetup.title,
        address: meetup.address,
        image:meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate:1, 
  }; 
}
// export function getStaticProps(){
//   return{
//     //SSG- STATIC SITE GENERATION (it pre-renders data ands fetech,s it with props)
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//     revalidate: 10 //we use revalidate in ssg so that site rerenders every 10s and it doesnt remain static
//   }
// }

export default HomePage;
