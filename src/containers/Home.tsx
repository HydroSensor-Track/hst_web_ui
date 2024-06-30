const Home = ({userIsLoggedIn}: {userIsLoggedIn:boolean}) => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>This is the home page of our application.</p>
            <button onClick={() => userIsLoggedIn ? console.log('Yes'): console.log('No')}>Am I logged in ?</button>
        </div>
    );
};

export default Home;