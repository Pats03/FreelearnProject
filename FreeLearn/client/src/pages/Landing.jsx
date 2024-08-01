import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            अध्यापन<span>(To learn in a better way)</span> Freelearn
            App
          </h1>
          <p>
            Welcome to our educational platform, where learning meets
            innovation! We are dedicated to empowering students by providing a
            comprehensive and engaging learning experience.
            
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login/Demo user
          </Link>
        </div>
        <img src={main} alt="Study hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
