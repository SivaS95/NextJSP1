import router, { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";

function NewMeetUpPage(){
  const router = useRouter();
 async function addMeetupHandler(enteredMeetupData){
  const response = await fetch('/api/new-meetup',{
    method: 'POST', body:JSON.stringify(enteredMeetupData),
    headers:{'Content-Type': 'application/json'}
  });

  const data = await response.json();
  console.log(data);
  router.push('/');
 }

  return( 
    <Fragment>
    <Head>
      <title>New Meetups-Form</title>
      <meta name='description' content='My test React meetups' />
    </Head>
   {/* <MeetupList meetups ={props.meetups} />; */}
   <NewMeetupForm onAddMeetup={addMeetupHandler}/> 
   </Fragment>
  );  
}

export default NewMeetUpPage;