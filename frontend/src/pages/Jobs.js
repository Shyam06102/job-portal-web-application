import React,{useEffect,useState} from "react";
import axios from "axios";

function Jobs(){

const [jobs,setJobs] = useState([]);

useEffect(()=>{
fetchJobs();
},[]);

const fetchJobs = async()=>{

const res = await axios.get("http://localhost:5000/api/jobs");

setJobs(res.data);

};

return(

<div>

<h2>Job Listings</h2>

{jobs.map(job=>(
<div key={job._id}>

<h3>{job.title}</h3>
<p>{job.company}</p>
<p>{job.location}</p>
<p>{job.description}</p>

</div>
))}

</div>

);

}

export default Jobs;