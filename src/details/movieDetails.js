import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "../search/client";
import "./movieDetails.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function MovieDetails({ user, isLoggedIn }) {
    const [movieDetail, setMovieDetail] = useState({});
    const [isLiked, setIsLiked] = useState(false); // State to keep track of like status
    const [currentMovie, setCurrentMovie] = useState({});
    const [likes, setLikes] = useState(null);
    const [usersLiked, setUsersLiked] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const { imdbId } = useParams();


    useEffect(() => {
        console.log("in use effect")
        setUsersLiked([]);
        fetchMovieDetailsById(imdbId);
    }, [imdbId]);

    useEffect(() => {
        console.log("re-rendering usersLiked & likes")
    }, [likes, usersLiked]);

    const fetchMovieDetailsById = async (imdbId) => {
        // remote api json object 
        const response = await client.fetchMovieById(imdbId);
        setMovieDetail(response);

        // local api json object 
        const response2 = await client.fetchMovieByIMDB(imdbId);
        setCurrentMovie(response2);
        let updatedUsersLiked = [];
        if (response2 && response2.likes !== undefined) {
            setLikes(response2.likes);
        } else {
            setLikes("NA");
        }

        const usersResponse = await client.fetchAllUsers();

        // const userCurrent = await client.findUser(user._id);
        // setCurrentUser(userCurrent);

        for (const userObj of usersResponse) {
            if (userObj.liked_movies.includes(response2.id) && !updatedUsersLiked.some(u => u._id === userObj._id)) {
                updatedUsersLiked.push(userObj);
            }
        }

        setUsersLiked(updatedUsersLiked);
    };


    const handleLikeClick = async () => {
        if (isLoggedIn) {
            if (!isLiked && !(user.liked_movies.includes(currentMovie.id))) {
                // If the movie is not liked, increase likes
                const updatedMovie = await client.increaseLikes(imdbId);
                setCurrentMovie(updatedMovie);
                setLikes(updatedMovie.likes);
                await client.updateUserLikes(user._id, updatedMovie.id)

                setUsersLiked(prevusersLiked => [...prevusersLiked, user]);
                setIsLiked(true);
                // refreshUserList();
            } else {
                // If the movie is liked, decrease likes
                const updatedMovie = await client.decreaseLikes(imdbId);
                setCurrentMovie(updatedMovie);
                setLikes(updatedMovie.likes);
                await client.removeUserLikes(user._id, updatedMovie.id)

                setUsersLiked(prevusersLiked => prevusersLiked.filter(u => u._id !== user._id));
                setIsLiked(false);
                // refreshUserList();
            }
        } else {
            alert('Please log in to like this movie.');
        }
    };

    return (
        <div className="container" style={{ color: "white" }}>
            <div className="row justify-content-center">
                <div className="col col-lg-8 mt-5">
                    <div className="text-center">
                        <h1 className="fw-light mb-3">{movieDetail.Title}</h1>
                        <img src={movieDetail.Poster} alt={movieDetail.Title} />
                    </div>
                    {console.log(user)}
                    {(user.role === "USER" || !isLoggedIn) && (
                        <div className="text-center mt-3">
                            <button
                                className={`btn ${isLiked || user.liked_movies.includes(currentMovie.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={handleLikeClick}
                            >
                                {console.log("is liked:" + isLiked)}
                                {console.log("user in liked by" + user.liked_movies.includes(currentMovie.id))}
                                {isLiked || user.liked_movies.includes(currentMovie.id) ? <FaHeart /> : <CiHeart />}
                            </button>
                        </div>
                    )}
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Rating</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Rated}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Genre</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Genre}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Plot</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Plot}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Released</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Released}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Director</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Director}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Likes</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{likes}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Liked By</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>
                                    <ul>
                                        {console.log(usersLiked)}
                                        {usersLiked.map((likedUser, index) => (
                                            <li key={index}>
                                                {likedUser.firstName} {likedUser.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
