import { React, useState } from "react";
import { Link } from "react-router-dom";

function HomeAdmin (
    { movies, movie, setMovie, users, user, setUser }
    ) {  
    const sortedMovies = [...movies].sort((a, b) => b.likes - a.likes);
        
    const top4Movies = sortedMovies.slice(0, 4);

    const sortedUsers = [...users];
    
    const top4Users = sortedUsers.slice(-4);
    
    return (
      <div className="container-fluid">
        
       
      <div className="row row-title">
          <div className="col-12 top-title">
            Hi {user.firstName}!
            <hr className="top-line" />
            <h3 className="your-lm">Recently Joined Users</h3>
            
            
          </div>
        </div>

      <div className="row row-dashboard flex-row flex-wrap d-flex">
        {top4Users.map((user) => (
          <div key={user._id} className="col-12 col-md-6 col-xl-3">
            <div className="card" style={{ width: "18rem" }}>
              <img src="/images/purple.png" className="card-img-top" alt="..." />
              <div className="card-body card-user">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.followers ? user.followers.length : 0} Followers</p>
                <button class="btn btn-outline-dark" > 
                      <Link to={`/profile/${user.username}`} className="dtext">
                        View Profile
                      </Link>
                       </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row row-title">
          <div className="col-12 top-title">
            <h3 className="fl">Top Performing Movies</h3>
            <hr className="top-line" />
            
            
          </div>
        </div>
        
        <div className="row row-dashboard flex-row flex-wrap d-flex">
        
  
          {top4Movies.map((movie) => (
            <div key={movie._id} className="col-12 col-md-6 col-xl-3">
              <div className="card" style={{ width: "18rem" }}>
                <img src={movie.posterUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">Likes: {movie.likes}</p>

                  <button class="btn btn-outline-dark" > 
                      <Link to={`/details/${movie.imdbID}`} className="dtext">
                        Details
                      </Link>
                       </button>
              
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }
  
  export default HomeAdmin;