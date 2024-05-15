import React from 'react';
import './css/blog_article.css';
const Main = () => {
  return (
    <div>
      <nav className="logo" style={{ position: 'absolute' }}>
        <img src="img/log.png" alt="Paws and Claws" />
      </nav>
      <div className="content">
        <nav className="header" style={{ width: '100%', marginTop: '1em', height: '2em', textAlign: 'right', paddingTop: '1.5em' }}>
          <a href="/res" style={{ color: 'white', textDecoration: 'none', padding: '.5em', transition: '.5s', fontWeight: '500', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>RESERVATION</a>
          <a href="/blog" style={{ color: 'white', textDecoration: 'none', padding: '.5em', transition: '.5s', fontWeight: '500', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>BLOG</a>
          <a href="/pet" style={{ color: 'white', textDecoration: 'none', padding: '.5em', transition: '.5s', fontWeight: '500', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>PET REGISTRATION</a>
          <a href="/home" style={{ color: 'white', textDecoration: 'none', padding: '.5em', transition: '.5s', fontWeight: '500', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>DONATION</a>
          <a href="/feedback" style={{ color: 'white', textDecoration: 'none', padding: '.5em', transition: '.5s', fontWeight: '500', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>FEEDBACK</a>
          <a href="/in" style={{ color: 'white', textDecoration: 'none', padding: '.5em', transition: '.5s', fontWeight: '500', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>INVENTORY</a>
          <a href="/emp" style={{ color: 'white', textDecoration: 'none', padding: '.5em', transition: '.5s', fontWeight: '500', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>EMPLOYEE</a>
        </nav>

        <nav className="main">
          <img src="img/main1.jpg" alt="Main" style={{ width: '100%', marginTop: '7em' }} />
        </nav>

        <div className="comme" style={{ display: 'flex', marginTop: '50em' }}>
          <div className="about-us-text">
            <h2 style={{ fontSize: '4em', textAlign: 'center', fontFamily: 'Garamond, serif', marginBottom: '1em', color: '#435893', marginTop: '-2em' }}>Who Are We?</h2>
            <p style={{ fontFamily: '\'Times New Roman\', Times, serif', fontSize: '1.3em', marginTop: '-2em', textAlign: 'center', color: '#1a2954' }}>
              Paws and Claws is a beloved pet care institution located in the heart of Kandy. Known for its exceptional services and compassionate staff, it caters to all types of pets, providing personalized care tailored to each furry, feathery, or scaly friend. 

              The facility offers modern amenities including spacious boarding areas, interactive play zones, and relaxing spa treatments to ensure pets have a comfortable and enjoyable stay. Beyond pet care, Paws and Claws serves as a community hub, offering educational workshops and training classes to support pet owners in nurturing strong bonds with their animals.

              With its dedication to excellence and commitment to enhancing the well-being of pets and their owners, Paws and Claws stands as a beacon of quality in the world of pet care.
            </p>
          </div>
        </div>

        <div className="side_image">
          <img src="img/background.png" alt="Background" style={{ width: '100%', marginLeft: '1em' }} />
        </div>
      </div>

      <section class="footer" style={{marginTop: "120em"}}>
      <div class="footer-row">
        <div class="footer-col">
          <h4>Info</h4>
          <ul class="links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Compressions</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">Collection</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Explore</h4>
          <ul class="links">
            <li><a href="#">Free Designs</a></li>
            <li><a href="#">Latest Designs</a></li>
            <li><a href="#">Themes</a></li>
            <li><a href="#">Popular Designs</a></li>
            <li><a href="#">Art Skills</a></li>
            <li><a href="#">New Uploads</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Legal</h4>
          <ul class="links">
            <li><a href="#">Customer Agreement</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">GDPR</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Media Kit</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter for a weekly dose
            of news, updates, helpful tips, and
            exclusive offers.
          </p>
          <form action="#">
            <input type="text" placeholder="Your email" required/>
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div class="icons">
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-github"></i>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Main;
