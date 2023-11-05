
import myImage from '../assets/samurai.png'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <>
      <div className='flex flex-row justify-center '>
            <img  className="samLogo" src={myImage} alt='My image' />
      </div>
      
      <div className="flex flex-row justify-center">
        <h1 className="Montserrat,sans-serif text-5xl">Welcome to SamurAI Stock</h1>
      </div>
      
      <div className="flex flex-row justify-center mt-5">
        <p>Where you can learn more about stocks and investing your money like a smart samurai. <br /> <span className="text-center block">Get started today by registering an account.</span></p>        
      </div>

      <div className="flex flex-row justify-center mt-40">
        <Link to="/auth">
          <button className="modern-button">Register</button>
        </Link>
      </div>
    </>
  );
}
