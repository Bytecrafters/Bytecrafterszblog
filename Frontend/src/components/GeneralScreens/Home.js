import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import Pagination from "./Pagination";
import "../../Css/Home.css"

import { useNavigate } from "react-router-dom"
const Home = () => {
  const search = useLocation().search
  const searchKey = new URLSearchParams(search).get('search')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);


  useEffect(() => {
    const getStories = async () => {

      setLoading(true)
      try {

        const { data } = await axios.get(`/story/getAllStories?search=${searchKey || ""}&page=${page}`)

        if (searchKey) {
          navigate({
            pathname: '/',
            search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
          });
        }
        else {
          navigate({
            pathname: '/',
            search: `${page > 1 ? `page=${page}` : ""}`,
          });


        }
        setStories(data.data)
        setPages(data.pages)

        setLoading(false)
      }
      catch (error) {
        setLoading(true)
      }
    }
    getStories()
  }, [setLoading, search, page, navigate])


  useEffect(() => {
    setPage(1)
  }, [searchKey])


  return (
    <div className="Inclusive-home-page">
      {loading ?

        <div className="skeleton_emp">
          {
            [...Array(6)].map(() => {
              return (
                // theme dark :> default : light
                <SkeletonStory key={uuidv4()} />
              )
            })}
        </div>

        :
        <div>
<section id="hero">
  <div class="hero-content">
    <h1>Welcome to ByteCrafters Website</h1>
    <p>"24/7 CARE FOR YOUR DIGITAL EMPIRE."</p>
  </div>
  <div class="hero-image">
    <img src="h2.png" alt="" />
  </div>
</section>

          <div className="story-card-wrapper">
            {stories.length !== 0 ?
              stories.map((story) => {
                return (
                  <CardStory key={uuidv4()} story={story} />
                )
              }) : <NoStories />
            }
            {/* <img className="bg-planet-svg" src="h.jpg" alt="planet" /> */}
            {/* <img className="bg-planet2-svg" src="planet2.svg" alt="planet" />
            <img className="bg-planet3-svg" src="planet3.svg" alt="planet" /> */}

          </div>
          <Pagination page={page} pages={pages} changePage={setPage} />
          <section id="about">
      <h2>About</h2>
      <p>Welcome to Bytecrafters, where innovation meets technology. We are a leading IT company dedicated to providing cutting-edge solutions that empower businesses in the digital era.</p>
      <div class="founders">
    <div class="founder">
    <img src="h2.jpg" alt=""></img>
      {/* <img src="h2.jpg" alt="Founder 1"> */}
      <h3>Omkar More</h3>
      <p>Co-Founder & CEO</p>
    </div>
    
    <div class="founder">
    <img src="h2.jpg" alt=""></img>
      {/* <img src="h2.jpg" alt="Founder 2"> */}
      <h3>Raj Sawant</h3>
      <p>Co-Founder & CTO</p>
    </div>
    
    <div class="founder">
    <img src="h2.jpg" alt=""></img>
      {/* <img src="h2.jpg" alt="Founder 3"> */}
      <h3>Jignesh Gurav</h3>
      <p>Co-Founder & COO</p>
    </div>
  </div>
    </section>
        </div>
      }
     {/* <br/> */}
    </div>
  )
};
export default Home;